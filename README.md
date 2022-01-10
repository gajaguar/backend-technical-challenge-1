# Backend Technical Challenge #1 ![version](https://img.shields.io/github/v/tag/gajaguar/backend-technical-challenge-1?label=version) ![license](https://img.shields.io/github/license/gajaguar/backend-technical-challenge-1)

> by: [G.A.JAGUAR](https://github.com/gajaguar)

A bookstore inventory management api.

![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![postgresql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)

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

## Database

### Tables

- `user`
  - `id`
  - `name`
  - `email`
  - `password`
- `author`
  - `id`
  - `name`
- `publisher`
  - `id`
  - `name`
- `genre`
  - `id`
  - `name`
- `book`
  - `id`
  - `name`
  - `authorId`
  - `publisherId`
  - `genreId`
  - `year`
  - `isbn`
  - `quantity`

## API

### Enpoints

- `/api/users`
  - POST
    - `/`: create a new user.
  - GET
    - `/`: read all users.
    - `/:id`: read specific user.
  - PATCH
    - `/:id`: update specific user.
  - DELETE
    - `/:id`: delete specific user.

- `/api/authors`
  - POST
    - `/`: create a new author.
  - GET
    - `/`: read all authors.
    - `/:id`: read specific author.
  - PATCH
    - `/:id`: update specific author.
  - DELETE
    - `/:id`: delete specific author.

- `/api/publishers`
  - POST
    - `/`: create a new publisher.
  - GET
    - `/`: read all publishers.
    - `/:id`: read specific publisher.
  - PATCH
    - `/:id`: update specific publisher.
  - DELETE
    - `/:id`: delete specific publisher.

- `/api/genres`
  - POST
    - `/`: create a new genre.
  - GET
    - `/`: read all genres.
    - `/:id`: read specific genre.
  - PATCH
    - `/:id`: update specific genre.
  - DELETE
    - `/:id`: delete specific genre.

- `/api/books`
  - POST
    - `/`: create a new book.
  - GET
    - `/`: read all books.
    - `/:id`: read specific book.
  - PATCH
    - `/:id`: update specific book.
  - DELETE
    - `/:id`: delete specific book.

- `/api/populate`
  - GET
    - `/`: inter mocked data into the database.
