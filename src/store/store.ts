import {configureStore} from '@reduxjs/toolkit';
import photosReducer from './photos';

const store = configureStore({
  reducer: {
    photos: photosReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
