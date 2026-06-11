'use client';

import React from 'react';
import { Region } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  companyName: string;
  coverage: Region;
}

export function CoverageMap({ companyName, coverage }: Props) {
  const isNational = coverage === 'All 50 States' || coverage === 'Continental US';

  // Very simplified US outline with highlighted regions (SVG for zero deps)
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Coverage Area</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="coverage-map bg-muted/40 rounded-lg p-3 border">
          <svg viewBox="0 0 800 420" className="w-full h-auto">
            {/* Simplified US outline */}
            <path d="M120 90 L680 85 L720 170 L690 310 L510 340 L340 355 L150 300 L95 200 Z" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" />

            {/* Regions (approximate) */}
            {/* West */}
            <path d="M120 95 L260 90 L240 190 L150 195 Z" className={isNational || coverage.includes('West') ? 'state-covered' : ''} fill="#0A4D8C" opacity="0.35" />
            {/* Midwest */}
            <path d="M260 92 L420 88 L410 200 L250 195 Z" className={isNational || coverage.includes('Midwest') ? 'state-covered' : ''} fill="#0A4D8C" opacity="0.35" />
            {/* South */}
            <path d="M250 200 L510 210 L480 310 L260 295 Z" className={isNational || coverage.includes('South') ? 'state-covered' : ''} fill="#0A4D8C" opacity="0.35" />
            {/* East */}
            <path d="M420 90 L680 88 L660 200 L505 205 Z" className={isNational || coverage.includes('East') || coverage.includes('Northeast') ? 'state-covered' : ''} fill="#0A4D8C" opacity="0.35" />

            {/* Labels */}
            <text x="180" y="150" className="text-[11px] fill-muted-foreground">West</text>
            <text x="330" y="145" className="text-[11px] fill-muted-foreground">Midwest</text>
            <text x="560" y="145" className="text-[11px] fill-muted-foreground">East</text>
            <text x="350" y="260" className="text-[11px] fill-muted-foreground">South</text>
          </svg>
        </div>
        <div className="mt-3 text-sm">
          <span className="font-medium">{companyName}</span> serves <span className="font-semibold">{coverage}</span>.
          {isNational && <span className="block text-xs text-muted-foreground mt-1">Extensive agent network across the continental U.S. + AK/HI on select routes.</span>}
        </div>
      </CardContent>
    </Card>
  );
}
