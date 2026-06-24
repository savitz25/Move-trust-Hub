'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowRight, Car, Loader2, MapPin, Route, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { QuoteModal } from '@/components/quote-modal';
import { InfoTooltip } from '@/components/auto-transport/info-tooltip';
import { TrustBadges } from '@/components/trust/trust-badges';
import {
  calculateAutoTransportEstimate,
  formatCurrency,
  VEHICLE_CATEGORY_LABELS,
} from '@/lib/auto-transport/pricing';
import { isValidUsZip } from '@/lib/auto-transport/distance';
import type {
  AutoTransportEstimate,
  AutoTransportQuotePrefill,
  TransportMethod,
  VehicleCategory,
  ZipDistanceResult,
} from '@/lib/auto-transport/types';

function buildQuoteNotes(prefill: AutoTransportQuotePrefill): string {
  const route =
    prefill.fromCity && prefill.toCity
      ? `${prefill.fromCity}, ${prefill.fromState} → ${prefill.toCity}, ${prefill.toState}`
      : `${prefill.fromZip} → ${prefill.toZip}`;

  return [
    'Auto transport quote request',
    `Route: ${route}`,
    `Distance: ~${prefill.distanceMiles.toLocaleString()} miles (estimated driving)`,
    `Vehicle: ${VEHICLE_CATEGORY_LABELS[prefill.vehicleCategory]}`,
    `Transport: ${prefill.transportMethod === 'open' ? 'Open' : 'Enclosed'}`,
    `Calculator estimate: ${formatCurrency(prefill.lowTotal)} – ${formatCurrency(prefill.highTotal)}`,
  ].join('\n');
}

