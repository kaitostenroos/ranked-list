import * as ExpoImagePicker from "expo-image-picker";

import { insertList } from "@/utils/insertList";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { Appbar, Button, Surface, TextInput } from "react-native-paper";

export default function AddList() {
  const navigation = useNavigation();
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<string | undefined>(undefined);

  const handleAdd = async () => {
    if (title == null) {
      alert("Title is required");
      return;
    } else if(!title.trim()) {
      alert("Title is required");
      return;
    }
    const now = new Date().toISOString().split("T")[0];
    insertList(title, image || "", description || "", now, now)
    navigation.goBack();
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
      <Button mode="contained" onPress={handleAdd} style={styles.button}>
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
