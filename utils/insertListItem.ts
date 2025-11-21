import { db } from "@/database/opendb";

export async function insertListItem(listId, title, description, rank) {
  try {
    await db.runAsync(
      `INSERT INTO list_${listId}_items (itemTitle, itemDescription, rank) VALUES (?, ? ,?)`,
    [title, description, rank]
  );
  } catch (error) {
    console.error("Failed to insert list item", error)
  }
}