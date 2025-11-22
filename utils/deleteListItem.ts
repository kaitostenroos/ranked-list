import { db } from "@/database/opendb";

export async function deleteListItem(id, listId) {
  await db.withExclusiveTransactionAsync(async (tx) => {
    await tx.runAsync(
      `DELETE FROM list_${listId}_items WHERE id = ?;`,
      id
    );
  });
}