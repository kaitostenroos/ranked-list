import { fetchListItem } from "@/utils/fetchListItem";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Surface, Text } from "react-native-paper";

export default function ListItemDetails() {
  const { id } = useLocalSearchParams();
  const { listId } = useLocalSearchParams();
  const [listItemTitle, setListItemTitle] = useState("");
  const [listItemDesc, setListItemDesc] = useState("");
  const [rank, setRank] = useState(1);

  const handleFetch = async () => {
    if (!id) {
      console.error("Invalid id: cannot update list item");
      return;
    }
    try {
      const fetchedListItem = await fetchListItem({id, listId});
      if (fetchedListItem) {
        setListItemTitle(fetchedListItem.itemTitle || "");
        setListItemDesc(fetchedListItem.itemDescription || "");
      } else {
        console.warn("fetchListItem returned null or undefined");
      }
    } catch (error) {
      console.error("Failed to fetch list item title and description", error);
    }
  };

  useFocusEffect(() => {
    handleFetch(id);
  });

  return(
    <Surface>
      <Text>{listItemTitle}</Text>
      <Text>{listItemDesc}</Text>
      <Text>{rank}</Text>
    </Surface>
  );
}
