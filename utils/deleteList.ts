import { db } from "../database/opendb";

export async function deleteList(id: number) {
  const listId = Number(id);
  await db.execAsync("BEGIN IMMEDIATE;");
  try {
    await db.execAsync(`DROP TABLE IF EXISTS list_${listId}_items;`);
    await db.runAsync("DELETE FROM RankedLists WHERE id = ?", [listId]);
    await db.execAsync("COMMIT;");
  } catch (error) {
    await db.execAsync("ROLLBACK;");
    throw error;
  }
}
