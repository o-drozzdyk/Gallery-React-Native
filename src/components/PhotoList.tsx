import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PhotoItem} from './PhotoItem';
import {useAppSelector} from '../store/hooks';

export const PhotoList = () => {
  const {photos} = useAppSelector(state => state.photos);

  return (
    <View style={styles.container}>
      {photos.map(photo => (
        <PhotoItem photo={photo} key={photo.id} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  columnWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});
