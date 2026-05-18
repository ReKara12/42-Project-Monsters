const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI || "https://storied-fairy-cb64b7.netlify.app/"; // KENDİ NETLIFY ADRESİNİ YAZ

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

async function exchangeCode(code, redirectUri) {
  const form = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: String(code || "").trim(),
    redirect_uri: redirectUri
  });

  const r = await fetch("https://api.intra.42.fr/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString()
  });

  if (!r.ok) throw new Error("Token alınamadı. Redirect URI veya kod hatalı.");
  return r.json();
}

async function fetch42(token, path) {
  const r = await fetch(`https://api.intra.42.fr${path}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!r.ok) throw new Error(`${path} çekilemedi.`);
  return r.json();
}

async function handleAuthExchange(code, redirectUri) {
  const { access_token } = await exchangeCode(code, redirectUri);
  const [me, coalitions] = await Promise.all([
    fetch42(access_token, "/v2/me"),
    fetch42(access_token, "/v2/me/coalitions").catch(() => [])
  ]);

  const coalition = coalitions.length > 0 ? coalitions[coalitions.length - 1] : null;
  return {
    id: String(me.id),
    login: me.login,
    displayName: me.displayname || me.login,
    coalition: coalition?.name || "The Alliance",
    avatarUrl: me.image?.versions?.medium || me.image?.link || ""
  };
}

// NETLIFY ANA FONKSİYONU
export const handler = async (event, context) => {
  // CORS kontrolü
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  try {
    let code, redirectUri;

    if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body || "{}");
      code = body.code;
      redirectUri = body.redirect_uri || body.redirectUri || REDIRECT_URI;
    } else if (event.httpMethod === "GET") {
      code = event.queryStringParameters.code;
      redirectUri = event.queryStringParameters.redirect_uri || REDIRECT_URI;
    } else {
      return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: "Method not allowed" }) };
    }

    if (!code) return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "missing code" }) };

    const profile = await handleAuthExchange(code, redirectUri);
    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ success: true, player: profile, ...profile }) };

  } catch (err) {
    console.error("Netlify Auth Error:", err);
    return { statusCode: 502, headers: corsHeaders, body: JSON.stringify({ error: "auth_failed", detail: err.message }) };
  }
};