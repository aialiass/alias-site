# alias-site

Landing di Alias, pubblicata su https://alias-ai.it tramite Vercel. Ogni push su `main` va in produzione; ogni altro branch ha un'anteprima.

Pagine statiche, nessuna build:
- `index.html` homepage, con il modulo "Prova Alias"
- `come-funziona.html`, `team.html`, `privacy.html`
- `font/` il Bricolage Grotesque condiviso dalle pagine, `img/` le foto del team (dal deck TEF)
- `api/iscrizione.js` funzione Vercel che riceve il modulo e lo salva su Supabase

## Modulo di iscrizione

Il modulo manda un POST JSON a `/api/iscrizione`, che inserisce la riga nella tabella `iscrizioni` di Supabase (progetto in UE, Francoforte). Per attivarlo:
1. eseguire `supabase/iscrizioni.sql` nello SQL Editor del progetto Supabase;
2. su Vercel, Settings → Environment Variables: `SUPABASE_URL` e `SUPABASE_KEY` (chiave anon/publishable), poi un nuovo deploy.

Con la chiave anon la tabella accetta solo inserimenti: le iscrizioni si leggono dal Table Editor di Supabase.

## Da completare

- Indirizzo di contatto: `CONTACT_EMAIL` nello script di `index.html` e `[email da definire]` in `privacy.html`. Finché `CONTACT_EMAIL` è vuoto, la riga "Preferisci scriverci?" sotto il modulo resta nascosta.
- L'informativa privacy è una bozza ragionevole, non un parere legale: va riletta prima di raccogliere iscrizioni vere.
