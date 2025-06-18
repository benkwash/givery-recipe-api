import { dbClient } from '.'

export const initDb = () =>
  dbClient.exec(`
    DROP TABLE IF EXISTS recipes;

    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      making_time TEXT NOT NULL,
      serves TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      cost INTEGER NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    -- Trigger to update 'updated_at' on row update
    CREATE TRIGGER IF NOT EXISTS update_recipes_updated_at
    AFTER UPDATE ON recipes
    FOR EACH ROW
    BEGIN
        UPDATE recipes SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
    END;
  `)
// dbClient.exec(`
//   DROP TABLE IF EXISTS recipes;

//   CREATE TABLE IF NOT EXISTS recipes (
//       id integer PRIMARY KEY AUTO_INCREMENT,
//       title varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
//       making_time varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
//       serves varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
//       ingredients varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
//       cost integer NOT NULL,
//       created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
//       updated_at datetime on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
//   );
// `)
