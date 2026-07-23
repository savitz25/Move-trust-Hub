import { alabamaStateResourceHub } from '@/lib/local-movers/state-resource-hub/alabama';
import { alaskaStateResourceHub } from '@/lib/local-movers/state-resource-hub/alaska';
import { arizonaStateResourceHub } from '@/lib/local-movers/state-resource-hub/arizona';
import { arkansasStateResourceHub } from '@/lib/local-movers/state-resource-hub/arkansas';
import { californiaStateResourceHub } from '@/lib/local-movers/state-resource-hub/california';
import { coloradoStateResourceHub } from '@/lib/local-movers/state-resource-hub/colorado';
import { connecticutStateResourceHub } from '@/lib/local-movers/state-resource-hub/connecticut';
import { floridaStateResourceHub } from '@/lib/local-movers/state-resource-hub/florida';
import { georgiaStateResourceHub } from '@/lib/local-movers/state-resource-hub/georgia';
import { hawaiiStateResourceHub } from '@/lib/local-movers/state-resource-hub/hawaii';
import { idahoStateResourceHub } from '@/lib/local-movers/state-resource-hub/idaho';
import { illinoisStateResourceHub } from '@/lib/local-movers/state-resource-hub/illinois';
import { indianaStateResourceHub } from '@/lib/local-movers/state-resource-hub/indiana';
import { iowaStateResourceHub } from '@/lib/local-movers/state-resource-hub/iowa';
import { kansasStateResourceHub } from '@/lib/local-movers/state-resource-hub/kansas';
import { kentuckyStateResourceHub } from '@/lib/local-movers/state-resource-hub/kentucky';
import { louisianaStateResourceHub } from '@/lib/local-movers/state-resource-hub/louisiana';
import { maineStateResourceHub } from '@/lib/local-movers/state-resource-hub/maine';
import { marylandStateResourceHub } from '@/lib/local-movers/state-resource-hub/maryland';
import { massachusettsStateResourceHub } from '@/lib/local-movers/state-resource-hub/massachusetts';
import { michiganStateResourceHub } from '@/lib/local-movers/state-resource-hub/michigan';
import { minnesotaStateResourceHub } from '@/lib/local-movers/state-resource-hub/minnesota';
import { mississippiStateResourceHub } from '@/lib/local-movers/state-resource-hub/mississippi';
import { missouriStateResourceHub } from '@/lib/local-movers/state-resource-hub/missouri';
import { montanaStateResourceHub } from '@/lib/local-movers/state-resource-hub/montana';
import { nebraskaStateResourceHub } from '@/lib/local-movers/state-resource-hub/nebraska';
import { nevadaStateResourceHub } from '@/lib/local-movers/state-resource-hub/nevada';
import { newJerseyStateResourceHub } from '@/lib/local-movers/state-resource-hub/new-jersey';
import { newMexicoStateResourceHub } from '@/lib/local-movers/state-resource-hub/new-mexico';
import { newYorkStateResourceHub } from '@/lib/local-movers/state-resource-hub/new-york';
import { northCarolinaStateResourceHub } from '@/lib/local-movers/state-resource-hub/north-carolina';
import { northDakotaStateResourceHub } from '@/lib/local-movers/state-resource-hub/north-dakota';
import { ohioStateResourceHub } from '@/lib/local-movers/state-resource-hub/ohio';
import { oklahomaStateResourceHub } from '@/lib/local-movers/state-resource-hub/oklahoma';
import { oregonStateResourceHub } from '@/lib/local-movers/state-resource-hub/oregon';
import { pennsylvaniaStateResourceHub } from '@/lib/local-movers/state-resource-hub/pennsylvania';
import { southCarolinaStateResourceHub } from '@/lib/local-movers/state-resource-hub/south-carolina';
import { southDakotaStateResourceHub } from '@/lib/local-movers/state-resource-hub/south-dakota';
import { tennesseeStateResourceHub } from '@/lib/local-movers/state-resource-hub/tennessee';
import { texasStateResourceHub } from '@/lib/local-movers/state-resource-hub/texas';
import { utahStateResourceHub } from '@/lib/local-movers/state-resource-hub/utah';
import { virginiaStateResourceHub } from '@/lib/local-movers/state-resource-hub/virginia';
import { washingtonStateResourceHub } from '@/lib/local-movers/state-resource-hub/washington';
import { westVirginiaStateResourceHub } from '@/lib/local-movers/state-resource-hub/west-virginia';
import { wisconsinStateResourceHub } from '@/lib/local-movers/state-resource-hub/wisconsin';
import { wyomingStateResourceHub } from '@/lib/local-movers/state-resource-hub/wyoming';
import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

const PACKS: StateResourceHubPack[] = [
  alabamaStateResourceHub,
  alaskaStateResourceHub,
  arizonaStateResourceHub,
  arkansasStateResourceHub,
  californiaStateResourceHub,
  coloradoStateResourceHub,
  connecticutStateResourceHub,
  floridaStateResourceHub,
  georgiaStateResourceHub,
  hawaiiStateResourceHub,
  idahoStateResourceHub,
  illinoisStateResourceHub,
  indianaStateResourceHub,
  iowaStateResourceHub,
  kansasStateResourceHub,
  kentuckyStateResourceHub,
  louisianaStateResourceHub,
  maineStateResourceHub,
  marylandStateResourceHub,
  massachusettsStateResourceHub,
  michiganStateResourceHub,
  minnesotaStateResourceHub,
  mississippiStateResourceHub,
  missouriStateResourceHub,
  montanaStateResourceHub,
  nebraskaStateResourceHub,
  nevadaStateResourceHub,
  newJerseyStateResourceHub,
  newMexicoStateResourceHub,
  newYorkStateResourceHub,
  northCarolinaStateResourceHub,
  northDakotaStateResourceHub,
  ohioStateResourceHub,
  oklahomaStateResourceHub,
  oregonStateResourceHub,
  pennsylvaniaStateResourceHub,
  southCarolinaStateResourceHub,
  southDakotaStateResourceHub,
  tennesseeStateResourceHub,
  texasStateResourceHub,
  utahStateResourceHub,
  virginiaStateResourceHub,
  washingtonStateResourceHub,
  westVirginiaStateResourceHub,
  wisconsinStateResourceHub,
  wyomingStateResourceHub,
];

const bySlug = new Map(PACKS.map((p) => [p.stateSlug, p] as const));

export function getStateResourceHubPack(
  stateSlug: string
): StateResourceHubPack | null {
  return bySlug.get(stateSlug) ?? null;
}

export function hasStateResourceHubPack(stateSlug: string): boolean {
  return bySlug.has(stateSlug);
}
