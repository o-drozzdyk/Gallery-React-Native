import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {PhotoItem} from './PhotoItem';

interface Photo {
  id: string;
  title: string | null;
  author: string;
  width: number;
  height: number;
}

type Props = {
  photos: Photo[];
};

export const PhotoList: React.FC<Props> = ({photos}) => {
  return (
    <FlatList
      data={photos}
      renderItem={({item: photo}) => <PhotoItem photo={photo} />}
      keyExtractor={photo => photo.id}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      key={1}
    />
  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});
