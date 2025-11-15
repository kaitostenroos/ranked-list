import { deleteList } from "@/utils/deleteList";
import { useLocalSearchParams, useRouter } from "expo-router";

import { StyleSheet } from "react-native";
import { Appbar, Surface, Text } from "react-native-paper";

export default function ListItems() {
  const { id, title } = useLocalSearchParams();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      deleteList(id);
      router.back();
    } catch (err) {
      console.error("Failed to delete list", err);
    }
  };

  return (
    <Surface style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title={title} />
        <Appbar.Action icon={"pencil"} />
        <Appbar.Action icon={"delete"} onPress={handleDelete} />
      </Appbar.Header>
      <Text>List id: {id}</Text>
      <Text>List title: {title}</Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
