import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";

export default function ListItems() {
    const { id } = useLocalSearchParams();
    const { title } = useLocalSearchParams();

    return(
        <Surface style={styles.container}>
            <Text>List id: {id}</Text>
            <Text>List title: {title}</Text>
        </Surface>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }})