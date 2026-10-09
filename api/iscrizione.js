// Riceve il modulo "Prova Alias" (POST JSON) e salva l'iscrizione nella tabella `iscrizioni` su Supabase.
// Variabili d'ambiente su Vercel: SUPABASE_URL e SUPABASE_KEY (chiave anon/publishable: la tabella
// accetta solo inserimenti, nessuno può rileggerla con questa chiave; vedi supabase/iscrizioni.sql).

const PERSONE = ["1-5", "6-15", "16-50", "Più di 50"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const text = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "metodo non ammesso" });
  }

  const b = req.body && typeof req.body === "object" ? req.body : {};

  // campo trappola: lo compilano solo i bot. Rispondiamo ok senza salvare niente.
  if (text(b.sito, 200)) return res.status(200).json({ ok: true });

  const row = {
    nome: text(b.nome, 120),
    cognome: text(b.cognome, 120),
    email: text(b.email, 254).toLowerCase(),
    telefono: text(b.telefono, 40) || null,
    studio: text(b.studio, 160),
    persone: text(b.persone, 20),
    privacy_letta: b.privacy === true,
  };

  if (!row.nome || !row.cognome || !row.studio || !EMAIL.test(row.email) || !PERSONE.includes(row.persone) || !row.privacy_letta) {
    return res.status(400).json({ error: "dati mancanti o non validi" });
  }

  const { SUPABASE_URL, SUPABASE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("iscrizione: SUPABASE_URL o SUPABASE_KEY mancanti");
    return res.status(503).json({ error: "iscrizioni non ancora attive" });
  }

  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/iscrizioni`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });
    if (!r.ok) {
      console.error("iscrizione: Supabase ha risposto", r.status, await r.text());
      return res.status(502).json({ error: "salvataggio non riuscito" });
    }
    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error("iscrizione: errore di rete", err);
    return res.status(502).json({ error: "salvataggio non riuscito" });
  }
};
