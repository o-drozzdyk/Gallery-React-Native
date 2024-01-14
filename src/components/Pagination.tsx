import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, spacing} from '../utils/styles';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import * as photosActions from '../store/photos';

export const Pagination = () => {
  const dispatch = useAppDispatch();
  const {page, totalPageNumber} = useAppSelector(state => state.photos);

  const goToPrevPage = () => {
    if (page > 1) {
      dispatch(photosActions.setPage(page - 1));
    }
  };

  const goToNextPage = () => {
    if (page < totalPageNumber) {
      dispatch(photosActions.setPage(page + 1));
    }
  };

  return (
    totalPageNumber > 1 && (
      <View style={styles.container}>
        {page > 1 && (
          <TouchableOpacity style={styles.button} onPress={goToPrevPage}>
            <Text style={styles.text}>{'<'}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>{page}</Text>
        </TouchableOpacity>

        {page < totalPageNumber && (
          <TouchableOpacity style={styles.button} onPress={goToNextPage}>
            <Text style={styles.text}>{'>'}</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginTop: -10,
  },

  button: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: colors.button,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: spacing.medium,
    fontWeight: 'bold',
    color: colors.buttonText,
  },
});
