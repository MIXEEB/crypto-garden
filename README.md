# Welcome to Crypto Garden

### prerequsites:
- install Node.js: https://nodejs.org/en/
- install Ganache: https://trufflesuite.com/ganache/
- run Ganache and create new workspace with default settings

### running web app:
open your favorite command-line shell

```
cd [crypto-garden location]
npm install
cd .\smart-contracts\
node .\app.init.js
```
copy key-value pairs from output and update file .\web-client\src\environments\environment.ts
```
cd ..\web-client
npm install
npm i -g @angular\cli
ng serve
```
open application on http://localhost:4200
