import { deleteListItem } from "@/utils/deleteListItem";
import { fetchListItem } from "@/utils/fetchListItem";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Appbar, Surface, Text } from "react-native-paper";

export default function ListItemDetails() {
  //id of this list item
  const { id } = useLocalSearchParams();
  //id of list item belongs to
  const { listId } = useLocalSearchParams();
  const [listItemTitle, setListItemTitle] = useState("");
  const [listItemDesc, setListItemDesc] = useState("");
  const [rank, setRank] = useState("");

  const handleFetch = async () => {
    try {
      const fetchedListItem = await fetchListItem({id, listId});
      if (fetchedListItem) {
        setListItemTitle(fetchedListItem.itemTitle || "");
        setListItemDesc(fetchedListItem.itemDescription || "");
        setRank(fetchedListItem.rank || "");
      } else {
        console.warn("fetchListItem returned null or undefined");
      }
    } catch (error) {
      console.error("Failed to fetch list item title and description", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteListItem(id, listId);
      router.back();
    } catch (error){
      console.error("Failed to delete list item", error);
    }
  }

  useFocusEffect(() => {
    handleFetch();
  });

  return(
    <Surface style={styles.descContainer}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title={listItemTitle} />
        <Appbar.Action
          icon={"pencil"}
          onPress={() =>
            router.push({
              pathname: "../../editListItem",
              params: { id: id, listId: listId, listItemTitle: listItemTitle, listItemDesc: listItemDesc, listItemRank: rank },
            })
          }
        />
        <Appbar.Action icon={"delete"} onPress={handleDelete} />
      </Appbar.Header>
      <Text variant="titleMedium" style={styles.desc}>Description:</Text>
      <Text variant="bodyLarge" style={styles.desc}>{listItemDesc}</Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  descContainer: {
    flex: 1,
  },
  desc: {
    margin: 10,
  }
})
