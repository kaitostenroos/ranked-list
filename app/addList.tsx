import * as ExpoImagePicker from "expo-image-picker";

import { useNavigation } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { Appbar, Button, Surface, TextInput } from "react-native-paper";
import { db } from "../database/opendb";

export default function AddList() {
  const navigation = useNavigation();
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const addList = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    const now = new Date().toISOString().split("T")[0];
    try {
      await db.runAsync(
        "INSERT INTO RankedLists (title, bannersrc, description, created, updated) VALUES (?, ?, ?, ?, ?)",
        [title, image, description, now, now]
      );
      alert("List added successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Could not add list", error);
      alert("Failed to add list");
    }
  };

  const pickImage = async () => {
      let result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

  return (
    <Surface style={styles.inputContainer}> 
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add New List" />
      </Appbar.Header>
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
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button style={styles.secondaryButton} mode="outlined" onPress={pickImage}>Select Image</Button>
      <Button mode="contained" onPress={addList} style={styles.button}>
        Add List
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
    margin: 16,
    marginTop: 30,
  },
  secondaryButton: {
    width: 200,
    margin: 16,
    marginBottom: 20,
    alignSelf: "center",
  },
  image: {
    margin: 16,
    height: 200,
    aspectRatio: "16/9",
    borderRadius: 8,
  },
});
