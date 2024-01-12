import React, {useMemo, useState} from 'react';
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
import {Photo} from '../types/Photo';
import {colors, spacing} from '../utils/styles';

const ACCESS_KEY = 'VtkyZclbIU7UrMrtQ3uSgnyrIX1rIwYXw6Io9ylC3jw';

export const HomeScreen = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPageNumber, setTotalPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useMemo(() => {
    if (query.length >= 3) {
      setIsLoading(true);
      setQuery(query);

      fetch(
        `https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&page=${page}&query=${query}&per_page=${perPage}`,
      )
        .then(response => response.json())
        .then(data => {
          setPhotos(
            data.results.map(
              ({
                description,
                alt_description,
                id,
                user,
                height,
                width,
              }: {
                description: string;
                alt_description: string;
                id: string;
                user: {name: string};
                height: number;
                width: number;
              }) => {
                const title = description ? description : alt_description;

                return {
                  id,
                  title,
                  author: user.name,
                  width,
                  height,
                };
              },
            ),
          );

          setTotalPageNumber(data.total_pages);
        })
        .finally(() => setIsLoading(false));
    } else {
      setQuery('');
    }
  }, [query, page, perPage]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.body}>
        <View style={styles.container}>
          <Form buttonClickHandler={input => setQuery(input)} />

          {query &&
            (isLoading ? (
              <View style={styles.loadingMessage}>
                <Text style={[styles.loadingText, styles.text_color]}>
                  Loading...
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
                        onPress={() => setPerPage(num)}
                        key={num}>
                        <Text style={styles.buttonText}>{num}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <PhotoList photos={photos} />

                <Pagination
                  page={page}
                  totalPageNumber={totalPageNumber}
                  pageButtonHandler={newPage => setPage(newPage)}
                />
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
