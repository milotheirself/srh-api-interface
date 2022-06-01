import { default as database } from './services/database.ts';

import 'https://deno.land/x/dotenv@v3.2.0/load.ts';

database.connectedCallback({
  hostname: Deno.env.get('DB_HOST'),
  username: Deno.env.get('DB_SDK_USER'),
  password: Deno.env.get('DB_SDK_PASS'),
});

database.whenConnected().then(async () => {
  const db = {
    name: 'dauerprojekt_datenbanken',
    data: {
      groups: 'd_groups',
      people: 'd_people',
      file: 'd_file',
    },
    link: {
      groups_people: 'l_groups_people',
      groups_avatar: 'l_groups_avatar',
      people_avatar: 'l_people_avatar',
      people_banner: 'l_people_banner',
    },
  };

  // + create blank database
  await database.execute(`DROP DATABASE IF EXISTS ${db.name};`);
  await database.execute(`
    CREATE DATABASE ${db.name}
           CHARACTER SET  utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);

  // + create required tables
  await database.execute(`
    CREATE TABLE ${db.name}.${db.data.groups} (
      id          BIGINT            NOT NULL,
      name        VARCHAR(32)       NOT NULL,
      
      PRIMARY KEY(id)
    );
  `);

  // + create required tables
  await database.execute(`
    CREATE TABLE ${db.name}.${db.data.people} (
      id          BIGINT            NOT NULL,
      joined_at   DATE              NOT NULL,
      name        VARCHAR(32)       NOT NULL,
      system      BOOLEAN           NOT NULL,
      
      PRIMARY KEY(id)
    );
  `);

  await database.execute(`
    CREATE TABLE ${db.name}.${db.data.file} (
      hash        VARCHAR(32)       NOT NULL,
      size        INT               NOT NULL,
      -- data        VARBINARY(256)    NOT NULL,
      data        VARCHAR(1024)     NOT NULL,

      PRIMARY KEY(hash, size)
    );
  `);

  await database.execute(`
    CREATE TABLE ${db.name}.${db.link.groups_people} (
      task        BIGINT            NOT NULL,
      user        BIGINT            NOT NULL,

      FOREIGN KEY(task) references ${db.name}.${db.data.groups}(id),
      FOREIGN KEY(user) references ${db.name}.${db.data.people}(id)
    );
  `);

  await database.execute(`
    CREATE TABLE ${db.name}.${db.link.groups_avatar} (
      task        BIGINT            NOT NULL,
      file        VARCHAR(32)       NOT NULL,

      FOREIGN KEY(task) references ${db.name}.${db.data.groups}(id),
      FOREIGN KEY(file) references ${db.name}.${db.data.file}(hash)
    );
  `);

  await database.execute(`
    CREATE TABLE ${db.name}.${db.link.people_avatar} (
      user        BIGINT            NOT NULL,
      file        VARCHAR(32)       NOT NULL,

      FOREIGN KEY(user) references ${db.name}.${db.data.people}(id),
      FOREIGN KEY(file) references ${db.name}.${db.data.file}(hash)
    );
  `);

  await database.execute(`
    CREATE TABLE ${db.name}.${db.link.people_banner} (
      user        BIGINT            NOT NULL,
      file        VARCHAR(32)       NOT NULL,

      FOREIGN KEY(user) references ${db.name}.${db.data.people}(id),
      FOREIGN KEY(file) references ${db.name}.${db.data.file}(hash)
    );
  `);

  // + append default values
  await database.execute(`
    INSERT INTO ${db.name}.${db.data.people}
      (id,                    joined_at,  name,      system) values
      ('298726187285348353',  now(),      'Alice',   false ),
      ('298726222848851970',  now(),      'Glados',  true  ),
      ('298726151784759296',  now(),      'Nelly',   false );
  `);

  await database.execute(`
    INSERT INTO ${db.name}.${db.data.people}
      (id,                    name   ) values
      ('298726187284621235',  'Gruppe 01'),
      ('298726222848651285',  'Gruppe 02');
  `);

  await database.execute(`
    INSERT INTO ${db.name}.${db.data.file}
      (hash,                                size,   data ) values
      ('64d890648f7b31e8841c4441e5d8625c',  '512',  '...'),
      ('64d890648f7b31e8841c4441e5d8625c',  '256',  '...'),
      ('64d890648f7b31e8841c4441e5d8625c',  '128',  '...'),
      
      ('31e5e4f2ed037db75390982312c3af9f',  '512',  '...'),
      ('31e5e4f2ed037db75390982312c3af9f',  '256',  '...'),
      ('31e5e4f2ed037db75390982312c3af9f',  '128',  '...'),
      
      ('70cb8c5e6af3fa1b933fe1c3ff7d41a3',  '512',  '...'),
      ('70cb8c5e6af3fa1b933fe1c3ff7d41a3',  '256',  '...'),
      ('70cb8c5e6af3fa1b933fe1c3ff7d41a3',  '128',  '...'),
      
      ('46e6b522cbf351c41de1ed1fae9ba3a2',  '512',  '...'),
      ('46e6b522cbf351c41de1ed1fae9ba3a2',  '256',  '...'),
      ('46e6b522cbf351c41de1ed1fae9ba3a2',  '128',  '...'),

      ('1a9ffd58f73deb082c59b6062a607b7e',  '512',  '...'),
      ('1a9ffd58f73deb082c59b6062a607b7e',  '256',  '...'),
      ('1a9ffd58f73deb082c59b6062a607b7e',  '128',  '...');
  `);

  await database.execute(`
    INSERT INTO ${db.name}.${db.link.people_avatar}
      (user,                  file                              ) values
      ('298726151784759296',  '64d890648f7b31e8841c4441e5d8625c'),
      ('298726187285348353',  '31e5e4f2ed037db75390982312c3af9f'),
      ('298726222848851970',  '70cb8c5e6af3fa1b933fe1c3ff7d41a3');
  `);

  await database.execute(`
    INSERT INTO ${db.name}.${db.link.people_banner}
      (user,                  file                              ) values
      ('298726187285348353',  '46e6b522cbf351c41de1ed1fae9ba3a2'),
      ('298726222848851970',  '1a9ffd58f73deb082c59b6062a607b7e');
  `);

  database.disconnectedCallback();
});
