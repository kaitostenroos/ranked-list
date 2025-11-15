import { router, useFocusEffect } from "expo-router";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from 'react-native'; // Changed to match _layout.tsx
import { Appbar, Card, FAB, Surface, Text } from "react-native-paper";

export default function ListSelector() {
  const db = SQLite.openDatabaseSync("listdb");
  const [rankedLists, setRankedLists] = useState([]);

  const dropTable = async () => {
    await db.execAsync(`
      DROP TABLE RankedLists`);
  };

  const initialize = async () => {
    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS RankedLists (id INTEGER PRIMARY KEY, title TEXT NOT NULL, bannersrc TEXT, description TEXT, created TEXT NOT NULL, updated TEXT NOT NULL );
      `);
    } catch (error) {
      console.error("Could not open database for lists", error);
    }
  };

  const insertExampleData = async () => {
    try {
      const tableCheck = await db.getAllAsync("SELECT * FROM RankedLists");
      const tableIsEmpty = tableCheck.length === 0;
      console.log(tableCheck);

      if (tableIsEmpty) {
        await db.execAsync(`
          INSERT INTO RankedLists (id, title, bannersrc, description, created, updated) VALUES
            (1, 'My Top Games', 'https://picsum.photos/700', 'A short ranked list of favorite games.', '2025-11-08', '2025-11-09'),
            (2, 'Top Movies', 'https://picsum.photos/700', 'All-time favorite movies.', '2025-11-07', '2025-11-08');
        `);
      } else {
        console.log("Interting example data failed: Table has data");
      }
    } catch (error) {
      console.error("Could not insert example data", error);
    }
  };

  const updateList = async () => {
    try {
      const lists = await db.getAllAsync("SELECT * from RankedLists");
      setRankedLists(lists);
      console.log("UPDATED: ", lists);
    } catch (error) {
      console.error("Could not get items", error);
    }
  };

  useEffect(() => {
    const bootstrap = async () => {
      //await dropTable(); //for dev purposes, remove from prod
      await initialize();
      await insertExampleData();
      await updateList();
    };

    bootstrap();
  }, []);

  useFocusEffect(() => {
    updateList();
  });

  return (
    <>
      <Surface style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Ranked List" />
      </Appbar.Header>
      <FlatList
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 96 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={(() => router.push({pathname: "../listitems/[id]", params: {id: item.id, title: item.title}}))}>
            <Card.Cover
              source={{ uri: item.bannersrc }}
              style={styles.cardCover}
            />
            <Card.Content>
              <Text variant="headlineLarge" style={styles.title}>
                {item.title}
              </Text>
              <Text variant="bodyLarge" style={styles.description}>
                {item.description}
              </Text>
              <Text variant="labelSmall" style={styles.date}>
                Created: {item.created}
              </Text>
              <Text variant="labelSmall" style={styles.date}>
                Updated: {item.updated}
              </Text>
            </Card.Content>
          </Card>
        )}
        data={rankedLists}
      />
    </Surface>
    <FAB
        label="New List"
        icon="plus"
        style={styles.fab}
        onPress={() => router.push({ pathname: "../addList" })}
      />
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
    zIndex: 999,
    elevation: 6,
  },
  card: {
    margin: 10,
  },
  cardCover: {
    marginBottom: 8,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
  },
  date: {
    marginBottom: 4,
  },
});
