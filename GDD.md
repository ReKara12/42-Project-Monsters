# 42 Project Monsters - Game Design Document

Son guncelleme: 18 Mayis 2026

## 1. Kisa Ozet

42 Project Monsters, 42 ogrencisinin gercek cursus ilerlemesini pixel-art bir PvE proje-canavari oyununa cevirir. Oyuncu 42 Auth ile girer; tamamladigi projeler sahip oldugu canavarlara, bulundugu ilerleme seviyesi ise acilan harita/milestone bolgesine donusur.

Ana fikir: "42 projelerini sadece listelemiyoruz; oynanabilir canavar, harita ve coalition skoru haline getiriyoruz."

## 2. Platform ve Teknik Yapı

- Platform: Web
- Deploy: Netlify
- Canli URL: https://storied-fairy-cb64b7.netlify.app/
- Repo: https://github.com/ReKara12/true-gamers-game
- Stack: Vanilla HTML, CSS, JavaScript
- Render: HTML5 Canvas + DOM UI
- Auth: 42 OAuth, Netlify Function proxy
- Database: Firebase Realtime Database
- Fallback: localStorage

Secret/API key kurali: Client tarafinda secret yoktur. 42 `CLIENT_SECRET` Netlify environment variable olarak tutulur.

## 3. Oyuncu Fantezisi

Oyuncu 42 kampusunda kendi cursus yolculugunu gezer. Tamamladigi projeler onun takimi olur. Karsisina cikan dusmanlar mevcut milestone seviyesindeki proje canavarlaridir. Her galibiyet kendi coalition'ina puan yazar.

## 4. Ana Oyun Dongusu

1. Oyuncu ana menuden 42 ile login olur.
2. 42 API profil, coalition ve tamamlanan proje bilgileri alinir.
3. Oyun tamamlanan en yuksek proje milestone'una gore oyuncunun aktif bolgesini hesaplar.
4. Oyuncu `New Run` ile village/map ekranina girer.
5. Haritada WASD/ok tuslariyla gezer.
6. Dusmanla encounter tetiklenir.
7. Oyuncu sahip oldugu proje canavarlarindan birini secer.
8. PvE battle baslar.
9. Oyuncu hamle yapar, AI dusman counter atar.
10. Win/loss sonucu olusur.
11. Skor Firebase'e ve leaderboard'a yazilir.
12. Oyuncu tekrar village'a veya menulere doner.

## 5. Milestone Sistemi

Oyun milestone'u 42 profile datasindan turetilir.

Kural:
- Oyuncunun tamamladigi en yuksek proje hangi milestone'daysa, aktif oyun bolgesi onun bir sonraki milestone'udur.
- Ornek: M0 projesi tamamlandiysa oyuncu M1 bolgesine girer.
- Ornek: M1 projeleri tamamlandiysa oyuncu M2 bolgesine girer.

Veri kaynagi:
- Netlify auth proxy, 42 API'den validated project listesini ceker.
- `passedProjectSlugs`, `passedProjects`, `cursusLevel` frontend profile objesine eklenir.
- Frontend `deriveMilestoneFromProfile` ile oyun milestone'unu hesaplar.

Fallback:
- Proje slug listesi gelmezse `passedProjects` sayisindan yaklasik milestone hesaplanir.
- Hic veri yoksa oyuncu M0 kabul edilir.

## 6. Canavar Sistemi

Canavar verileri `content.js` icindeki `MONSTER_DATA` yapisindan gelir.

Her canavar:
- `id`
- `name`
- `project`
- `milestone`
- `track`
- `hp`
- `power`
- `moves`

Oyuncu sahipligi:
- 42'de validated olan projeler oyuncunun canavar havuzunu belirler.
- Validated slug varsa birebir proje eslesmesi kullanilir.
- Veri eksikse milestone fallback devreye girer.

## 7. Battle Sistemi

Battle PvE'dir. Rakip oyuncu degil, AI dusmandir.

Akis:
- Oyuncu aktif proje canavarini secer.
- Dusman mevcut milestone pool'undan gelir.
- Oyuncu hamle yapar.
- Dusman AI random/uygun hamle ile counter atar.
- HP 0 olunca battle biter.

Skor:
- Verilen hasar puana eklenir.
- Kalan HP bonusu vardir.
- Win bonusu vardir.
- Abort sonucu 0 puandir.

Not:
- Database'teki `enemyCoalition` alani PvP rakibi degildir.
- Sadece AI dusmana verilen gorsel/tema etiketi olarak kullanilir.
- Rakip coalition'dan puan dusmez.

