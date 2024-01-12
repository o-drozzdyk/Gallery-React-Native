import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, spacing} from '../utils/styles';

type Props = {
  buttonClickHandler: (query: string) => void;
};

export const Form: React.FC<Props> = ({buttonClickHandler}) => {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type..."
        value={query}
        onChangeText={setQuery}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          buttonClickHandler(query);
        }}>
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
