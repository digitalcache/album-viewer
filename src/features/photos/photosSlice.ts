import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { AlbumState } from '../albums/albumsSlice';
import { getPhotos } from './photosAPI';

export interface PhotosState {
  allPhotos: [] | any;
  status: 'idle' | 'loading' | 'failed';
  album: AlbumState;
}

export interface PhotoState {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export interface PhotosRequest {
  id: string;
  currentAlbum: AlbumState;
}

const initialState: PhotosState = {
    allPhotos: [],
    status: 'idle',
    album: {
      id: 0,
      title: '',
      userId: 0
    }
};

export const getPhotosAsync = createAsyncThunk(
    'users/fetchAlbums',
    async (data: PhotosRequest) => {
      const response = await getPhotos();
      return { response, data };
    }
);

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPhotosAsync.pending, (state) => {
        state.status = 'loading';
        state.allPhotos = []
      })
      .addCase(getPhotosAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        let { response, data} = action.payload;
        
        // The API returns all photos, we need to filter the photos based on the albumID
        let photos = response.filter((photo:PhotoState) => photo.albumId === parseInt(data.id))
        if(data.currentAlbum){
          state.album =  { 
            id: data.currentAlbum.id,
            title: data.currentAlbum.title,
            userId: data.currentAlbum.userId
          }
        }
        state.allPhotos = photos;
      })
      .addCase(getPhotosAsync.rejected, (state) => {
        state.status = 'failed';
        state.allPhotos = []
      });
  }
});

export default photosSlice.reducer;
export const photos = (state: RootState) => state.photos;