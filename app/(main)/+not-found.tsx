import { StyleSheet, View } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: 'Oops! Not Found' }} />
      <Link href="/" style={styles.button}>
        Go back to Home screen!
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 18,
    textDecorationLine: 'underline',
    color: '#000',
    padding: 15,
  },
});
