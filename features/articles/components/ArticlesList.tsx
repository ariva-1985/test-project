import { useTopArticlesIds } from '@/features/articles/hooks/useTopArticlesId';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useArticleById } from '@/features/articles/hooks/useArticleById';
import ArticleListEmptyComponent from '@/features/articles/components/ArticleListEmptyComponent';
import ArticleListItemDetails from '@/features/articles/components/ArticleListItemDetails';
import { memo, useCallback } from 'react';

const LIST_ITEM_HEIGHT = 220;

export default function ArticlesList() {
  const { data, isPending, isRefetching, isError, refetch } = useTopArticlesIds();
  const keyExtractor = useCallback((id: number) => String(id), []);
  const renderItem = useCallback(({ item: id }: { item: number }) => {
    return <MemoizedListItem id={id} />;
  }, []);
  return (
    <FlatList
      style={{
        pointerEvents: isPending || isRefetching ? 'none' : 'auto',
        width: '100%',
        alignSelf: 'center',
      }}
      onRefresh={refetch}
      refreshing={isRefetching}
      contentContainerStyle={styles.contentContainer}
      data={data}
      initialNumToRender={8}
      maxToRenderPerBatch={8}
      windowSize={2}
      //getItemLayout={(data, index) => ({ length: LIST_ITEM_HEIGHT, offset: LIST_ITEM_HEIGHT * index, index })}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListEmptyComponent={<ArticleListEmptyComponent loading={isPending} error={isError} refetch={refetch} />}
    />
  );
}

const MemoizedListItem = memo(function ListItem({ id }: { id: number }) {
  const { data, isLoading, isError } = useArticleById(id);
  if (isError || (!data && !isLoading)) return null;
  return (
    <View style={styles.listItemContainer}>
      {isLoading ? <ActivityIndicator /> : null}
      {Boolean(data) && <ArticleListItemDetails article={data!} />}
    </View>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    width: '100%',
    paddingBottom: 15,
  },
  listItemContainer: {
    width: '100%',
    minHeight: LIST_ITEM_HEIGHT,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black',
  },
});
