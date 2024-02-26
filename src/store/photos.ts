import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Photo} from '../types/Photo';
import {fetchSearch, initialFetch} from '../utils/helpers';

type stateType = {
  photos: Photo[];
  query: string;
  page: number;
  totalPageNumber: number;
  isLoading: boolean;
  error: string;
};

const initialState: stateType = {
  photos: [],
  query: '',
  page: 1,
  totalPageNumber: 1,
  isLoading: false,
  error: '',
};

const photosSlice = createSlice({
  name: 'photos',
  initialState: initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(initialSearch.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(initialSearch.fulfilled, (state, action) => {
      state.photos = [
        ...state.photos,
        ...action.payload.map(
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
      ];

      state.isLoading = false;
    });

    builder.addCase(initialSearch.rejected, state => {
      state.isLoading = false;
      state.error = 'An error occured while loading photos';
    });

    builder.addCase(getSearch.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(getSearch.fulfilled, (state, action) => {
      state.photos = action.payload?.isNewQuery
        ? action.payload?.data.results.map(
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
          )
        : [
            ...state.photos,
            ...action.payload?.data.results.map(
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
          ];

      state.totalPageNumber = action.payload?.data.total_pages;
      state.isLoading = false;
    });

    builder.addCase(getSearch.rejected, state => {
      state.isLoading = false;
      state.error = 'An error occured while loading photos';
    });
  },
});

export default photosSlice.reducer;
export const {setQuery, setPage} = photosSlice.actions;

export const getSearch = createAsyncThunk(
  'photos/fetchSearch',
  (args: {query: string; page: number; isNewQuery: boolean}) => {
    return fetchSearch(args);
  },
);

export const initialSearch = createAsyncThunk(
  'photos/initialSearch',
  (page: number) => {
    return initialFetch(page);
  },
);
