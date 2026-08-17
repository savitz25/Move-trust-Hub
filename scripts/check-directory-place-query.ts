import { resolveDirectoryPlaceQuery } from '@/lib/directory/resolve-place-query';

function assert(cond: unknown, message: string) {
  if (!cond) throw new Error(message);
}

const sparks = resolveDirectoryPlaceQuery('sparks,nv');
assert(sparks, 'sparks,nv should resolve');
assert(sparks!.countySlug === 'washoe', `sparks county ${sparks!.countySlug}`);
assert(sparks!.countyHref === '/local-movers/nevada/washoe', sparks!.countyHref);
assert(sparks!.stateHref === '/local-movers/nevada', sparks!.stateHref);

const sparksSpaced = resolveDirectoryPlaceQuery('sparks nv');
assert(sparksSpaced?.countySlug === 'washoe', 'sparks nv');

const reno = resolveDirectoryPlaceQuery('reno nevada');
assert(reno?.countySlug === 'washoe', 'reno nevada');

const nevada = resolveDirectoryPlaceQuery('nevada');
assert(nevada?.kind === 'state', 'nevada is state');
assert(nevada?.stateHref === '/local-movers/nevada', nevada?.stateHref);
assert(!nevada?.countyHref, 'nevada should not force a county');

const washoe = resolveDirectoryPlaceQuery('washoe county');
assert(washoe?.countySlug === 'washoe', `washoe county → ${washoe?.countySlug}`);

const allied = resolveDirectoryPlaceQuery('Allied');
assert(allied === null, 'Allied must stay a company search');

const nonsense = resolveDirectoryPlaceQuery('xqztplm');
assert(nonsense === null, 'nonsense is not a place');

console.log('directory place query checks ok');
