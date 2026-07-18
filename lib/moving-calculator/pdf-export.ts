import { jsPDF } from 'jspdf';
import type { InventoryItem } from '@/store/calculator-store';
import {
  formatItemDisplayName,
  formatQuantityFirstItem,
  isSpecialHandlingItem,
} from '@/lib/moving-calculator/display-names';
import {
  estimateWeight,
  getMoveRecommendation,
  LBS_PER_CU_FT,
} from '@/lib/moving-calculator/estimates';
import type { ShortlistMoverCard } from '@/lib/my-move-plan/shortlist-mover-card';

export type PdfExportData = {
  inventory: InventoryItem[];
  groupedByRoom: [string, InventoryItem[]][];
  totalVolume: number;
  totalItems: number;
  presetLabel?: string | null;
  /** Shortlisted movers with contact + licensing (Move Report) */
  shortlistMovers?: ShortlistMoverCard[];
  routeFrom?: string | null;
  routeTo?: string | null;
  drivingMiles?: number | null;
  inventoryName?: string | null;
};

export function inventoryPdfFilename(): string {
  const dateStr = new Date().toISOString().slice(0, 10);
  return `move-inventory-${dateStr}.pdf`;
}

export function buildInventoryPdfDocument(data: PdfExportData): jsPDF {
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 48;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const recommendation = getMoveRecommendation(data.totalVolume);
  const totalWeight = estimateWeight(data.totalVolume);
  const specialItems = data.inventory.filter((item) => isSpecialHandlingItem(item.name));
  const shortlist = Array.isArray(data.shortlistMovers) ? data.shortlistMovers : [];
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const addPageIfNeeded = (needed: number) => {
    if (y + needed > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // Header
  doc.setFillColor(0, 119, 212);
  doc.rect(0, 0, pageWidth, 72, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('Move Trust Hub', margin, 36);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(
    data.inventoryName?.trim() || 'Moving Inventory Report',
    margin,
    54
  );
  doc.text(dateStr, pageWidth - margin, 54, { align: 'right' });

  y = 96;
  doc.setTextColor(30, 30, 30);

  // Route (when present)
  if (data.routeFrom) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 119, 212);
    doc.text('ROUTE', margin, y);
    y += 14;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(30, 30, 30);
    const routeLine = `${data.routeFrom}${data.routeTo ? ` → ${data.routeTo}` : ''}${
      data.drivingMiles != null && Number.isFinite(data.drivingMiles)
        ? `  ·  ~${Math.round(data.drivingMiles).toLocaleString()} mi`
        : ''
    }`;
    const routeLines = doc.splitTextToSize(routeLine, contentWidth);
    doc.text(routeLines, margin, y);
    y += routeLines.length * 14 + 10;
  }

  // Summary box
  doc.setFillColor(245, 248, 252);
  doc.roundedRect(margin, y, contentWidth, 100, 6, 6, 'F');
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('TOTAL VOLUME', margin + 16, y + 24);
  doc.text('EST. WEIGHT', margin + 140, y + 24);
  doc.text('ITEMS', margin + 280, y + 24);
  doc.text('TRUCK SIZE', margin + 360, y + 24);

  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 119, 212);
  doc.text(`${Math.round(data.totalVolume)} cu ft`, margin + 16, y + 48);
  doc.text(`${totalWeight.toLocaleString()} lbs`, margin + 140, y + 48);
  doc.text(`${data.totalItems}`, margin + 280, y + 48);
  doc.setFontSize(11);
  doc.text(recommendation.truck, margin + 360, y + 44, { maxWidth: 160 });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text(
    `${recommendation.label} · ${recommendation.movers} · ${recommendation.duration} · Weight at ${LBS_PER_CU_FT} lbs/cu ft`,
    margin + 16,
    y + 72
  );
  if (data.presetLabel) {
    doc.text(`Based on: ${data.presetLabel}`, margin + 16, y + 88);
  }

  y += 120;

  // Instructions
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 30, 30);
  doc.text('How to use this inventory', margin, y);
  y += 14;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  const instructions =
    'Give this same inventory to every mover for comparable quotes. Insist on a binding or not-to-exceed estimate based on this documented volume. Move Trust Hub never sells your information — we are an independent directory, not a lead broker.';
  const instructionLines = doc.splitTextToSize(instructions, contentWidth);
  doc.text(instructionLines, margin, y);
  y += instructionLines.length * 12 + 16;

  // Shortlisted movers — self-contained contact + licensing cards
  if (shortlist.length > 0) {
    addPageIfNeeded(40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 30, 30);
    doc.text('Shortlisted Movers', margin, y);
    y += 12;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text(
      'Contact each mover with this report. Licensing details below for verification.',
      margin,
      y
    );
    y += 16;

    shortlist.forEach((m, idx) => {
      const detailLines: string[] = [];
      if (m.phone) detailLines.push(`Phone: ${m.phone}`);
      if (m.email) detailLines.push(`Email: ${m.email}`);
      if (m.website) detailLines.push(`Website: ${m.website}`);
      if (m.address) detailLines.push(`Address: ${m.address}`);
      if (m.entityType) detailLines.push(`Type: ${m.entityType}`);
      if (m.usdotNumber) detailLines.push(`USDOT: ${m.usdotNumber}`);
      if (m.mcNumber) detailLines.push(`MC: ${m.mcNumber}`);
      if (m.powerUnits != null && m.powerUnits > 0) {
        detailLines.push(`Power units: ${m.powerUnits.toLocaleString()}`);
      }
      if (m.authorityLabel) detailLines.push(`Authority: ${m.authorityLabel}`);
      const trust: string[] = [];
      if (m.googleRating != null && m.googleRating > 0) {
        trust.push(
          `Google ${m.googleRating.toFixed(1)}★${
            m.googleReviewCount ? ` (${m.googleReviewCount})` : ''
          }`
        );
      }
      if (m.overallRating != null && m.overallRating > 0) {
        trust.push(
          `Hub ${m.overallRating.toFixed(1)}★${m.reviewCount ? ` (${m.reviewCount})` : ''}`
        );
      }
      if (m.reputationScore != null && m.reputationScore > 0) {
        trust.push(`Reputation ${m.reputationScore}/100`);
      }
      if (m.fmcsaSafetyRating) trust.push(`FMCSA ${m.fmcsaSafetyRating}`);
      if (trust.length) detailLines.push(trust.join(' · '));
      if (m.profileUrl) detailLines.push(`Profile: ${m.profileUrl}`);
      if (!m.phone && !m.email) {
        detailLines.push('Phone/email not on file — see profile or website.');
      }

      // Estimate card height
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      const nameLines = doc.splitTextToSize(m.name, contentWidth - 24);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      const wrappedDetails: string[] = [];
      for (const line of detailLines) {
        wrappedDetails.push(...doc.splitTextToSize(line, contentWidth - 24));
      }
      const cardH = 22 + nameLines.length * 13 + wrappedDetails.length * 12 + 14;
      addPageIfNeeded(cardH + 8);

      doc.setDrawColor(226, 232, 240);
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(margin, y, contentWidth, cardH, 5, 5, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(0, 119, 212);
      doc.text(`MOVER ${idx + 1} OF ${shortlist.length}`, margin + 12, y + 14);

      doc.setFontSize(12);
      doc.setTextColor(15, 23, 42);
      doc.text(nameLines, margin + 12, y + 28);
      let dy = y + 28 + nameLines.length * 13;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      for (const line of wrappedDetails) {
        doc.text(line, margin + 12, dy);
        dy += 12;
      }

      y += cardH + 10;
    });

    y += 6;
  }

  // Special handling
  if (specialItems.length > 0) {
    addPageIfNeeded(40 + specialItems.length * 14);
    doc.setFillColor(255, 248, 230);
    doc.roundedRect(margin, y, contentWidth, 20 + specialItems.length * 14, 4, 4, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(180, 100, 0);
    doc.text('Special Handling Required', margin + 12, y + 16);
    y += 28;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    for (const item of specialItems) {
      doc.text(
        `• ${formatQuantityFirstItem(item.name, item.quantity)} — notify movers in advance`,
        margin + 12,
        y
      );
      y += 14;
    }
    y += 12;
  }

  // Itemized by room — quantity-first
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 30, 30);
  doc.text('Itemized Inventory by Room', margin, y);
  y += 20;

  for (const [room, items] of data.groupedByRoom) {
    addPageIfNeeded(30 + items.length * 16);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(0, 119, 212);
    const roomTotal = items.reduce((s, i) => s + i.volume * i.quantity, 0);
    const roomPcs = items.reduce((s, i) => s + i.quantity, 0);
    doc.text(
      `${room}  ·  ${Math.round(roomTotal)} cu ft  ·  ${roomPcs} pcs`,
      margin,
      y
    );
    y += 16;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(50, 50, 50);
    for (const item of items) {
      addPageIfNeeded(14);
      const qty = item.quantity > 0 ? Math.round(item.quantity) : 1;
      const label = formatItemDisplayName(item.name);
      const lineVol = Math.round(item.volume * qty);
      // Quantity first: "10 × Medium Moving Box"
      const left = `${qty} × ${label}`;
      const right = `${lineVol} cu ft`;
      doc.text(left, margin + 8, y, { maxWidth: contentWidth - 80 });
      doc.text(right, pageWidth - margin, y, { align: 'right' });
      y += 14;
    }
    y += 8;
  }

  // Footer on last page
  const footerY = doc.internal.pageSize.getHeight() - 36;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, footerY - 12, pageWidth - margin, footerY - 12);
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(
    'Move Trust Hub · Independent mover directory · Verify carrier DOT at movetrusthub.com/companies',
    margin,
    footerY
  );
  doc.text('We never sell your information.', margin, footerY + 12);

  return doc;
}

export function generateInventoryPdfBase64(data: PdfExportData): string {
  const doc = buildInventoryPdfDocument(data);
  // jsPDF v4: output('base64') returns null — use arraybuffer instead.
  const buffer = doc.output('arraybuffer');
  return Buffer.from(buffer).toString('base64');
}

export function generateInventoryPdf(data: PdfExportData): void {
  const doc = buildInventoryPdfDocument(data);
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  doc.save(`move-inventory-${dateStr.replace(/,?\s+/g, '-')}.pdf`);
}
