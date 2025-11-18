import { db } from "@/database/opendb";

export async function fetchListItems(id) {
  const listItems =  await db.getAllAsync(`
    SELECT * FROM list_${id}_items
  `);
  return listItems;
}
