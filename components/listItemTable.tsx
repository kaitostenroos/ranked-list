import { router } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { DataTable, useTheme } from "react-native-paper";

export default function ListItemTable({ items, listId }) {
  const [sortDirection, setSortDirection] = useState("ascending");
  const theme = useTheme();
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (sortDirection === "ascending") {
        return a.rank - b.rank;
      } else {
        return b.rank - a.rank;
      }
    });
  }, [items, sortDirection]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title
          sortDirection={sortDirection}
          onPress={() =>
            setSortDirection((prev) =>
              prev === "ascending" ? "descending" : "ascending"
            )
          }
        >
          Rank
        </DataTable.Title>
      </DataTable.Header>
      {sortedItems.map((item) => (
        <DataTable.Row
          key={item.id}
          style={styles.dataRow}
          rippleColor="rgba(255, 255, 255, 1)"
          onPress={() =>
            router.push({
              pathname: "/listitem/[listitemId]",
              params: { id: item.id, listId: listId },
            })
          }
        >
          <DataTable.Cell style={styles.rankCell}>{item.rank}</DataTable.Cell>
          <DataTable.Cell style={styles.titleCell}>
            {item.itemTitle}
          </DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
}

const styles = StyleSheet.create({
  dataRow: {
    height: 50,
    alignItems: "stretch",
    margin: 10,
  },
  rankCell: {
    flex: 1,
  },
  titleCell: {
    flex: 6,
  },
});
