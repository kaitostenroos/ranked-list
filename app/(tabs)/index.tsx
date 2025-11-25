import { updateLists } from "@/utils/updateLists";
import { createTableForLists } from "../../database/opendb";

import { router, useFocusEffect } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from 'react-native';
import { Appbar, Card, FAB, Surface, Text } from "react-native-paper";

interface List {
  id: string;
  title: string;
  description?: string;
  bannersrc?: string; 
  created?: string;
  updated?: string;
}

export default function ListSelector() {
  const [rankedLists, setRankedLists] = useState<List[]>([])

  useEffect(() => {
    const bootstrap = async () => {
      await createTableForLists();
      const lists = await updateLists();
      setRankedLists(lists?? []);
    };

    bootstrap();
  }, []);

  //remove this when dropping tables
  useFocusEffect(() => {
    const bootstrap = async () => {
      const lists = await updateLists();
      setRankedLists(lists ?? []);

    }
    
    bootstrap();
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
