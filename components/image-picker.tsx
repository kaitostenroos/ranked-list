import * as ExpoImagePicker from "expo-image-picker";
import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button } from "react-native-paper";

export default function ImagePicker() {
  const [image, setImage] = useState<string | null>(null);

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

  return(
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button mode="outlined" onPress={pickImage}>Select Image</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 200,
    aspectRatio: "16/9",
    borderRadius: 8,
  },
});