import { insertListItem } from "@/utils/insertListItem";
import { useLocalSearchParams, useRouter } from "expo-router"; // Changed to useRouter
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Appbar, Button, Surface, TextInput } from "react-native-paper";

export default function AddListItem() {
  const router = useRouter();
  const { listId } = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rank, setRank] = useState("");

  const handleAdd = async () => {
    if (!listId) {
      console.error("listId is undefined; cannot add item");
      alert("Invalid list ID. Please try again.");
      return;
    }
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    if (!rank.trim()) {
      alert("Rank is required");
      return;
    }
    try {
      // Removed date if not needed; add back if insertListItem requires it
      await insertListItem(listId, title, description, rank);
      router.back(); // Changed to router.back()
    } catch (error) {
      console.error("Failed to add list item", error);
      alert("Failed to add item. Please try again.");
    }
  };

  return (
    <Surface style={styles.inputContainer}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Add New List Item" />
      </Appbar.Header>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput label="Rank" value={rank} onChangeText={setRank} style={styles.input} />
      <Button mode="contained" onPress={handleAdd} style={styles.button}>
        Add Item
      </Button>
    </Surface>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
  },
  input: {
    margin: 16,
  },
  button: {
    marginTop: 20,
    marginHorizontal: 16,
  },
});
