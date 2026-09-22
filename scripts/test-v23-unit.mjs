import { readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
const files=['lib/my-trusthub','lib/save-my-move'].flatMap(dir=>readdirSync(dir).filter(f=>/\.test\.(ts|mjs)$/.test(f)).map(f=>dir+'/'+f));
const result=spawnSync(process.execPath,['--import','tsx','--require','./scripts/stub-server-only.cjs','--test',...files],{stdio:'inherit'});
process.exit(result.status??1);
