import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Photo} from '../types/Photo';
import {fetchSearch} from '../utils/helpers';

type stateType = {
  photos: Photo[];
  query: string;
  page: number;
  perPage: number;
  totalPageNumber: number;
  isLoading: boolean;
  error: string;
};

const initialState: stateType = {
  photos: [],
  query: '',
  page: 1,
  perPage: 4,
  // perPage: 10,
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
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPerPage: (state, action: PayloadAction<number>) => {
      state.perPage = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getSearch.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(getSearch.fulfilled, (state, action) => {
      state.photos = action.payload.results.map(
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
      );

      state.totalPageNumber = action.payload.total_pages;
      state.isLoading = false;
    });

    builder.addCase(getSearch.rejected, state => {
      state.isLoading = false;
      state.error = 'An error occured while loading photos';
    });
  },
});

export default photosSlice.reducer;
export const {setQuery, setPage, setPerPage} = photosSlice.actions;

export const getSearch = createAsyncThunk(
  'photos/fetchSearch',
  (args: {query: string; page: number; perPage: number}) => {
    return fetchSearch(args);
  },
);
