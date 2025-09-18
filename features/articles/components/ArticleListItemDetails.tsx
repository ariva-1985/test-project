import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCallback } from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { UIArticle } from '@/types';
import { useRouter } from 'expo-router';
import Separator from '@/components/UI/Separator';

type ArticleListItemDetailsProps = {
  article: UIArticle;
};

export default function ArticleListItemDetails({ article }: ArticleListItemDetailsProps) {
  const router = useRouter();
  const handlePress = useCallback(() => {
    router.navigate(`/article/${article.id}`);
  }, [router, article.id]);
  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <Text style={styles.title} numberOfLines={2} ellipsizeMode={'tail'}>
        {article.title}
      </Text>
      <Separator style={{ marginBottom: 10 }} />
      <Text style={styles.author}>By: {article.author}</Text>
      <Text style={styles.details}>Score: {article.score}</Text>
      <Text style={styles.details}>Comments: {article.number_of_comments}</Text>
      <View style={styles.bottomContainer}>
        <TouchableOpacity hitSlop={20} style={styles.detailsTouchable} onPress={handlePress}>
          <Text style={styles.detailsTouchableText}>Details</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'column', flex: 1, width: '100%' },
  infoContainer: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  bottomContainer: { flex: 1, justifyContent: 'flex-end' },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  author: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    fontSize: 12,
    marginBottom: 5,
  },
  detailsTouchable: { alignSelf: 'flex-end', paddingVertical: 5 },
  detailsTouchableText: { fontSize: 15, fontWeight: 'bold', textDecorationLine: 'underline' },
});
