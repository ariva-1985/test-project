import { ActivityIndicator, Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useArticleById } from '@/features/articles/hooks/useArticleById';
import Animated, { FadeIn } from 'react-native-reanimated';
import { openExternalUrl } from '@/features/articles/utils';
import Separator from '@/components/UI/Separator';

type ArticleDetailsProps = {
  id: number;
};

export default function ArticleDetails({ id }: ArticleDetailsProps) {
  const { data, isLoading, isError, isRefetching } = useArticleById(id);
  if (isError) return null;
  if (isLoading || isRefetching) return <ActivityIndicator size="large" />;
  if (!data) return null;

  const handleExternalUrl = () => {
    if (data.url) {
      openExternalUrl(data.url).catch();
    }
  };
  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={4} ellipsizeMode={'tail'}>
          {data.title}
        </Text>
        <Separator style={styles.separator} />
        <Text style={styles.details}>
          Author: <Text style={styles.author}>{data.author}</Text>
        </Text>
        <Text style={styles.details}>Published: {data.publish_date}</Text>
        <Text style={styles.details}>Score: {data.score}</Text>
        <Text style={styles.details}>Comments: {data.number_of_comments}</Text>
        <Text style={styles.details} numberOfLines={2} ellipsizeMode={'tail'}>
          Url:
          <Text style={styles.underlined} onPress={handleExternalUrl}>
            {data.url}
          </Text>
        </Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleExternalUrl}>
          <Text style={styles.buttonText}>Read article</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', paddingBottom: 5 },
  contentContainer: { flexGrow: 1 },
  separator: { marginBottom: 15 },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 18,
    marginBottom: 5,
  },
  underlined: {
    textDecorationLine: 'underline',
  },
  buttonContainer: { width: '100%' },
  button: {
    padding: 15,
    marginVertical: 15,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
});
