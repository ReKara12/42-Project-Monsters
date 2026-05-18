# 42 Project Monsters

42 Project Monsters, 42 öğrencisinin gerçek cursus ilerlemesini pixel-art PvE proje-canavarı oyununa çeviren web oyunudur. Oyuncu 42 Auth ile giriş yapar; tamamladığı projeler canavar havuzunu, aktif milestone'u ise harita/battle seviyesini belirler.

- Canlı demo: https://storied-fairy-cb64b7.netlify.app/
- Repo: https://github.com/ReKara12/42-Project-Monsters
- Stack: vanilla HTML/CSS/JS, HTML5 Canvas, Netlify Functions, Firebase Realtime Database

## Mevcut Build

- 42 OAuth login ve Netlify `/api/auth` proxy.
- Firebase RTDB leaderboard + localStorage fallback.
- Pixel PvE battle: oyuncu proje canavarı seçer, AI düşmana karşı savaşır.
- Map/village exploration ve encounter akışı.
- Milestone hesaplama: tamamlanan en yüksek proje milestone'u + 1.
- Coalition leaderboard: `runs` içindeki `coalition` skorları toplanır.
- Leaderboard görselleri: `assets/kaleler/` içindeki dört kale asseti.
- Enemy sprite manifest: `assets/enemies/manifest.json`.

## Lokal Çalıştırma

```bash
npm install
npm start
```

Sonra aç:

```text
http://127.0.0.1:3000/
```

Local demo için 42 Auth şart değil; local profile/battle akışı localStorage ile çalışır.

## Auth

Client tarafında secret tutulmaz. Browser sadece public config okur:

- `config.js`
- `authClientId`
- `authRedirectUri`
- `authProxyUrl: "/api/auth"`

OAuth code exchange Netlify function içinde yapılır:

- `netlify/functions/auth-proxy.mjs`
- `netlify.toml` `/api/auth` isteğini bu function'a yönlendirir.

## Firebase

Firebase RTDB URL `config.js` içinde public olarak durur:
Kullanıcıların validate ettiği projeleri kaydedip onlara project monsters oalrak verir.
Kullanıcılara id atayıp onların ilerleyişinin kayboluşunu engellemek için kaydeder.

Kullanılan ana pathler:

- `/runs`: battle sonuçları ve coalition skorları.
- `/players/{id}`: oyuncu profil/economy/state kaydı.

Firebase hata verirse oyun demo akışını bozmadan localStorage fallback'e döner.

## Milestone Kuralı

42 API'den gelen validated proje listesi kullanılır.

- M0 projesi tamamlandıysa oyuncu M1 bölgesine girer.
- M1 projeleri tamamlandıysa oyuncu M2 bölgesine girer.
- Slug listesi yoksa fallback olarak passed project sayısı/cursus level kullanılır.

İlgili veri alanları:

- `passedProjectSlugs`
- `passedProjects`
- `passedProjectsList`
- `cursusLevel`

## Battle ve Skor

Savaşlar PvE'dir. Rakip gerçek oyuncu değildir.

- Oyuncu hasar verir.
- AI düşman counter atar.
- Skor; verilen hasar, kalan HP ve win bonusundan oluşur.
- Abort sonucu skor yazmaz veya 0 kabul edilir.
- `enemyCoalition` PvP rakibi değildir; sadece düşman tema/görsel etiketi olarak kullanılır.
- Rakip coalition'dan puan düşmez.

## Önemli Dosyalar

- `index.html`: ekran iskeleti.
- `styles.css`: UI, menu, battle, leaderboard stilleri.
- `app.js`: ana oyun akışı, auth callback, battle, scoring, Firebase adapter.
- `content.js`: monster/proje verileri.
- `config.js`: browser-safe public config.
- `maps.js`: map verisi.
- `dungeon_generator.js`: dungeon/map generation.
- `GDD.md`: güncel oyun tasarım dokümanı.
- `assets/`: görseller.
- `tiles/`: map tile assetleri.
- `netlify/functions/auth-proxy.mjs`: 42 Auth backend proxy.
