import { db } from "@/database/opendb";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Appbar, Button, Surface, TextInput } from "react-native-paper";

export default function EditList() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [bannersrc, setBannersrc] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchList = async () => {
      try {
        const result = await db.getFirstAsync(
          "SELECT * FROM RankedLists WHERE id = ?",
          [id]
        );
        if (result) {
          setTitle(result.title || "");
          setBannersrc(result.bannersrc || "");
          setDescription(result.description || "");
        }
      } catch (error) {
        console.error("Could not fetch list", error);
      }
    };
    fetchList();
  }, [id]);

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    const now = new Date().toISOString().split("T")[0];
    try {
      await db.runAsync(
        "UPDATE RankedLists SET title = ?, bannersrc = ?, description = ?, updated = ? WHERE id = ?",
        [title, bannersrc, description, now, id]
      );
      alert("List updated successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Could not update list", error);
      alert("Failed to update list");
    }
  };

  return (
    <Surface style={styles.inputContainer}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Edit List" />
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
      <TextInput
        label="Banner URL"
        value={bannersrc}
        onChangeText={setBannersrc}
        multiline
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Save
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
  },
});
