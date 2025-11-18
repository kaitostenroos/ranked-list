import { db } from "../database/opendb";

export async function updateList(id) {
  const updatedList = await db.getFirstAsync(
    "SELECT title FROM RankedLists WHERE id = ?",
    [id]
  );
  return updatedList;
}
