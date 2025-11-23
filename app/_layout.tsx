import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, View } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import 'react-native-reanimated';


export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;


  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <PaperProvider theme={theme}>
        <Stack screenOptions={{ contentStyle: { backgroundColor: theme.colors.background } }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="addList" options={{ presentation: 'modal', title: 'Add New List', headerShown: false }} />
          <Stack.Screen name="list/[id]" options={{ headerShown: false }}/>
          <Stack.Screen name="editList" options={{ headerShown: false }}/>
          <Stack.Screen name="listitem/[listItemId]" options={{ headerShown: false }}/>
          <Stack.Screen name='addListItem' options={{headerShown: false}} />
          <Stack.Screen name='editListItem' options={{headerShown: false}} />
        </Stack>
        <StatusBar style="auto" />
      </PaperProvider>
    </View>
  );
}
