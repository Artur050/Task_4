import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:5000/api/users');
  return response.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState: { users: [], status: 'idle', error: null },
  reducers: {
    blockUser(state, action) {
      const user = state.users.find(user => user._id === action.payload);
      if (user) user.status = 'blocked';
    },
    deleteUser(state, action) {
      state.users = state.users.filter(user => user._id !== action.payload);
    },
    unblockUser(state, action) {
      const user = state.users.find(user => user._id === action.payload);
      if (user) user.status = 'active';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { blockUser, deleteUser, unblockUser } = userSlice.actions;

export default userSlice.reducer;