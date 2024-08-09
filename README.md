<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).


---

# Base de datos

## Levantar base de datos PostgreSQL con docker

1. **Dependencias**: Tener instalado docker y docker-compose.

2. **Variables de entorno**: 
   - Crear un fichero `.env` donde se defina la variable `POSTGRES_PASSWORD`, que será la contraseña de la base de datos.
   - La variable `POSTGRES_PORT` es el puerto de la base de datos. Por defecto es `5432`.
   - La variable `ADMINER_PORT` es el puerto del administrador de base de datos. Por defecto es `8080`.
   - Hay un ejemplo en el `.env.template`.

3. **Comando para levantar la base de datos**: `docker-compose up -d`
   - Ahora puedes conectarte a la base de datos desde tu propio administrador o usar el que he puesto en el docker-compose, `adminer`. Para entrar en él debes escribir `http://localhost:8080` (o el puerto que hayas especificado en el `.env` que por defecto es `8080`).
   - Cuando abras el enlace, para conectarte a la base de datos deberás llenar los datos de la siguiente manera:
  
  |                        |            |
  | ---------------------- | ---------- |
  | Motor de base de datos | PostgreSQL |
  | Servidor               | db         |
  | Usuario                | postgres   |
  | Contraseña             | password   | *o la que hayas especificado en el `.env`* |
  | Base de datos          |            |

