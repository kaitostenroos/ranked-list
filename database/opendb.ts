import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("listdb", {useNewConnection: true});

export const createTableForLists = async () => {
  try {
    //Run npx expo start --clear when restarting the app with locked db
    //Uncomment line below if database locks itself or something bad happens
    //db.closeAsync()
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS RankedLists (id INTEGER PRIMARY KEY, title TEXT NOT NULL, bannersrc TEXT, description TEXT, created TEXT NOT NULL, updated TEXT NOT NULL );
    `);
  } catch (error) {
    console.error("Could not create a table for lists", error);
  }
};

export const createTableForListItems = async (id) => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS list_${id}_items (id INTEGER PRIMARY KEY, itemTitle TEXT NOT NULL, itemDescription TEXT, rank TEXT NOT NULL);
    `)
  } catch (error) {
    console.error("Could not create a table for listitems for list: " + id, error)
  }
}