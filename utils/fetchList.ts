import { db } from "../database/opendb";

export async function fetchList(id) {
  const fetchedList = await db.getFirstAsync(
    "SELECT title FROM RankedLists WHERE id = ?",
    [id]
  );
  return fetchedList;
}
