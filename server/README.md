# auth-proxy local

Local 42 OAuth proxy. CLIENT_SECRET kök "env" dosyasından okunur, kod içinde tutulmaz, repo'ya commit edilmez (.gitignore satır 4).

## Run

```
node server/auth-proxy.mjs
```

Beklenen çıktı:

```
auth-proxy: loaded env from <path>/env
auth proxy listening on http://localhost:3001
allowed origin: http://localhost:3000
redirect_uri:   http://localhost:3000/
```

## Smoke

```
curl "http://localhost:3001/?code=dummy&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F"
```

→ 401 `auth_failed` / `token 401` (beklenen; sahte kod)

## token 401 / invalid_client

- `env` içindeki `CLIENT_ID` = `config.js` → `authClientId`
- `REDIRECT_URI` = `config.js` → `authRedirectUri` (sonunda `/` olmalı)
- `CLIENT_SECRET` 42 intra uygulama ayarındaki secret ile birebir aynı olmalı
- OAuth `code` tek kullanımlık: callback hata verirse URL’deki `?code=` ile sayfayı yenileme — **Log in** ile yeni akış başlat
