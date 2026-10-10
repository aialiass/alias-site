-- Tabella delle iscrizioni dal modulo "Prova Alias" (alias-ai.it).
-- Da eseguire una volta nello SQL Editor del progetto Supabase (progetto `alias`, regione UE eu-west-1, Irlanda).
-- Il sito usa la chiave anon/publishable: con queste regole può solo inserire righe, mai leggerle.
-- Le iscrizioni si leggono dal Table Editor di Supabase, da loggati.

create table if not exists public.iscrizioni (
  id            bigint generated always as identity primary key,
  creata_il     timestamptz not null default now(),
  nome          text not null check (char_length(nome) between 1 and 120),
  cognome       text not null check (char_length(cognome) between 1 and 120),
  email         text not null check (char_length(email) between 3 and 254),
  telefono      text check (char_length(telefono) <= 40),
  studio        text not null check (char_length(studio) between 1 and 160),
  persone       text not null check (persone in ('1-5', '6-15', '16-50', 'Più di 50')),
  privacy_letta boolean not null check (privacy_letta)
);

alter table public.iscrizioni enable row level security;

-- il sito (ruolo anon) può solo inserire; select/update/delete restano chiusi
revoke all on public.iscrizioni from anon, authenticated;
grant insert on public.iscrizioni to anon;

drop policy if exists "il sito puo solo inserire" on public.iscrizioni;
create policy "il sito puo solo inserire" on public.iscrizioni
  for insert to anon
  with check (true);

-- Nessuna policy di select, update o delete per anon: dal sito non si rilegge niente.
-- Conservazione (informativa privacy): cancellare le righe dopo 12 mesi dall'ultimo contatto.
