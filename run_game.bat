@echo off
cd /d "%~dp0"
title 42 Project Monsters

echo.
echo  [1/2] Auth proxy  - http://localhost:3001
start "Auth proxy :3001" cmd /k "cd /d "%~dp0" && node server/auth-proxy.mjs"

timeout /t 2 /nobreak >nul

echo  [2/2] Oyun        - http://localhost:3000
start "Game :3000" cmd /k "cd /d "%~dp0" && node dev-server.mjs 3000"

timeout /t 2 /nobreak >nul
start "" http://localhost:3000/

echo.
echo  Hazir. Kapatmak icin iki terminal penceresini kapat.
echo.
pause
