# GreenHomeLan_RpiLocalServer
Local web server to manage orchestrator

This template should help get you started developing with Vue 3 in Vite.

# TODO: Refactor README file

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Install web server in orchestrator
From development pc

```sh
scp -r dist/* pi@192.168.144.68:workspace/build
```

from orchestrator
```sh
cd workspace/build
sudo cp -r build /var/www/html/
```

## Install and setup nginx reverse proxy

Install nginx
```sh
sudo apt install nginx
```

### Add configuration
from orchestrator
```sh
sudo rm /etc/nginx/sites-available/default
```

from development pc
```sh
scp nginx.conf pi@192.168.144.68:/etc/nginx/sites-available/default
```

reload nginx service
```sh
sudo systemctl reload nginx
```

### Dockerize vue application

```sh
cd web_app
docker build -t energy-information-platform .
```
