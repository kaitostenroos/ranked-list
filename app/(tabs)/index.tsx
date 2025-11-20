import { router, useFocusEffect } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from 'react-native';
import { Appbar, Card, FAB, Surface, Text } from "react-native-paper";
import { createTableForListItems, createTableForLists, db } from "../../database/opendb";

export default function ListSelector() {
  const [rankedLists, setRankedLists] = useState([]);

  const dropTable = async () => {
    await db.execAsync(`
      DROP TABLE IF EXISTS list_1_items
    `);
    await db.execAsync(`
      DROP TABLE IF EXISTS list_2_items
    `);
    await db.execAsync(`
      DROP TABLE IF EXISTS RankedLists`);
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
        await createTableForListItems(1);
        await db.execAsync(`
          INSERT INTO list_1_items (id, itemTitle, itemDescription, rank) VALUES
            (1, 'The Legend of Zelda: Breath of the Wild', 'An open-world adventure game.', '1'),
            (2, 'Super Mario Odyssey', 'A 3D platformer with exploration.', '1.5'),
            (3, 'The Witcher 3: Wild Hunt', 'A fantasy RPG with deep storytelling.', '1.6');
        `);
        await createTableForListItems(2);
        await db.execAsync(`
          INSERT INTO list_2_items (id, itemTitle, itemDescription, rank) VALUES
            (1, 'The Shawshank Redemption', 'A drama about hope and friendship.', '1'),
            (2, 'The Godfather', 'A crime saga about family and power.', '2'),
            (3, 'Pulp Fiction', 'A nonlinear crime film.', '3');
        `);
      } else {
        console.log("Inserting example data failed: Table has data");
      }
    } catch (error) {
      console.error("Could not insert example data", error);
    }
  };

  const updateLists = async () => {
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
      await createTableForLists();
      await insertExampleData();
      await updateLists();
    };

    bootstrap();
  }, []);

  //remove this when dropping tables
  useFocusEffect(() => {
    updateLists();
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
          <Card style={styles.card} onPress={(() => router.push({pathname: "../list/[id]", params: {id: item.id, title: item.title, description: item.description}}))}>
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
