# alias-site

Landing di Alias, pubblicata su https://alias-ai.it tramite Vercel. Ogni push su `main` va in produzione; ogni altro branch ha un'anteprima.

Pagine statiche, nessuna build:
- `index.html` homepage, con il modulo "Prova Alias"
- `come-funziona.html`, `team.html`, `privacy.html`
- `404.html` pagina di errore: usa percorsi assoluti, perché viene servita a qualsiasi indirizzo
- `escludimi.html` pagina per il team, non linkata: aperta una volta da un browser, quel browser non viene più contato dalle statistiche di visita (Vercel Web Analytics, attivo dal 26/10/2026)
- `favicon.svg`, `robots.txt`, `sitemap.xml`
- `font/` il Bricolage Grotesque condiviso dalle pagine, `img/` le foto del team (dal deck TEF) e `og.png`, l'anteprima dei link (1200×630)
- `api/iscrizione.js` funzione Vercel che riceve il modulo e lo salva su Supabase

## Modulo di iscrizione

Il modulo manda un POST JSON a `/api/iscrizione`, che inserisce la riga nella tabella `iscrizioni` di Supabase (progetto in UE, Irlanda). Per attivarlo:
1. eseguire `supabase/iscrizioni.sql` nello SQL Editor del progetto Supabase;
2. su Vercel, Settings → Environment Variables: `SUPABASE_URL` e `SUPABASE_KEY` (chiave anon/publishable), poi un nuovo deploy.

Con la chiave anon la tabella accetta solo inserimenti: le iscrizioni si leggono dal Table Editor di Supabase.

## Da completare

- Indirizzo di contatto `alessandro.diaz@alias-ai.it` (in `index.html`, `CONTACT_EMAIL`, e in `privacy.html`): la casella va attivata su OVH prima di andare in produzione.
- L'informativa privacy è una bozza ragionevole, non un parere legale: va riletta prima di raccogliere iscrizioni vere.
