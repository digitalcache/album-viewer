import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { getUsers } from './usersAPI';

export interface UserState {
  allUsers: [] | any;
  status: 'idle' | 'loading' | 'failed';
}

export interface UserInfoState {
  email: string;
  id: number;
  address: {
      city: string;
      street: string;
      geo: {
          lat: string;
          lng: string;
      },
      suite: string;
      zipcode: string;
  }
  name: string;
  phone: string;
  username: string;
}

const initialState: UserState = {
    allUsers: [],
    status: 'idle'
};

export const getUsersAsync = createAsyncThunk(
    'users/fetchUsers',
    async () => {
      const response = await getUsers();
      return response;
    }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.status = 'loading';
        state.allUsers = []
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.allUsers = action.payload;
      })
      .addCase(getUsersAsync.rejected, (state) => {
        state.status = 'failed';
        state.allUsers = []
      });
  }
});

export default usersSlice.reducer;
export const users = (state: RootState) => state.users;