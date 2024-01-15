import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Photo} from '../types/Photo';
import {colors, spacing} from '../utils/styles';

type Props = {
  photo: Photo;
};

export const PhotoItem: React.FC<Props> = ({photo}) => {
  const [url, setUrl] = useState('');
  const {id, title, author, width, height} = photo;

  const navigation = useNavigation();

  useEffect(() => {
    const getPhotoUrl = () => {
      fetch(
        `https://api.unsplash.com/photos/${id}?client_id=VtkyZclbIU7UrMrtQ3uSgnyrIX1rIwYXw6Io9ylC3jw`,
      )
        .then(response => {
          if (!response.ok) {
            throw new Error("Couldn't load a photo");
          }

          return response.json();
        })
        .then(data => {
          setUrl(data.urls.full);
          console.log(data.urls.full);
        });
    };

    getPhotoUrl();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Photo', {url, width, height})}>
      <View style={styles.container}>
        <Image
          source={{uri: url}}
          style={[styles.image, {aspectRatio: width / height}]}
        />

        <Text style={[styles.title, styles.text]}>{title}</Text>
        <Text style={[styles.author, styles.text]}>{author}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    width: 170,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },

  image: {
    width: 150,
  },

  text: {
    fontSize: spacing.small,
    color: colors.text,
  },

  title: {
    textAlign: 'justify',
  },

  author: {
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
