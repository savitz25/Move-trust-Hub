'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export function LaunchSearchEntry() {
  const router = useRouter(); const [origin, setOrigin] = useState(''); const [destination, setDestination] = useState('');
  return <form className="move-section-inner rounded-2xl border bg-background p-5 shadow-sm" onSubmit={(event) => { event.preventDefault(); if (!/^\d{5}$/.test(origin) || (destination && !/^\d{5}$/.test(destination))) return; const query = new URLSearchParams({ originZip: origin }); if (destination) query.set('destinationZip', destination); router.push(`/local-movers?${query}`); }}>
    <p className="text-sm font-semibold text-primary">Evidence-first mover research</p><h2 className="mt-1 text-2xl font-semibold">Where are you moving?</h2><p className="mt-1 text-sm text-muted-foreground">Research state-verified movers without paid placement. We cite. You decide.</p>
    <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]"><label className="text-sm font-medium">Where are you moving from?<input aria-label="Origin ZIP" inputMode="numeric" pattern="\d{5}" maxLength={5} value={origin} onChange={(e)=>setOrigin(e.target.value.replace(/\D/g,'').slice(0,5))} className="mt-1 h-11 w-full rounded-lg border px-3" placeholder="ZIP" required/></label><label className="text-sm font-medium">Where are you moving to? <span className="font-normal text-muted-foreground">Optional</span><input aria-label="Destination ZIP" inputMode="numeric" pattern="\d{5}" maxLength={5} value={destination} onChange={(e)=>setDestination(e.target.value.replace(/\D/g,'').slice(0,5))} className="mt-1 h-11 w-full rounded-lg border px-3" placeholder="ZIP"/></label><button className="mt-auto h-11 rounded-lg bg-primary px-5 font-semibold text-primary-foreground">Research movers</button></div>
  </form>;
}
