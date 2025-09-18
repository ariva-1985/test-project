import { Stack } from 'expo-router';

export default function MainStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Top Articles' }} />
      <Stack.Screen name="article/[articleId]" options={{ title: 'Details' }} />
    </Stack>
  );
}
