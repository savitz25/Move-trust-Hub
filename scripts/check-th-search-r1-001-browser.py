"""Bounded, operator-invoked live browser proof; never run by ordinary CI.

Requires an already authorized agent-browser session and its executable path.
Only public research questions are captured. No data writes or auth state dumps.
"""
import argparse, base64, datetime, json, pathlib, subprocess, urllib.parse

p = argparse.ArgumentParser()
p.add_argument('--browser', required=True)
p.add_argument('--origin', required=True)
p.add_argument('--label', required=True)
p.add_argument('--sha', required=True)
p.add_argument('--deployment', required=True)
args = p.parse_args()
folder = pathlib.Path('docs/qa/th-search-r1-001')
report = {'utc': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'surface': 'persistent Chromium via agent-browser', 'origin': args.origin, 'sha': args.sha, 'deployment': args.deployment, 'checks': []}

def browser(*argv):
    run = subprocess.run([args.browser, '--session', 'th-r1', '--json', *argv], capture_output=True, text=True, encoding='utf-8', timeout=65)
    data = json.loads(run.stdout)
    if run.returncode or not data.get('success'): raise RuntimeError(str(data))
    return data.get('data', {})

def js(code):
    return browser('eval', '-b', base64.b64encode(code.encode()).decode()).get('result')

def settled():
    browser('wait', '--load', 'networkidle')
    return js("({path:location.pathname,text:document.querySelector('main').innerText,width:innerWidth,scroll:document.documentElement.scrollWidth,robots:document.querySelector('meta[name=robots]')?.content})")

def screenshot(name):
    browser('screenshot', str((folder / (args.label+'-'+name+'.png')).resolve()))

try:
    for width, question in [(1280, 'USDOT 3244649'), (390, 'usdot 3244 649 miama movers')]:
        browser('set', 'viewport', str(width), '900')
        browser('open', args.origin+'/')
        browser('wait', '--load', 'networkidle')
        browser('wait', '3000')
        browser('find', 'label', 'Mover research question, company, USDOT or MC number', 'fill', question)
        assert js('document.activeElement.value') == question
        browser('press', 'Enter')
        browser('wait', '--url', '**/ask?*')
        ui = settled()
        assert ui['path']=='/ask' and 'SHIFL INC' in ui['text']
        assert 'records USDOT 3244649.' in ui['text'] and 'records USDOT 3244.' not in ui['text']
        assert ui['scroll'] <= width
        assert 'noindex' in ui['robots']
        if width==390: assert 'miama movers' in ui['text'] and 'Not established' in ui['text']
        # Keyboard-operated native disclosure, with real browser focus and Enter.
        for name in ['Trace this result', 'Trace this query']:
            js("(()=>{const e=[...document.querySelectorAll('summary')].find(e=>e.textContent.trim()==="+json.dumps(name)+");e.focus();e.scrollIntoView({block:'center'});return document.activeElement===e})()")
            browser('press', 'Enter')
            assert js("[...document.querySelectorAll('summary')].find(e=>e.textContent.trim()==="+json.dumps(name)+").parentElement.open")
        ui = settled()
        assert 'USDOT 3244649' in ui['text'] and 'MC 1019808' in ui['text']
        assert ui['scroll'] <= width
        api = js("fetch('/api/ask?q='+encodeURIComponent("+json.dumps(question)+")).then(async r=>({status:r.status,data:await r.json()}))")
        assert api['status']==200 and len(api['data']['results'])==1
        row=api['data']['results'][0]
        assert row['usdot']=='3244649' and row['mc']=='1019808'
        assert row['name'] in ui['text'] and row['whyMatched'] in ui['text']
        assert api['data']['counts'][0]['value']==1
        js("[...document.querySelectorAll('h3')].find(e=>e.textContent==='SHIFL INC').scrollIntoView({block:'center'})")
        screenshot('identity-'+str(width))
        report['checks'].append({'name':'homepage-keyboard-native-api-trace', 'width':width,'question':question,'ui':ui,'api':api})
    browser('set','viewport','320','844')
    ui=settled(); assert ui['scroll']<=320
    screenshot('identity-320')
    report['checks'].append({'name':'320-overflow','width':320,'scroll':ui['scroll']})
    questions = ['USDOT 3244 649','MC 1019 808','USDOT 3244','USDOT lookup','USDOT 3244 MC 649','mover in new jersey','How many current household-goods carriers are headquartered in New Jersey?','NJ PM/PW/PC licensed movers','movers in Miami']
    for index, question in enumerate(questions):
        browser('set','viewport', '1280' if index%2 else '390','900')
        browser('open',args.origin+'/ask?q='+urllib.parse.quote(question))
        ui=settled(); assert ui['path']=='/ask' and ui['scroll']<=ui['width']
        api=js("fetch('/api/ask?q='+encodeURIComponent("+json.dumps(question)+")).then(async r=>({status:r.status,data:await r.json()}))")
        data=api['data']; assert api['status']==200
        assert data['terminalState']!='UNAVAILABLE'
        for row in data['results']: assert row['name'] in ui['text'] and row['whyMatched'] in ui['text']
        if index in [0,1]: assert len(data['results'])==1 and data['results'][0]['usdot']=='3244649'
        if index==2: assert all(r['usdot']=='3244' for r in data['results'])
        if index==3: assert data['terminalState']=='NEEDS_CLARIFICATION'
        if index==4: assert not data['results']
        if index==5: assert data['results'] and 'Recorded' in ui['text'] and data['query']['executor']=='directory'
        if index==6:
            assert data['query']['mode']=='count' and data['query']['role']=='carrier' and data['query']['authorityCurrent'] is True
            assert data['query']['jurisdiction']['state']=='NJ' and data['counts']
            assert str(data['counts'][0]['value']) in ui['text']
        if index in [7,8]: assert not data['results'] and data['coverageState'] in ['UNSUPPORTED','REQUEST_ONLY','NOT_ACQUIRED']
        if index in [3,5,6,7]: screenshot('case-'+str(index))
        report['checks'].append({'name':question,'ui':ui,'api':api})
    report['status']='PASS'
finally:
    (folder/(args.label+'-browser.json')).write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps({'status':report.get('status','FAIL'),'checks':len(report['checks']),'artifact':str(folder/(args.label+'-browser.json'))}))
