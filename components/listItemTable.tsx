import { useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";

export default function ListItemTable({ items }) {
  const [sortDirection, setSortDirection] = useState('ascending');

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (sortDirection === 'ascending') {
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
          onPress={() => setSortDirection(prev => prev === 'ascending' ? 'descending' : 'ascending')}
        >
          Rank
        </DataTable.Title>
      </DataTable.Header>
      {sortedItems.map((item) => (
        <DataTable.Row key={item.key}>
          <DataTable.Cell style={styles.rankCell}>{item.rank}</DataTable.Cell>
          <DataTable.Cell style={styles.titleCell}>{item.itemTitle}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
}

const styles = StyleSheet.create({
  rankCell: {
    flex: 1,
  },
  titleCell: {
    flex: 6,
  }
});