4. **Poblar la base de datos**: Para crear y poblar la base de datos se puede copiar los `SQL` de [crear base de datos](#crear-base-de-datos) y [poblar la base de datos](#poblar-con-datos-fake-para-pruebas).
   
5. **Comando para detener la base de datos**: `docker-compose down -v`

## Entidades

### Users

| Field                               | Type            | Required | Key | Default           | Extra       |
| ----------------------------------- | --------------- | -------- | --- | ----------------- | ----------- |
| id                                  | UUID            | YES      | PRI |                   |             |
| email                               | VARCHAR(255)    | YES      |     |                   | UNIQUE      |
| name                                | VARCHAR(60)     | YES      |     |                   |             |
| password                            | VARCHAR(255)    | YES      |     |                   |             |
| avatar                              | VARCHAR(255)    | NO       |     | NULL              |             |
| createdAt                           | TIMESTAMPTZ     | NO       |     | CURRENT_TIMESTAMP |             |
| updatedAt                           | TIMESTAMPTZ     | NO       |     | CURRENT_TIMESTAMP |             |
| isDeleted                           | BOOLEAN         | NO       |     | false             |             |
| ==<span id="item1">roles¿?</span>== | VARCHAR(20)[]¿? | NO¿?     | ¿?  | ['READER_ID']¿?   | Role's id¿? |

Aquí me surgió una duda sobre roles. ¿[Consideras que es mejor usar los roles de usuario como un arrar en la tabla de usuario](#item1) o [crear una nueva tabla de roles-usuario que relacione los roles con los usuarios](#userroles)?

### Roles

| id  | role   | description             |
| --- | ------ | ----------------------- |
| 1   | ADMIN  | crear y editar usuarios |
| 2   | EDITOR | crear y editar posts    |
| 3   | READER | Leer y comentar         |

### UserRoles

| Field     | Type    | Required | Key | Default | Extra     |
| --------- | ------- | -------- | --- | ------- | --------- |
| userId    | UUID    | YES      | PRI |         | User's id |
| roleId    | INTEGER | YES      | YES | PRI     | Role's id |
| isDeleted | BOOLEAN | NO       |     | false   |           |


### Posts

| Field       | Type         | Required | Key     | Default           | Extra     |
| ----------- | ------------ | -------- | ------- | ----------------- | --------- |
| id          | UUID         | YES      | PRI     |                   |           |
| userId      | UUID         | YES      | FOREIGN |                   | User's id |
| title       | VARCHAR(255) | YES      |         |                   |           |
| content     | TEXT         | YES      |         |                   |           |
| description | TEXT         | NO       |         | NULL              |           |
| image       | VARCHAR(255) | NO       |         | NULL              |           |
| views       | INTEGER      | NO       |         | 0                 |           |
| likes       | INTEGER      | NO       |         | 0                 |           |
| slug        | VARCHAR(255) | NO       |         | *from title       | UNIQUE    |
| createdAt   | TIMESTAMPTZ  | NO       |         | CURRENT_TIMESTAMP |           |
| updatedAt   | TIMESTAMPTZ  | NO       |         | CURRENT_TIMESTAMP |           |
| isDeleted   | BOOLEAN      | NO       |         | false             |           |

### Comments

| Field     | Type        | Required | Key     | Default           | Extra     |
| --------- | ----------- | -------- | ------- | ----------------- | --------- |
| id        | UUID        | YES      | PRI     |                   |           |
| userId    | UUID        | YES      | FOREIGN |                   | User's id |
| postId    | UUID        | YES      | FOREIGN |                   | Post's id |
| content   | TEXT        | YES      |         |                   |           |
| createdAt | TIMESTAMPTZ | NO       |         | CURRENT_TIMESTAMP |           |
| updatedAt | TIMESTAMPTZ | NO       |         | CURRENT_TIMESTAMP |           |
| isDeleted | BOOLEAN     | NO       |         | false             |           |

## Crear base de datos

```sql

-- Crear la base de datos
CREATE DATABASE blog_app;

```

### Crear las tablas

```sql

-- Para que funcione la función gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- Tabla Users
CREATE TABLE Users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(60) NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    isDeleted BOOLEAN DEFAULT false
);

-- Tabla Roles
CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,
    role VARCHAR(20) NOT NULL UNIQUE,
    description TEXT
);

-- Insertar roles
INSERT INTO Roles (role, description) VALUES 
    ('ADMIN', 'crear y editar usuarios'),
    ('EDITOR', 'crear y editar posts'),
    ('READER', 'Leer y comentar ');

-- Tabla UserRoles
CREATE TABLE UserRoles (
    userId UUID REFERENCES Users(id) ON DELETE CASCADE,
    roleId INTEGER REFERENCES Roles(id) ON DELETE CASCADE,
    isDeleted BOOLEAN DEFAULT false,
    PRIMARY KEY (userId, roleId)
);

-- Tabla Posts
CREATE TABLE Posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userId UUID REFERENCES Users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    description TEXT,
    image VARCHAR(255),
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    slug VARCHAR(255) UNIQUE,
    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    isDeleted BOOLEAN DEFAULT false
);

-- Tabla Comments
CREATE TABLE Comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userId UUID REFERENCES Users(id) ON DELETE CASCADE,
    postId UUID REFERENCES Posts(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    isDeleted BOOLEAN DEFAULT false
);

```
### Poblar con datos fake para pruebas

```sql

-- Insertar datos en Users
INSERT INTO Users (email, name, password, avatar) VALUES
    ('alice@example.com', 'Alice Johnson', 'password123', 'https://example.com/avatar/alice.jpg'),
    ('bob@example.com', 'Bob Smith', 'password123', 'https://example.com/avatar/bob.jpg'),
    ('carol@example.com', 'Carol White', 'password123', 'https://example.com/avatar/carol.jpg'),
    ('dave@example.com', 'Dave Clark', 'password123', 'https://example.com/avatar/dave.jpg'),
    ('eve@example.com', 'Eve Johnson', 'password123', 'https://example.com/avatar/eve.jpg'),
    ('fred@example.com', 'Fred Smith', 'password123', 'https://example.com/avatar/fred.jpg'),
    ('george@example.com', 'George White', 'password123', 'https://example.com/avatar/george.jpg'),
    ('harry@example.com', 'Harry Clark', 'password123', 'https://example.com/avatar/harry.jpg'),
    ('isabel@example.com', 'Isabel White', 'password123', 'https://example.com/avatar/isabel.jpg'),
    ('james@example.com', 'James Johnson', 'password123', 'https://example.com/avatar/james.jpg');

-- Insertar datos en UserRoles
INSERT INTO UserRoles (userId, roleId) VALUES
    ((SELECT id FROM Users WHERE email = 'alice@example.com'), (SELECT id FROM Roles WHERE role = 'ADMIN')),
    ((SELECT id FROM Users WHERE email = 'bob@example.com'), (SELECT id FROM Roles WHERE role = 'EDITOR')),
    ((SELECT id FROM Users WHERE email = 'carol@example.com'), (SELECT id FROM Roles WHERE role = 'READER')),
    ((SELECT id FROM Users WHERE email = 'dave@example.com'), (SELECT id FROM Roles WHERE role = 'EDITOR')),
    ((SELECT id FROM Users WHERE email = 'eve@example.com'), (SELECT id FROM Roles WHERE role = 'READER')),
    ((SELECT id FROM Users WHERE email = 'fred@example.com'), (SELECT id FROM Roles WHERE role = 'EDITOR')),
    ((SELECT id FROM Users WHERE email = 'george@example.com'), (SELECT id FROM Roles WHERE role = 'EDITOR')),
    ((SELECT id FROM Users WHERE email = 'harry@example.com'), (SELECT id FROM Roles WHERE role = 'READER')),
    ((SELECT id FROM Users WHERE email = 'isabel@example.com'), (SELECT id FROM Roles WHERE role = 'READER')),
    ((SELECT id FROM Users WHERE email = 'james@example.com'), (SELECT id FROM Roles WHERE role = 'READER'));

-- Insertar datos en Posts
INSERT INTO Posts (userId, title, content, description, image, slug) VALUES
    ((SELECT id FROM Users WHERE email = 'alice@example.com'), 'First Post', 'This is the content of the first post.', 'This is a description for the first post.', 'https://example.com/images/post1.jpg', 'first-post'),
    ((SELECT id FROM Users WHERE email = 'bob@example.com'), 'Second Post', 'Content for the second post goes here.', 'Description for the second post.', 'https://example.com/images/post2.jpg', 'second-post'),
    ((SELECT id FROM Users WHERE email = 'dave@example.com'), 'Fourth Post', 'Fourth post content goes here.', 'Fourth post description.', 'https://example.com/images/post4.jpg', 'fourth-post'),
    ((SELECT id FROM Users WHERE email = 'fred@example.com'), 'Sixth Post', 'Sixth post content goes here.', 'Sixth post description.', 'https://example.com/images/post6.jpg', 'sixth-post'),
    ((SELECT id FROM Users WHERE email = 'george@example.com'), 'Seventh Post', 'Seventh post content goes here.', 'Seventh post description.', 'https://example.com/images/post7.jpg', 'seventh-post');

-- Insertar datos en Comments
INSERT INTO Comments (userId, postId, content) VALUES
    ((SELECT id FROM Users WHERE email = 'carol@example.com'), (SELECT id FROM Posts WHERE slug = 'first-post'), 'Great post! Really enjoyed reading it.'),
    ((SELECT id FROM Users WHERE email = 'alice@example.com'), (SELECT id FROM Posts WHERE slug = 'second-post'), 'Thank you for sharing this post.'),
    ((SELECT id FROM Users WHERE email = 'bob@example.com'), (SELECT id FROM Posts WHERE slug = 'fourth-post'), 'I really enjoyed reading this post.'),
    ((SELECT id FROM Users WHERE email = 'dave@example.com'), (SELECT id FROM Posts WHERE slug = 'sixth-post'), 'I really enjoyed reading this post.'),
    ((SELECT id FROM Users WHERE email = 'eve@example.com'), (SELECT id FROM Posts WHERE slug = 'seventh-post'), 'I really enjoyed reading this post.'),
    ((SELECT id FROM Users WHERE email = 'fred@example.com'), (SELECT id FROM Posts WHERE slug = 'seventh-post'), 'I really enjoyed reading this post.'),
    ((SELECT id FROM Users WHERE email = 'george@example.com'), (SELECT id FROM Posts WHERE slug = 'seventh-post'), 'I really enjoyed reading this post.'),
    ((SELECT id FROM Users WHERE email = 'harry@example.com'), (SELECT id FROM Posts WHERE slug = 'first-post'), 'I really enjoyed reading this post.'),
    ((SELECT id FROM Users WHERE email = 'isabel@example.com'), (SELECT id FROM Posts WHERE slug = 'first-post'), 'I really enjoyed reading this post.'),
    ((SELECT id FROM Users WHERE email = 'james@example.com'), (SELECT id FROM Posts WHERE slug = 'first-post'), 'I really enjoyed reading this post.');
```
