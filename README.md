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

| Field     | Type         | Required | Key     | Default           | Extra     |
| --------- | ------------ | -------- | ------- | ----------------- | --------- |
| id        | UUID         | YES      | PRI     |                   |           |
| email     | VARCHAR(255) | YES      |         |                   | UNIQUE    |
| name      | VARCHAR(60)  | YES      |         |                   |           |
| password  | VARCHAR(255) | YES      |         |                   |           |
| avatar    | VARCHAR(255) | NO       |         | NULL              |           |
| createdAt | TIMESTAMPTZ  | NO       |         | CURRENT_TIMESTAMP |           |
| updatedAt | TIMESTAMPTZ  | NO       |         | CURRENT_TIMESTAMP |           |
| isDeleted | BOOLEAN      | NO       |         | false             |           |
| rolId     | INTEGER      | NO       | FOREIGN | 3                 | Role's id |

### Roles

| id  | role   | description                                         |
| --- | ------ | --------------------------------------------------- |
| 1   | ADMIN  | Crear y editar usuarios, más los permisos de EDITOR |
| 2   | EDITOR | Crear y editar posts, más los permisos de READER    |
| 3   | READER | Leer y comentar                                     |

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

-- Tabla Roles
CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,
    role VARCHAR(20) NOT NULL UNIQUE,
    description TEXT
);

-- Insertar roles
INSERT INTO "Roles" ("id", "role", "description") VALUES
    (1,	'ADMIN',	'Crear y editar usuarios, más los permisos de EDITOR'),
    (2,	'EDITOR',	'Crear y editar posts, más los permisos de READER'),
    (3,	'READER',	'Leer y comentar ');

-- Tabla Users
CREATE TABLE Users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(60) NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    isDeleted BOOLEAN DEFAULT false,
    rolId INTEGER NOT NULL DEFAULT 3,
    FOREIGN KEY (rolId) REFERENCES Roles(id)
);

-- Tabla Posts
CREATE TABLE Posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userId UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    description TEXT,
    image VARCHAR(255),
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    slug VARCHAR(255) UNIQUE,
    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    isDeleted BOOLEAN DEFAULT false,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);


-- Tabla Comments
CREATE TABLE Comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userId UUID NOT NULL,
    postId UUID NOT NULL,
    content TEXT NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    isDeleted BOOLEAN DEFAULT false,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (postId) REFERENCES Posts(id) ON DELETE CASCADE
);

CREATE INDEX idx_comments_postId ON Comments(postId);

```
### Poblar con datos fake para pruebas

```sql

-- Insertar datos en la tabla Users
INSERT INTO Users (email, name, password, avatar, createdAt, updatedAt, isDeleted, rolId) VALUES
    ('admin@example.com', 'Admin User', '123456', 'admin_avatar.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false, 1),
    ('editor1@example.com', 'Editor User', '123456', 'editor_avatar1.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false, 2),
    ('editor2@example.com', 'Editor Two', '123456', 'editor_avatar2.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false, 2),
    ('reader1@example.com', 'Reader One', '123456', 'reader_avatar1.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false, 3),
    ('reader2@example.com', 'Reader Two', '123456', 'reader_avatar2.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false, 3),
    ('reader3@example.com', 'Reader Three', '123456', 'reader_avatar3.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false, 3);

-- Insertar datos en la tabla Posts
INSERT INTO Posts (userId, title, content, description, image, views, likes, slug, createdAt, updatedAt, isDeleted) VALUES
    ((SELECT id FROM Users WHERE email = 'editor1@example.com'), 'First Post', 'Content of the first post', 'Description of the first post', 'image1.png', 100, 10, 'first-post', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
    ((SELECT id FROM Users WHERE email = 'editor2@example.com'), 'Second Post', 'Content of the second post', 'Description of the second post', 'image2.png', 150, 20, 'second-post', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
    ((SELECT id FROM Users WHERE email = 'admin@example.com'), 'Admin Post', 'Content created by admin', 'Admin description', 'image_admin.png', 200, 30, 'admin-post', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);

-- Insertar datos en la tabla Comments
INSERT INTO Comments (userId, postId, content, createdAt, updatedAt, isDeleted) VALUES
    ((SELECT id FROM Users WHERE email = 'reader1@example.com'), (SELECT id FROM Posts WHERE slug = 'first-post'), 'Great post!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
    ((SELECT id FROM Users WHERE email = 'reader1@example.com'), (SELECT id FROM Posts WHERE slug = 'second-post'), 'Thanks for sharing.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
    ((SELECT id FROM Users WHERE email = 'reader2@example.com'), (SELECT id FROM Posts WHERE slug = 'first-post'), 'Very informative.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
    ((SELECT id FROM Users WHERE email = 'reader3@example.com'), (SELECT id FROM Posts WHERE slug = 'first-post'), 'I like it.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
    ((SELECT id FROM Users WHERE email = 'admin@example.com'), (SELECT id FROM Posts WHERE slug = 'admin-post'), 'This is an admin comment.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);

```

### Entidades con Prisma

```prisma

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions"]
}

datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")
  extensions = [uuid-ossp]
}

model Roles {
  id          Int     @id @default(autoincrement())
  role        String  @unique @db.VarChar(20)
  description String?
  users       Users[]
}

model Users {
  id        String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  email     String    @unique @db.VarChar(255)
  name      String    @db.VarChar(60)
  password  String    @db.VarChar(255)
  avatar    String?   @db.VarChar(255)
  createdAt DateTime  @default(now()) @db.Timestamptz
  updatedAt DateTime  @default(now()) @db.Timestamptz
  isDeleted Boolean   @default(false)
  rolId     Int       @default(3)
  rol       Roles     @relation(fields: [rolId], references: [id])
  posts     Posts[]
  comments  Comments[]
}

model Posts {
  id          String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId      String    @db.Uuid
  title       String    @db.VarChar(255)
  content     String
  description String?
  image       String?   @db.VarChar(255)
  views       Int       @default(0)
  likes       Int       @default(0)
  slug        String?   @unique @db.VarChar(255)
  createdAt   DateTime  @default(now()) @db.Timestamptz
  updatedAt   DateTime  @default(now()) @db.Timestamptz
  isDeleted   Boolean   @default(false)
  user        Users     @relation(fields: [userId], references: [id], onDelete: Cascade)
  comments    Comments[]
}

model Comments {
  id        String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId    String   @db.Uuid
  postId    String   @db.Uuid
  content   String
  createdAt DateTime @default(now()) @db.Timestamptz
  updatedAt DateTime @default(now()) @db.Timestamptz
  isDeleted Boolean  @default(false)
  user      Users    @relation(fields: [userId], references: [id], onDelete: Cascade)
  post      Posts    @relation(fields: [postId], references: [id], onDelete: Cascade)

  @@index([postId])
}
```