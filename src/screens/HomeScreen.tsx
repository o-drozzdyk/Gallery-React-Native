import React, {useEffect, useMemo} from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Form} from '../components/Form';
import {PhotoList} from '../components/PhotoList';
import {colors, spacing} from '../utils/styles';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import * as photosActions from '../store/photos';

export const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const {query, page, isLoading, error} = useAppSelector(state => state.photos);

  useEffect(() => {
    dispatch(photosActions.initialSearch(1));
  }, []);

  useMemo(() => {
    dispatch(photosActions.getSearch({query, page: 1, isNewQuery: true}));
  }, [dispatch, query]);

  const showMore = () => {
    const nextPage = page + 1;

    dispatch(photosActions.setPage(nextPage));

    if (query.length > 0) {
      dispatch(
        photosActions.getSearch({query, page: nextPage, isNewQuery: false}),
      );
    } else {
      dispatch(photosActions.initialSearch(nextPage));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.body}>
        <View style={styles.container}>
          <Form />

          {isLoading ? (
            <View style={styles.loadingMessage}>
              <Text style={[styles.loadingText, styles.text_color]}>
                Loading...
              </Text>
            </View>
          ) : (
            <View style={styles.content}>
              <PhotoList />

              <TouchableOpacity style={styles.button} onPress={showMore}>
                <Text style={styles.buttonText}>More</Text>
              </TouchableOpacity>
            </View>
          )}

          {error && (
            <View style={styles.loadingMessage}>
              <Text style={[styles.loadingText, styles.text_color]}>
                {error}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    height: '100%',
    padding: 20,
    gap: 20,
    backgroundColor: colors.background,
  },

  loadingMessage: {
    alignItems: 'center',
  },

  loadingText: {
    fontSize: spacing.large,
  },

  content: {
    gap: 20,
  },

  text_color: {
    color: colors.text,
  },

  text_info: {
    fontSize: spacing.large,
  },

  button: {
    height: 40,
    borderRadius: 5,
    backgroundColor: colors.button,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  buttonText: {
    paddingHorizontal: 16,
    fontSize: spacing.medium,
    fontWeight: 'bold',
    color: colors.buttonText,
  },
});
