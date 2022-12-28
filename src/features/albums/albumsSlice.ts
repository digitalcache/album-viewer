import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getAlbums } from './albumsAPI';

export interface CurrentUserState {
  id: number;
  name: string;
}

export interface AlbumsState {
  allAlbums: [] | any;
  status: 'idle' | 'loading' | 'failed';
  user: CurrentUserState
}

export interface AlbumState {
    id: number;
    title: string;
    userId: number;
}

export interface AlbumsRequest {
  id: string;
  currentUser: any;
}

const initialState: AlbumsState = {
    allAlbums: [],
    user: {
      id: 0,
      name: ''
    },
    status: 'idle'
};

export const getAlbumsAsync = createAsyncThunk(
    'users/fetchAlbums',
    async (data: AlbumsRequest) => {
      const response = await getAlbums();
      return { response, data };
    }
);

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAlbumsAsync.pending, (state) => {
        state.status = 'loading';
        state.allAlbums = []
      })
      .addCase(getAlbumsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        let { response, data } = action.payload;

        // The API returns all albums, we need to filter the albums based on the userID
        let userAlbums = response.filter((album:AlbumState) => album.userId === parseInt(data.id))
        if(data.currentUser){
          state.user =  { 
            id: data.currentUser.id,
            name: data.currentUser.name
          }
        }
        state.allAlbums = userAlbums;
      })
      .addCase(getAlbumsAsync.rejected, (state) => {
        state.status = 'failed';
        state.allAlbums = []
      });
  }
});

export default albumsSlice.reducer;
export const albums = (state: RootState) => state.albums;