## 8. Leaderboard

Leaderboard coalition bazlidir.

Skor yazimi:
- Battle sonucu `runs` koleksiyonuna yazilir.
- Her run icinde `coalition`, `score`, `intra`, `monsterName`, `enemyName`, `outcome`, `createdAt` vardir.
- Leaderboard sadece `run.coalition` alanina gore toplama yapar.

Coalition'lar:
- Slytherin
- Gryffindor
- Ravenclaw
- Hufflepuff

Firebase calismazsa:
- Local fallback devreye girer.
- Demo akisi bozulmaz.

## 9. Map / Village Sistemi

Map sistemi Reşat alanidir.

Mevcut davranis:
- Oyuncu village canvas ekraninda hareket eder.
- Collision sistemi vardir.
- Dusman AI / encounter noktalarindan battle tetiklenir.
- Trap ve obje etkileri bulunur.

Dokunma kurali:
- `maps.js`
- `dungeon_generator.js`
- tile generation / map data

Bu alanlara Semih/Reşat onayi olmadan patch girilmez.

## 10. Economy ve Inventory

Oyuncu battle kazaninca:
- Wallet kazanir.
- Loot item alabilir.
- Project monster XP/stat ilerlemesi kaydedilir.

Market:
- Ana menude `Market` ekranindan item satin alinabilir.
- Itemlar oyun ici wallet ile alinir.

Inventory:
- Sahip olunan itemlar ve bufflar gosterilir.

## 11. Ana Menu ve Ekranlar

Ana menu:
- Log in
- New Run
- Market
- Leaderboard
- Settings
- Logout

Ekranlar:
- Main menu
- Leaderboard
- Settings
- Market
- Village
- Monster select / encounter preview
- Battle
- Result
- Inventory modal

## 12. Auth ve Database

Auth:
- 42 OAuth browser redirect ile baslar.
- OAuth code Netlify Function `/api/auth` endpointine gider.
- Function token exchange yapar.
- Frontend'e sadece guvenli profile JSON doner.

Profile JSON hedef alanlari:
- `id`
- `login`
- `displayName`
- `coalition`
- `coalitionColor`
- `avatarUrl`
- `passedProjects`
- `passedProjectSlugs`
- `cursusLevel`

Database:
- Firebase RTDB URL: `https://project-monsters-42-default-rtdb.europe-west1.firebasedatabase.app/`
- Run path: `/runs`
- Player profile path: `/players/{id}`

## 13. Demo Akisi

1. Site acilir.
2. 42 ile login olunur.
3. Profile satirinda coalition, milestone ve passed count gosterilir.
4. New Run ile village'a girilir.
5. Haritada dusmanla encounter tetiklenir.
6. Proje canavari secilir.
7. Battle kazanilir.
8. Result ekraninda skor gorulur.
9. Leaderboard'da coalition puani artar.

Demo kontrol:
- M0 tamamlayan oyuncu M1 gormeli.
- M1 tamamlayan oyuncu M2 gormeli.
- Leaderboard skoru 0 kalmamali.
- Enemy coalition puan dusurmemeli.

## 14. Kapsam Disi

Bu build'de yok:
- Gercek PvP
- Rakip coalition'dan puan dusme
- Capture/evolution sistemi
- Quiz tabanli combat
- Multiplayer matchmaking
- Yeni framework

## 15. Bilinen Riskler

- Netlify deploy gecikirse canli site eski JS/proxy kodunu servis edebilir.
- Browser localStorage eski profile datasini tutarsa logout + hard refresh gerekebilir.
- 42 API project endpointleri bos donerse fallback M0'a dusebilir.
- Firebase rule sorunu olursa write basarisiz olur, local demo yine akar.

## 16. Sonraki Isler

Yuksek oncelik:
- Auth response debug paneli veya console'da `passedProjectSlugs` kisaltmasi.
- Milestone test kullanicilari: M0, M1, M2.
- Firebase write smoke.
- Leaderboard eski hatali run kayitlarini temizleme.

Orta oncelik:
- `enemyCoalition` adini `enemyFaction` veya `aiCoalition` yapmak.
- README'yi Netlify/Firebase guncel durumuna gore yenilemek.
- package metadata'yi yeni repo adina cekmek.

Post-jam:
- PvP tasarimi.
- Daha fazla map objective.
- More project monsters.
- Ses ve animation polish.
