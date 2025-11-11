import { useNavigation } from "expo-router";
import * as SQLite from "expo-sqlite";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Button, PaperProvider, TextInput } from "react-native-paper";

export default function AddList() {
  const db = SQLite.openDatabaseSync("listdb");
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [bannersrc, setBannersrc] = useState("");
  const [description, setDescription] = useState("");

  const addList = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    const now = new Date().toISOString().split('T')[0];
    try {
      await db.runAsync(
        "INSERT INTO RankedLists (title, bannersrc, description, created, updated) VALUES (?, ?, ?, ?, ?)",
        [title, bannersrc, description, now, now]
      );
      alert("List added successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Could not add list", error);
      alert("Failed to add list");
    }
  };

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add New List" />
      </Appbar.Header>
      <View style={styles.inputContainer}>
        <TextInput 
          label="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          label="Desription"
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
        <Button mode="contained" onPress={addList} style={styles.button}>
          Add List
        </Button>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 20,
  },
});