import { ActivityIndicator, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { QueryObserverResult } from '@tanstack/react-query';

type ArticleListEmptyComponentProps = {
  loading: boolean;
  error: boolean;
  refetch: () => Promise<QueryObserverResult<number[], Error>>;
};

export default function ArticleListEmptyComponent({ loading, error, refetch }: ArticleListEmptyComponentProps) {
  const content = loading ? (
    <ActivityIndicator size="large" />
  ) : error ? (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>Something went wrong!</Text>
      <TouchableOpacity onPress={refetch} style={styles.button}>
        <Text>Retry</Text>
      </TouchableOpacity>
    </View>
  ) : null;
  return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
  container: { width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center' },
  errorContainer: { alignItems: 'center', justifyContent: 'center' },
  errorText: { color: 'red', fontSize: 20, marginBottom: 15 },
  button: { borderWidth: 1, borderColor: 'black', padding: 15, minWidth: 300, alignItems: 'center' },
});
