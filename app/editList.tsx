import { db } from "@/database/opendb";

import * as ExpoImagePicker from "expo-image-picker";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { Appbar, Button, Surface, TextInput } from "react-native-paper";

export default function EditList() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const result = await db.getFirstAsync(
          "SELECT * FROM RankedLists WHERE id = ?",
          [id]
        );
        if (result) {
          setTitle(result.title || "");
          setImage(result.bannersrc || "");
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
        [title, image, description, now, id]
      );
      alert("List updated successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Could not update list", error);
      alert("Failed to update list");
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
    
        if (result.canceled) {
          setImage(undefined);
        } else {
          setImage(result.assets[0].uri);
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
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button style={styles.secondaryButton} mode="outlined" onPress={pickImage}>Select Image</Button>
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
