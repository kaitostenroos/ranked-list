import { db } from "@/database/opendb";

interface List {
  id: string;
  title: string;
  description?: string;
  bannersrc?: string;
  created?: string;
  updated?: string;
}

export async function updateLists(): Promise<List[]> {
  try {
    const lists = await db.getAllAsync("SELECT * from RankedLists"); 
    return(lists as List[] ?? []);
  } catch (error) {
    console.error("Could not get items", error);
    return [];
  }

}
