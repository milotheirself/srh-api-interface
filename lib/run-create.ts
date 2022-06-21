import { default as database } from './worker/database.ts';

import 'https://deno.land/x/dotenv@v3.2.0/load.ts';

database.connectedCallback({
  hostname: Deno.env.get('XAMPP_SDK_HOST'),
  username: Deno.env.get('XAMPP_SDK_USER'),
  password: Deno.env.get('XAMPP_SDK_PASS'),
});

database.whenConnected().then(async () => {
  const db = {
    name: 'srh_sql_interface',
    data: {
      groups: 'd_groups',
      member: 'd_member',
      figure: 'd_figure',
    },
    link: {
      groups_member: 'l_groups_member',
      groups_avatar: 'l_groups_avatar',
      member_avatar: 'l_member_avatar',
      member_banner: 'l_member_banner',
    },
  };

  await database.execute(`DROP DATABASE IF EXISTS ${db.name};`);
  await database.execute(`
    CREATE DATABASE ${db.name}
      CHARACTER SET  utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);

  // ? groups
  await database.execute(`
    CREATE TABLE ${db.name}.${db.data.groups} (
      id          BIGINT            NOT NULL,
      name        VARCHAR(128)      NOT NULL,
      caption     VARCHAR(512)      ,
      
      PRIMARY KEY(id)
    );
  `);

  // ? member
  await database.execute(`
    CREATE TABLE ${db.name}.${db.data.member} (
      id          BIGINT            NOT NULL,
      username    VARCHAR(128)      NOT NULL,
      caption     VARCHAR(512)      ,
      joined_at   DATE              NOT NULL,
      system      BOOLEAN           ,
      
      PRIMARY KEY(id)
    );
  `);

  // ? figure
  await database.execute(`
    CREATE TABLE ${db.name}.${db.data.figure} (
      hash        VARCHAR(32)       NOT NULL,
      size        INT               NOT NULL,
      data        LONGBLOB          NOT NULL,

      PRIMARY KEY(hash, size)
    );
  `);

  // ? linking groups <-> member
  await database.execute(`
    CREATE TABLE ${db.name}.${db.link.groups_member} (
      groups      BIGINT            NOT NULL,
      member      BIGINT            NOT NULL,

      FOREIGN KEY(groups) references ${db.name}.${db.data.groups}(id),
      FOREIGN KEY(member) references ${db.name}.${db.data.member}(id)
    );
  `);

  // ? linking groups <-> avatar
  await database.execute(`
    CREATE TABLE ${db.name}.${db.link.groups_avatar} (
      groups      BIGINT            NOT NULL,
      figure      VARCHAR(32)       NOT NULL,

      FOREIGN KEY(groups) references ${db.name}.${db.data.groups}(id),
      FOREIGN KEY(figure) references ${db.name}.${db.data.figure}(hash)
    );
  `);

  // ? linking member <-> avatar
  await database.execute(`
    CREATE TABLE ${db.name}.${db.link.member_avatar} (
      member      BIGINT            NOT NULL,
      figure      VARCHAR(32)       NOT NULL,

      FOREIGN KEY(member) references ${db.name}.${db.data.member}(id),
      FOREIGN KEY(figure) references ${db.name}.${db.data.figure}(hash)
    );
  `);

  // ? linking member <-> banner
  await database.execute(`
    CREATE TABLE ${db.name}.${db.link.member_banner} (
      member      BIGINT            NOT NULL,
      figure      VARCHAR(32)       NOT NULL,

      FOREIGN KEY(member) references ${db.name}.${db.data.member}(id),
      FOREIGN KEY(figure) references ${db.name}.${db.data.figure}(hash)
    );
  `);

  // ---
  // + append default values
  await database.execute(`
    INSERT INTO ${db.name}.${db.data.member}
      (id,                    joined_at,    username, caption, system) values
      ('298726187285348353',  now(),        'Alice',  NULL,    false ),
      ('298726222848851970',  '2022-01-01', 'Glados', NULL,    true  ),
      ('298726151784759296',  now(),        'Nelly',  NULL,    false );
  `);

  await database.execute(`
    INSERT INTO ${db.name}.${db.data.groups}
      (id,                    name       ) values
      ('298726187284621235',  'Gruppe 01'),
      ('298726222848651285',  'Gruppe 02');
  `);

  await database.execute(`
    INSERT INTO ${db.name}.${db.data.figure}
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
    INSERT INTO ${db.name}.${db.link.groups_member}
      (groups,                 member             ) values
      ('298726187284621235',  '298726222848851970'),
      ('298726187284621235',  '298726187285348353'),
      ('298726222848651285',  '298726187285348353');
  `);

  await database.execute(`
    INSERT INTO ${db.name}.${db.link.groups_avatar}
      (groups,                figure                            ) values
      ('298726187284621235',  '64d890648f7b31e8841c4441e5d8625c'),
      ('298726222848651285',  '64d890648f7b31e8841c4441e5d8625c');
  `);

  await database.execute(`
    INSERT INTO ${db.name}.${db.link.member_avatar}
      (member,                figure                            ) values
      ('298726151784759296',  '64d890648f7b31e8841c4441e5d8625c'),
      ('298726187285348353',  '31e5e4f2ed037db75390982312c3af9f'),
      ('298726222848851970',  '70cb8c5e6af3fa1b933fe1c3ff7d41a3');
  `);

  await database.execute(`
    INSERT INTO ${db.name}.${db.link.member_banner}
      (member,                figure                            ) values
      ('298726187285348353',  '46e6b522cbf351c41de1ed1fae9ba3a2'),
      ('298726222848851970',  '1a9ffd58f73deb082c59b6062a607b7e');
  `);
  // ---

  database.disconnectedCallback();
});
