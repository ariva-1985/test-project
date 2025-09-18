import { View, StyleSheet } from 'react-native';
import ArticleDetails from '@/features/articles/components/ArticleDetails';
import { useLocalSearchParams } from 'expo-router';

export default function Details() {
  const { articleId } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <ArticleDetails id={Number(articleId)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
