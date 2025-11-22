import { db } from "@/database/opendb";

export async function updateListItem(id, listId, title, description, rank) {
  await db.runAsync(
    `UPDATE list_${listId}_items SET itemTitle = ?, itemDescription = ?, rank = ? WHERE id = ?`,
    [id, title, description, rank]
  );
}