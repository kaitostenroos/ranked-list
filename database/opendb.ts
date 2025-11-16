import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("listdb", {useNewConnection: true});

export const initializeDatabase = async ( ) => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS RankedLists (id INTEGER PRIMARY KEY, title TEXT NOT NULL, bannersrc TEXT, description TEXT, created TEXT NOT NULL, updated TEXT NOT NULL );
    `);
  } catch (error) {
    console.error("Could not initialize database", error);
  }
};