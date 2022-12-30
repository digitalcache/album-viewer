import { configureStore, ThunkAction, Action, PreloadedState, combineReducers } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import albumsReducer from '../features/albums/albumsSlice';
import photosReducer from '../features/photos/photosSlice';

const rootReducer = combineReducers({
    users: usersReducer,
    albums: albumsReducer,
    photos: photosReducer
})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}
export type AppDispatch = AppStore['dispatch']
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;