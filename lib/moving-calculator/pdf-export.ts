import { jsPDF } from 'jspdf';
import type { InventoryItem } from '@/store/calculator-store';
import { formatItemDisplayName, isSpecialHandlingItem } from '@/lib/moving-calculator/display-names';
import {
  estimateWeight,
  getMoveRecommendation,
  LBS_PER_CU_FT,
} from '@/lib/moving-calculator/estimates';

export type PdfExportData = {
  inventory: InventoryItem[];
  groupedByRoom: [string, InventoryItem[]][];
  totalVolume: number;
  totalItems: number;
  presetLabel?: string | null;
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
  doc.text('Moving Inventory Report', margin, 54);
  doc.text(dateStr, pageWidth - margin, 54, { align: 'right' });

  y = 96;
  doc.setTextColor(30, 30, 30);

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
      const label = formatItemDisplayName(item.name);
      doc.text(`• ${label} × ${item.quantity} — notify movers in advance`, margin + 12, y);
      y += 14;
    }
    y += 12;
  }

  // Itemized by room
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
    doc.text(`${room} (${Math.round(roomTotal)} cu ft)`, margin, y);
    y += 16;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(50, 50, 50);
    for (const item of items) {
      addPageIfNeeded(14);
      const label = formatItemDisplayName(item.name);
      const line = `${label}  ·  ${item.volume} cu ft × ${item.quantity}  =  ${Math.round(item.volume * item.quantity)} cu ft`;
      doc.text(line, margin + 8, y);
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
  return doc.output('base64');
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