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
  const projectsUsers = await fetchUserProjects(access_token, me).catch(() => null);

  return shapeProfile(me, coalitions, projectsUsers);
}

async function fetchUserProjects(token, me) {
  const userId = me?.id;
  if (!userId) return null;
  const all = [];
  for (let page = 1; page <= 4; page += 1) {
    const path = `/v2/users/${userId}/projects_users?filter[validated]=true&page[size]=100&page[number]=${page}`;
    const rows = await fetch42(token, path);
    if (!Array.isArray(rows)) return all;
    all.push(...rows);
    if (rows.length < 100) break;
  }
  return all;
}

function pickMainCursus(cursusUsers) {
  if (!Array.isArray(cursusUsers) || !cursusUsers.length) return null;
  return cursusUsers.find((entry) => {
    const name = String(entry?.cursus?.name || entry?.cursus_name || "").toLowerCase();
    const slug = String(entry?.cursus?.slug || "").toLowerCase();
    return name === "42" || slug === "42" || name.includes("42 curriculum");
  }) || cursusUsers[cursusUsers.length - 1];
}

function projectBelongsToCursus(projectUser, cursusUser) {
  if (!cursusUser || !projectUser) return true;
  const cursusId = cursusUser.cursus?.id ?? cursusUser.cursus_id;
  if (cursusId == null) return true;
  if (Array.isArray(projectUser.cursus_ids)) {
    return projectUser.cursus_ids.some((id) => Number(id) === Number(cursusId));
  }
  if (projectUser.cursus?.id != null) return Number(projectUser.cursus.id) === Number(cursusId);
  return true;
}

function shapeProfile(me, coalitions, projectsUsers) {
  const coalition = coalitions.length > 0 ? coalitions[coalitions.length - 1] : null;
  const cursus = pickMainCursus(me.cursus_users);
  const sourceProjects = Array.isArray(projectsUsers) && projectsUsers.length
    ? projectsUsers
    : me.projects_users;
  const validated = Array.isArray(sourceProjects)
    ? sourceProjects.filter((p) => p && p["validated?"] && projectBelongsToCursus(p, cursus))
    : [];
  const passedProjectSlugs = validated
    .map((p) => p.project?.slug || p.project?.name || "")
    .map((value) => String(value).trim())
    .filter(Boolean);
  const cursusLevel = Number(cursus?.level);

  return {
    id: String(me.id),
    login: me.login,
    displayName: me.displayname || me.login,
    coalition: coalition?.name || "The Alliance",
    coalitionColor: coalition?.color || "",
    avatarUrl: me.image?.versions?.medium || me.image?.link || "",
    passedProjects: validated.length,
    passedProjectSlugs,
    passedProjectsSlugs: passedProjectSlugs,
    passedProjectsList: passedProjectSlugs,
    cursusLevel: Number.isFinite(cursusLevel) ? cursusLevel : null
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
