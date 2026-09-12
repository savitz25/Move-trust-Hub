import json, urllib.request, time, datetime, pathlib
queries=["movers from Miami Florida to New York City","moving from Boca Raton Florida to Austin Texas","movers near me","movers in Broward County","movers in Austin Texas","interstate mover from Florida to New Jersey","local mover in New Jersey","auto transport from Florida to Texas","moving my mother's belongings into assisted living","JK Moving Services licensed?","USDOT 3244649","MC 225850","mover serving Miami","broker for a move from Florida to New York","book a mover for tomorrow"]
from urllib.parse import urlencode
out=[]
for q in queries:
 t=time.monotonic()
 try:
  with urllib.request.urlopen('https://www.movetrusthub.com/api/ask?'+urlencode({'q':q}),timeout=30) as r: data=json.load(r)
  out.append({'q':q,'at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'ms':round((time.monotonic()-t)*1000),'response':data})
  print(q, data.get('terminalState'),data.get('query'), 'rows',len(data.get('results',[])),flush=True)
 except Exception as e: out.append({'q':q,'error':str(e)});print(q,str(e),flush=True)
pathlib.Path('docs/qa/th-search-r1-014/baseline-api.json').write_text(json.dumps({'base':'f17650ed5c9a695cb97c0b7a111e38ef93f2e3dc','observations':out},indent=2),encoding='utf-8')
