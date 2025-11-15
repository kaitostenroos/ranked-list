import * as SQLite from "expo-sqlite";

export function deleteList(id) {
    const db = SQLite.openDatabaseSync("listdb");

    const deleteList = async () => {
        await db.execAsync(`
            DELETE FROM RankedLists WHERE id = ${id};
        `)
    }

    deleteList();
}