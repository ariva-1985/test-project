import ArticlesList from '@/features/articles/components/ArticlesList';
import { StyleSheet, View } from 'react-native';

export default function TopArticles() {
  return (
    <View style={styles.container}>
      <ArticlesList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
