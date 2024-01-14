import {configureStore} from '@reduxjs/toolkit';
import photosReducer from './photos';
import photoUrlReducer from './photoUrl';

const store = configureStore({
  reducer: {
    photos: photosReducer,
    photoUrl: photoUrlReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
