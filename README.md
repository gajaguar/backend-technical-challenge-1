# express-template ![version](https://img.shields.io/github/v/tag/gajaguar/express-api-template?label=version) ![license](https://img.shields.io/github/license/gajaguar/express-api-template)

A basic template for an API built in with Express and typescript.

> by: [G.A.JAGUAR](https://github.com/gajaguar)

## Build Setup

### Docker

#### Fast setup (only linux os)

```bash
# build docker container and install dependencies.
sh install.sh
```

#### Manual

```bash
# create a docker image
docker-compose build
```

```bash
# install dependencies
docker-compose run --rm server yarn
```

```bash
# serve with hot reload, by default at 127.0.0.1:3000
docker-compose up
```

```bash
# build for production and launch server
docker-compose run --rm server yarn build
docker-compose run --rm server yarn start
```

### Local

```bash
# install dependencies
# pnpm (recommended to save disk space)
pnpm i
# or with yarn
yarn
# or native
npm install
```

```bash
# serve with hot reload, by default at 127.0.0.1:3000
pnpm dev
```

```bash
# build for production and launch server
pnpm build
pnpm start
```
