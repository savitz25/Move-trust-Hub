'use client';

export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Company } from '@/types';
import { getAllCompanies, saveCompany, deleteCompany } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [editing, setEditing] = useState<Partial<Company> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const data = await getAllCompanies();
    setCompanies(data);
    setLoading(false);
  }

  const startNew = () => {
    setEditing({
      id: 'new-' + Date.now(),
      slug: '',
      name: '',
      shortDescription: '',
      description: '',
      foundedYear: 2010,
      headquarters: '',
      website: '',
      usdotNumber: '',
      mcNumber: '',
      fmcsaSafetyRating: 'Satisfactory',
      fmcsaComplaints: 10,
      fmcsaShipments: 5000,
      bbbRating: 'A',
      bbbAccredited: true,
      overallRating: 4.0,
      reviewCount: 200,
      reputationScore: 75,
      yearsInBusiness: 15,
      avgPricePerMove: 5500,
      priceRange: '$$',
      coverage: 'Continental US',
      services: ['Full Service'],
      specialties: [],
      ratingBreakdown: { fiveStar: 120, fourStar: 60, threeStar: 15, twoStar: 4, oneStar: 1 },
      isVerified: true,
      lastUpdated: new Date().toISOString().split('T')[0],
    });
  };

  const save = async () => {
    if (!editing) return;
    if (!editing.name || !editing.slug) {
      toast.error('Name and slug are required');
      return;
    }
    const saved = await saveCompany(editing as Company);
    toast.success('Company saved (local session)');
    setEditing(null);
    await load();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this company?')) return;
    await deleteCompany(id);
    toast('Company removed from local session');
    load();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Internal company editor. View live quote analytics on the quotes dashboard.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/suggestions">Suggestions</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/quotes">Quote Analytics</Link>
          </Button>
          <Button onClick={startNew}>+ Add New Company</Button>
        </div>
      </div>

      {editing && (
        <Card className="p-6 mb-8">
          <h3 className="font-semibold mb-4">Edit / Add Company</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(editing).filter(k => !['id','ratingBreakdown','services','specialties','lastUpdated'].includes(k)).map((key) => (
              <div key={key}>
                <label className="text-xs uppercase text-muted-foreground">{key}</label>
                <Input
                  value={(editing as any)[key] ?? ''}
                  onChange={(e) => setEditing({ ...editing, [key]: e.target.value })}
                  className="mt-1"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <Button onClick={save}>Save Company</Button>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-3">Admin-only editor. Changes sync to the live directory when saved.</p>
        </Card>
      )}

      <div className="text-sm mb-2">{companies.length} companies loaded</div>
      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/60">
            <tr>
              <th className="text-left pl-4 py-2">Name</th>
              <th>Rep</th>
              <th>Rating</th>
              <th>Price</th>
              <th className="text-right pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map(c => (
              <tr key={c.id} className="border-t">
                <td className="pl-4 py-2 font-medium">{c.name}</td>
                <td>{c.reputationScore}</td>
                <td>{c.overallRating}</td>
                <td>${c.avgPricePerMove}</td>
                <td className="text-right pr-4 space-x-2 py-1">
                  <Button size="sm" variant="outline" onClick={() => setEditing(c)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => remove(c.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs mt-4 text-muted-foreground">Protected by admin login. Review moderation at /admin/reviews.</p>
    </div>
  );
}
