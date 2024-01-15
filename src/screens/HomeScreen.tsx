import React, {useMemo} from 'react';
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
import {Pagination} from '../components/Pagination';
import {colors, spacing} from '../utils/styles';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import * as photosActions from '../store/photos';

export const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const {query, page, perPage, isLoading, error} = useAppSelector(
    state => state.photos,
  );

  useMemo(() => {
    dispatch(photosActions.getSearch({query, page, perPage}));
  }, [dispatch, page, perPage]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.body}>
        <View style={styles.container}>
          <Form />

          {query && isLoading && (
            <View style={styles.loadingMessage}>
              <Text style={[styles.loadingText, styles.text_color]}>
                Loading...
              </Text>
            </View>
          )}
          {query &&
            !isLoading &&
            (error ? (
              <View style={styles.loadingMessage}>
                <Text style={[styles.loadingText, styles.text_color]}>
                  {error}
                </Text>
              </View>
            ) : (
              <View style={styles.content}>
                <Text style={[styles.text_info, styles.text_color]}>
                  {`Search results for "${query}":`}
                </Text>

                <View style={styles.perPageContainer}>
                  <Text style={[styles.perPageTitle, styles.text_color]}>
                    Items on page:
                  </Text>

                  <View style={styles.buttonsContainer}>
                    {[4, 10, 16].map(num => (
                      <TouchableOpacity
                        style={[
                          styles.perPageButton,
                          perPage === num && styles.buttonActive,
                        ]}
                        onPress={() => dispatch(photosActions.setPerPage(num))}
                        key={num}>
                        <Text style={styles.buttonText}>{num}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <PhotoList />

                <Pagination />
              </View>
            ))}
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

  perPageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  perPageTitle: {
    fontSize: spacing.medium,
  },

  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
  },

  perPageButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.button,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  buttonActive: {
    borderWidth: 1,
    borderColor: colors.header,
  },

  buttonText: {
    fontSize: spacing.medium,
    fontWeight: 'bold',
    color: colors.buttonText,
  },
});
