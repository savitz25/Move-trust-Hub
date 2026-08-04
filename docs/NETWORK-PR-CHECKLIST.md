# Network PR checklist

Before merging network-related work:

```text
[ ] Which production domain(s) must change?
[ ] Did I push the repo that Vercel deploys for that domain?
[ ] Insurance/Lender apex changes → standalone repo commit exists
[ ] Bumped ASK_NETWORK_STANDARD_VERSION if chrome/journey contract changed
[ ] After deploy: npm run smoke:network (or curl list in NETWORK-DEPLOY.md)
[ ] Trust Mark: primary label “Ask Trust Hub Standard” → asktrusthub.com/methodology
[ ] Manual: methodology + one journey + one profile per hub show mark without endorsement wording
```

Full rules: [NETWORK-DEPLOY.md](./NETWORK-DEPLOY.md)
