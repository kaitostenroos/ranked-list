import { db } from "../database/opendb";

export async function updateList(id) {
    const updatedList = await db.getFirstAsync("SELECT * FROM RankedLists WHERE id = ?", [id]);
    return updatedList;
}
