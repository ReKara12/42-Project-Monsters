# 42 Project Monsters

Cat The Jam MVP: vanilla HTML/CSS/JS pixel-style coalition battle.

## Loop (stable build)

`Start Local Battle` / **Local Jam Profile** → pick a **project monster** → tap **attack** moves → enemy **counter** → **win/loss** → **coalition leaderboard** updates (local `localStorage` unless Firebase is set in `config.js`).

## Battle rules

- Monster data lives in `content.js` (`MONSTER_DATA`). Each entry has `moves: [{ attack, damage }, ...]` (minimum one move; three recommended).
- Player picks a move; enemy HP drops, then the enemy answers with a random move scaled into counter damage.
- Score after a battle uses total damage, remaining HP, and a win bonus (see `calculateBattleScore` in `app.js`).

## Quick test (no server)

1. Open `index.html` in a modern browser (double-click, or “Open with Live Server” if you use it).
2. Click **Start Local Battle** (uses the intra/coalition form; defaults apply if fields are empty).
3. Choose **Local Jam Profile** if you changed intra/coalition.
4. Select any monster card.
5. Click attack buttons; watch HP bars, HUD pulse, and light screen shake on hits.
6. End the fight (win, loss, or **Abort**); confirm **Coalition Board** updates for scored runs and the Recent Battles row appears.

## Quick test (static server)

Some browsers restrict `file://` storage; a tiny static server avoids that:

```bash
npx --yes serve .
# then open the printed URL (e.g. http://127.0.0.1:3000)
```

## Firebase RTDB

Leave `firebaseDatabaseUrl` empty in `config.js` for offline/local leaderboard. For shared scores, set the URL and optional `FRONT_ADAPTERS.getBackendContext` for path/auth.

`app.js` treats failed HTTP (`!response.ok`), JSON parse errors, and malformed run lists as empty or skippable rows so the **local demo path** (Local Jam Profile + battle) keeps working.

## 42 Auth

Public clients cannot exchange the OAuth `code` without a backend. Use `authProxyUrl` pointing at a small server that swaps the code for profile JSON (see brief). Until then, **Start Local Battle** + **Local Jam Profile** is the demo path.

## Assets

- Logo: `assets/logo.svg` (referenced from the header in `index.html`).

## Team / AI coordination

- **Code** lives in this repo only.
- **Handoffs, briefs, and archive** — not in this folder. Use the desktop archive: `C:\Users\sahsenem\Desktop\cat-the-jam-arsiv-2026-05-17` (entry: `AI_KOORDINASYON.md`).
- **Map generation** (`maps.js`, `dungeon_generator.js`) — Reşat; coordinate with Semih before changes.
