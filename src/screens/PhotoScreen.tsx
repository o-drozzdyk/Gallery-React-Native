import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {colors} from '../utils/styles';

export const PhotoScreen = () => {
  const route = useRoute();
  const {url, width, height} = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{uri: url}}
        style={[styles.image, {aspectRatio: width / height}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },

  image: {
    width: '100%',
  },
});
