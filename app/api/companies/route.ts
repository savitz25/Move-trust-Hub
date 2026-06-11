import { NextResponse } from 'next/server';
import { getAllCompanies } from '@/lib/data';

export async function GET() {
  const companies = await getAllCompanies();
  return NextResponse.json({ companies, count: companies.length });
}
