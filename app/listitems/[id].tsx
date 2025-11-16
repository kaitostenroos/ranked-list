import { deleteList } from "@/utils/deleteList";
import { updateList } from "@/utils/updateList";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";

import { StyleSheet } from "react-native";
import { Appbar, Surface, Text } from "react-native-paper";

export default function ListItems() {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleDelete = async () => {
    if (!id) {
      console.error("Invalid id: cannot delete list");
      return;
    }
    try {
      await deleteList(id);
      router.back();
    } catch (error) {
      console.error("Failed to delete list", error);
    }
  };

  const handleUpdate = async () => {
    if (!id) {
      console.error("Invalid id: cannot update list");
      return;
    }
    try {
      const updatedList = await updateList(id);
      if (updatedList) {
        setTitle(updatedList.title || "");
        setDescription(updatedList.description || "");
      } else {
        console.warn("updateList returned null or undefined");
      }
    } catch (error) {
      console.error("Failed to update list title and description", error);
      // Optionally, show a user-friendly alert here using Alert from react-native
    }
  };

  useFocusEffect(() => {
    handleUpdate();
  });

  return (
    <Surface style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title={title} />
        <Appbar.Action
          icon={"pencil"}
          onPress={() =>
            router.push({
              pathname: "../../editList",
              params: { id: id, title: title },
            })
          }
        />
        <Appbar.Action icon={"delete"} onPress={handleDelete} />
      </Appbar.Header>
      <Text variant="titleMedium">{description}</Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
