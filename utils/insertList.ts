import { db } from "@/database/opendb";

export async function insertList(title: string, image: string, description: string, created: string, updated: string) {
  try {
        await db.runAsync(
          "INSERT INTO RankedLists (title, bannersrc, description, created, updated) VALUES (?, ?, ?, ?, ?)",
          [title, image, description, created, updated]
        );
        alert("List added successfully");
      } catch (error) {
        console.error("Could not add list", error);
        alert("Failed to add list");
      }
}