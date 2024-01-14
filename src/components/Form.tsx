import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, spacing} from '../utils/styles';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import * as photosActions from '../store/photos';

export const Form = () => {
  const dispatch = useAppDispatch();
  const {query, page, perPage} = useAppSelector(state => state.photos);

  const buttonClickHandler = () => {
    if (query.length >= 3) {
      dispatch(photosActions.getSearch({query, page, perPage}));
    } else {
      dispatch(photosActions.setQuery(''));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type..."
        value={query}
        onChangeText={event => dispatch(photosActions.setQuery(event))}
      />

      <TouchableOpacity style={styles.button} onPress={buttonClickHandler}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },

  input: {
    width: 200,
    height: '100%',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    fontSize: spacing.form,
    backgroundColor: colors.white,
    color: colors.buttonText,
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
    borderRadius: 5,
    backgroundColor: colors.button,
  },

  buttonText: {
    fontSize: spacing.form,
    fontWeight: 'bold',
    color: colors.buttonText,
  },
});
