import { db } from "@/database/opendb";

export async function fetchListItem({id, listId}) {
  const fetchedListItem = await db.getFirstAsync(
    `SELECT * from list_${listId}_items WHERE id = ?` , [id]
  )

  return fetchedListItem;
}
