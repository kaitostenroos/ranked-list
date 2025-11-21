import { db } from "../database/opendb";

export async function deleteList(id) {
  await db.execAsync(`
      DROP TABLE IF EXISTS list_${id}_items;
    `);
  await db.execAsync(`
      DELETE FROM RankedLists WHERE id = ${id};
    `);
}
