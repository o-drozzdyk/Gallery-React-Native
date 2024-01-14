import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchPhotoUrl} from '../utils/helpers';

const photoUrlSlice = createSlice({
  name: 'photoUrl',
  initialState: '',
  reducers: {
    //
  },
  extraReducers: builder => {
    builder.addCase(getPhotoUrl.fulfilled, (_, action) => {
      return action.payload.urls.full;
    });
  },
});

export default photoUrlSlice.reducer;
export const {actions} = photoUrlSlice;

export const getPhotoUrl = createAsyncThunk(
  'photoUrl/fetchUrl',
  (id: string) => {
    return fetchPhotoUrl(id);
  },
);
