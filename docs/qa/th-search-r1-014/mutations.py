from pathlib import Path
import subprocess,json
p=Path('lib/move-ask/journey.ts');original=p.read_text(encoding='utf-8')
mutations=[('drop-destination','destination,','destination: undefined,'),('hq-is-service','availability: "NOT_ESTABLISHED",','availability: "ESTABLISHED_BY_HQ" as any,'),('federal-for-intrastate','? "state_intrastate_research"','? "federal_interstate_research"'),('booking-name-fallback','const booking =','if (/book|hire|schedule/i.test(text)) return null;\n  const booking =')]
results=[]
try:
 for name,old,new in mutations:
  if old not in original:
   results.append({'mutation':name,'error':'anchor not found'});continue
  p.write_text(original.replace(old,new,1),encoding='utf-8')
  r=subprocess.run(['node','node_modules/tsx/dist/cli.mjs','--require','./scripts/stub-server-only.cjs','--test','lib/move-ask/r1-journey.test.ts'],capture_output=True,text=True,encoding='utf-8')
  Path('docs/qa/th-search-r1-014/mutation-'+name+'.log').write_text(r.stdout+r.stderr,encoding='utf-8')
  results.append({'mutation':name,'exit':r.returncode,'detected':r.returncode!=0});p.write_text(original,encoding='utf-8')
finally:p.write_text(original,encoding='utf-8')
Path('docs/qa/th-search-r1-014/mutations.json').write_text(json.dumps(results,indent=2),encoding='utf-8');print(results)
