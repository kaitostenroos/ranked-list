import { updateListItem } from "@/utils/updateListItem";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Appbar, Button, Surface, TextInput } from "react-native-paper";

export default function EditListItem() {
  const router = useRouter();
  const { id, listId, listItemTitle, listItemDesc, listItemRank } = useLocalSearchParams();
  const [title, setTitle] = useState(listItemTitle);
  const [description, setDescription] = useState(listItemDesc);
  const [rank, setRank] = useState(listItemRank);

  const handleSave = async () => {
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
      await updateListItem(id, listId, title, description, rank);
      router.back();
    } catch (error) {
      console.error("Failed to add list item", error);
      alert("Failed edit item. Please try again.");
    }
  };

  return (
    <Surface style={styles.inputContainer}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Edit Entry" />
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
      <Button mode="contained" onPress={handleSave} style={styles.button}>
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