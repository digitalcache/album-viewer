import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import albumsReducer from '../features/albums/albumsSlice';
import photosReducer from '../features/photos/photosSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    albums: albumsReducer,
    photos: photosReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;