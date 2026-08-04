# Network PR checklist

Before merging network-related work:

```text
[ ] Which production domain(s) must change?
[ ] Did I push the repo that Vercel deploys for that domain?
[ ] Insurance/Lender apex changes → standalone repo commit exists
[ ] Bumped ASK_NETWORK_STANDARD_VERSION if chrome/journey contract changed
[ ] After deploy: npm run smoke:network (or curl list in NETWORK-DEPLOY.md)
```

Full rules: [NETWORK-DEPLOY.md](./NETWORK-DEPLOY.md)
