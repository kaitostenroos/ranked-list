import ListItemTable from "@/components/listItemTable";
import { createTableForListItems } from "@/database/opendb";
import { deleteList } from "@/utils/deleteList";
import { fetchListItems } from "@/utils/fetchListItems";
import { updateList } from "@/utils/updateList";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { StyleSheet } from "react-native";
import { Appbar, Surface } from "react-native-paper";

export default function ListItems() {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [listItems, setListItems] = useState([]);
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
      } else {
        console.warn("updateList returned null or undefined");
      }
    } catch (error) {
      console.error("Failed to update list title and description", error);
    }
    try {
      const fetchedListItems = await fetchListItems(id);
      setListItems(fetchedListItems);
    } catch (error) {
      console.error("Could not fetch list items", error)
    }
  };

  useFocusEffect(() => {
    handleUpdate();
  });

  useEffect(() => {
    createTableForListItems(id);
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
      <ListItemTable items={listItems}/>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  description: {
    margin: 10
  }
});