export function AutoTransportCalculator() {
  const [pickupZip, setPickupZip] = useState('');
  const [deliveryZip, setDeliveryZip] = useState('');
  const [vehicleCategory, setVehicleCategory] = useState<VehicleCategory>('regular');
  const [transportMethod, setTransportMethod] = useState<TransportMethod>('open');
  const [distanceResult, setDistanceResult] = useState<ZipDistanceResult | null>(null);
  const [distanceError, setDistanceError] = useState<string | null>(null);
  const [isLoadingDistance, setIsLoadingDistance] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const canCalculateDistance =
    isValidUsZip(pickupZip) && isValidUsZip(deliveryZip) && pickupZip !== deliveryZip;

  const fetchDistance = useCallback(async (from: string, to: string) => {
    setIsLoadingDistance(true);
    setDistanceError(null);

    try {
      const response = await fetch(`/api/zip-distance?from=${from}&to=${to}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to calculate distance');
      }

      setDistanceResult(data as ZipDistanceResult);
    } catch (error) {
      setDistanceResult(null);
      setDistanceError(error instanceof Error ? error.message : 'Distance lookup failed');
    } finally {
      setIsLoadingDistance(false);
    }
  }, []);

  useEffect(() => {
    if (!canCalculateDistance) {
      setDistanceResult(null);
      setDistanceError(null);
      return;
    }

    const timer = window.setTimeout(() => {
      void fetchDistance(pickupZip, deliveryZip);
    }, 450);

    return () => window.clearTimeout(timer);
  }, [pickupZip, deliveryZip, canCalculateDistance, fetchDistance]);

  const estimate: AutoTransportEstimate | null = useMemo(() => {
    if (!distanceResult) return null;
    return calculateAutoTransportEstimate(
      distanceResult.drivingMiles,
      vehicleCategory,
      transportMethod
    );
  }, [distanceResult, vehicleCategory, transportMethod]);

  const quotePrefill = useMemo(() => {
    if (!estimate || !distanceResult) return undefined;

    const prefill: AutoTransportQuotePrefill = {
      fromZip: pickupZip,
      toZip: deliveryZip,
      vehicleCategory,
      transportMethod,
      distanceMiles: estimate.distanceMiles,
      lowTotal: estimate.lowTotal,
      highTotal: estimate.highTotal,
      fromCity: distanceResult.fromCity,
      fromState: distanceResult.fromState,
      toCity: distanceResult.toCity,
      toState: distanceResult.toState,
    };

    return {
      fromZip: prefill.fromZip,
      toZip: prefill.toZip,
      serviceType: 'auto-transport' as const,
      notes: buildQuoteNotes(prefill),
      autoTransport: prefill,
    };
  }, [
    estimate,
    distanceResult,
    pickupZip,
    deliveryZip,
    vehicleCategory,
    transportMethod,
  ]);

  const routeLabel =
    distanceResult?.fromCity && distanceResult?.toCity
      ? `${distanceResult.fromCity}, ${distanceResult.fromState} → ${distanceResult.toCity}, ${distanceResult.toState}`
      : canCalculateDistance
        ? `${pickupZip} → ${deliveryZip}`
        : null;

  return (
    <>
      <section
        className="relative border-b bg-gradient-to-br from-primary/8 via-background to-background"
        aria-labelledby="auto-transport-calculator-heading"
      >
        <div className="container mx-auto px-4 py-10 md:py-14 max-w-5xl">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-3">
              FREE INSTANT ESTIMATE
            </Badge>
            <h1
              id="auto-transport-calculator-heading"
              className="text-4xl md:text-5xl font-semibold tracking-tight mb-3"
            >
              Auto Transport Calculator
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Enter your pickup and delivery ZIP codes to estimate open or enclosed car shipping
              costs, then request quotes from vetted carriers.
            </p>
          </div>

          <Card className="shadow-trust border-border/60 overflow-hidden">
            <CardHeader className="border-b bg-muted/20 pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" aria-hidden="true" />
                Calculate Your Transport Cost
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 sm:p-6 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pickup-zip" className="block text-sm font-medium mb-1.5">
                    Pickup ZIP Code
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="pickup-zip"
                      value={pickupZip}
                      onChange={(e) => setPickupZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                      placeholder="90210"
                      inputMode="numeric"
                      maxLength={5}
                      className="pl-10"
                      aria-describedby="pickup-zip-hint"
                    />
                  </div>
                  <p id="pickup-zip-hint" className="text-[11px] text-muted-foreground mt-1">
                    Where the vehicle will be picked up
                  </p>
                </div>
                <div>
                  <label htmlFor="delivery-zip" className="block text-sm font-medium mb-1.5">
                    Delivery ZIP Code
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="delivery-zip"
                      value={deliveryZip}
                      onChange={(e) =>
                        setDeliveryZip(e.target.value.replace(/\D/g, '').slice(0, 5))
                      }
                      placeholder="10001"
                      inputMode="numeric"
                      maxLength={5}
                      className="pl-10"
                      aria-describedby="delivery-zip-hint"
                    />
                  </div>
                  <p id="delivery-zip-hint" className="text-[11px] text-muted-foreground mt-1">
                    Where the vehicle will be delivered
                  </p>
                </div>
              </div>

              <div
                className="rounded-xl border bg-muted/30 px-4 py-3 flex flex-wrap items-center gap-3 text-sm"
                aria-live="polite"
              >
                <Route className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                {isLoadingDistance ? (
                  <span className="inline-flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Calculating route distance...
                  </span>
                ) : distanceError ? (
                  <span className="text-destructive">{distanceError}</span>
                ) : estimate && routeLabel ? (
                  <>
                    <span className="font-medium">{routeLabel}</span>
                    <span className="text-muted-foreground">
                      ~{estimate.distanceMiles.toLocaleString()} mi estimated driving distance
                    </span>
                    {distanceResult && (
                      <span className="text-xs text-muted-foreground">
                        ({distanceResult.straightLineMiles.toLocaleString()} mi straight-line)
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-muted-foreground">
                    Enter two valid ZIP codes to see live distance
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Vehicle type</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {(['regular', 'larger'] as VehicleCategory[]).map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setVehicleCategory(category)}
                      className={`rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                        vehicleCategory === category
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'hover:border-primary/30'
                      }`}
                      aria-pressed={vehicleCategory === category}
                    >
                      <span className="font-semibold block mb-0.5">
                        {category === 'regular' ? 'Regular' : 'Larger'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {category === 'regular'
                          ? 'Sedan, hatchback, convertible, small car'
                          : 'SUV, pickup truck, van, etc.'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Transport type</span>
                  <InfoTooltip
                    label="Open vs enclosed transport"
                    content="Open transport uses a multi-car carrier exposed to weather and is the most affordable option. Enclosed transport uses a covered trailer for added protection and typically costs about $0.15 more per mile."
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {(['open', 'enclosed'] as TransportMethod[]).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setTransportMethod(method)}
                      className={`rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                        transportMethod === method
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'hover:border-primary/30'
                      }`}
                      aria-pressed={transportMethod === method}
                    >
                      <span className="font-semibold block mb-0.5">
                        {method === 'open' ? 'Open Transport' : 'Enclosed Transport'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {method === 'open'
                          ? 'Standard multi-car carrier — most affordable'
                          : 'Covered trailer — best for luxury or classic cars'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div
                className={`rounded-2xl border p-5 sm:p-6 transition-all ${
                  estimate ? 'bg-primary/[0.04] border-primary/20' : 'bg-muted/20'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Estimated total cost
                    </p>
                    {estimate ? (
                      <>
                        <p className="text-3xl sm:text-4xl font-semibold tracking-tight">
                          {formatCurrency(estimate.lowTotal)} – {formatCurrency(estimate.highTotal)}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {estimate.distanceMiles.toLocaleString()} miles
                        </p>
                      </>
                    ) : (
                      <p className="text-lg text-muted-foreground">
                        Enter ZIP codes to see your price range
                      </p>
                    )}
                  </div>
                  <Button
                    size="lg"
                    className="h-12 px-8 text-base shrink-0"
                    disabled={!estimate}
                    onClick={() => setShowQuoteModal(true)}
                  >
                    Request Transport Quote
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Actual prices may vary based on vehicle size, condition, time of year, and carrier
                availability.
              </p>

              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  FMCSA-licensed carriers
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-muted-foreground">
                  Insured transport options
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-muted-foreground">
                  No obligation quotes
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="border-b py-6">
        <TrustBadges variant="compact" className="justify-center" />
      </div>

      <QuoteModal
        open={showQuoteModal}
        onOpenChange={setShowQuoteModal}
        prefilledData={quotePrefill}
      />
    </>
  );
}