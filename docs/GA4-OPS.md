# Analytics operations — Move Trust Hub

The hardcoded Google Analytics tag and its cross-domain linker have been removed from the app. Move does not inject that script, and it does not send page views through it.

PostHog, Sentry, and Vercel Analytics are separate and were not changed by this removal.

Do not reintroduce a measurement ID in source, and do not add a tag loader to the root layout.
