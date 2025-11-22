import ListItemTable from "@/components/listItemTable";
import { createTableForListItems } from "@/database/opendb";
import { deleteList } from "@/utils/deleteList";
import { fetchList } from "@/utils/fetchList";
import { fetchListItems } from "@/utils/fetchListItems";

import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Appbar, FAB, Surface } from "react-native-paper";

export default function ListItems() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [listItems, setListItems] = useState([]);
  

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

  const handleFetch = async () => {
    if (!id) {
      console.error("Invalid id: cannot update list");
      return;
    }
    try {
      const fetchedList = await fetchList(id);
      if (fetchedList) {
        setTitle(fetchedList.title || "");
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
      console.error("Could not fetch list items", error);
    }
  };

  useFocusEffect(() => {
    handleFetch();
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
      <FAB
        label="New Entry"
        icon="plus"
        style={styles.fab}
        onPress={() => router.push({pathname: "../../addListItem", params: {listId: id}})}
      />
      <ListItemTable items={listItems} listId={id} />
    </Surface>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 30,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  container: {
    flex: 1,
  },
  description: {
    margin: 10,
  },
});
