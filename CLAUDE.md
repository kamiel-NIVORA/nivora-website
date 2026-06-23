<!-- NIVORA:VISION:START -->
## 🎯 Werkruimte-visie — Nivora website

Dit is het gedeelde doel/de context van deze werkruimte (beheerd door Nivora Dev).
Houd hier rekening mee bij alles wat je in deze map doet.

ik wil hier de wbesite verder af maken van nivora en na elke update wil ik dat de agent het door pushed naar github en vercel
<!-- NIVORA:VISION:END -->

# Nivora Works — website

Marketing website voor Nivora Works (Vite + React + TypeScript, react-router). Deze repo is `kamiel-NIVORA/nivora-website`.

## ⚠️ DEPLOY-REGEL — VERPLICHT NA ELKE WIJZIGING

**Na ELKE code-wijziging is de laatste stap ALTIJD: committen en pushen naar `main`.**

```bash
git add <gewijzigde bestanden>
git commit -m "..."
git push origin main
```

Dat is genoeg. De repo is **git-gekoppeld aan Vercel**, dus een push naar `main` **deployt automatisch naar productie**. Je hoeft GEEN losse `vercel deploy` te draaien — "pushen naar GitHub" = "live op Vercel".

Sla deze stap nooit over. Een wijziging die niet gepusht is, staat niet live. Behandel push-naar-`main` als onderdeel van "klaar", niet als iets aparts dat de gebruiker moet vragen.

## Hosting (de ENIGE juiste accounts)

- **GitHub:** `kamiel-NIVORA/nivora-website` (remote `origin`) — zelfde account als alle andere Nivora-repos.
- **Vercel:** project `nivora-website` onder team **Nivora** (slug `nivoraworks`, teamId `team_kP693K9MrxBN4A0H5T5nbqH7`), git-gekoppeld, productie-branch `main`.
- **Live:** https://nivora-website-nivoraworks.vercel.app
- Oude locaties (`workflowatlasai-creator/website-main` op GitHub, en het project onder team `kamiel-nivilles-projects` op Vercel) zijn **afgedankt** — gebruik die NOOIT.

### Als `git push` faalt op authenticatie
De lokale `git`/`gh` kan op een ander GitHub-account staan dan `kamiel-NIVORA`. Authenticeer dan als `kamiel-NIVORA` (`gh auth login` en kies dat account, óf een kamiel-NIVORA PAT met `repo`-scope in de remote-URL). De GitHub-MCP in deze omgeving is doorgaans al als `kamiel-NIVORA` ingelogd.

## Huisstijl / conventies

- **Geen em-dashes (`—`) in zichtbare tekst.** Gebruik komma's of punten. Dit is een harde voorkeur van Kamiel.
- `vercel.json` bevat een SPA-rewrite (`/(.*)` → `/index.html`) zodat deep links (`/media`, `/services/:slug`, …) in productie werken. Niet weghalen.
