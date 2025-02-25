import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    role: '',
    username: ''
  },
  reducers: {
    addUser: (state, action) => {
      state.username = action.payload.username;
      state.role = action.payload.role;
      localStorage.setItem("loggedInUser", JSON.stringify(action.payload)); // ✅ Store user in localStorage
    },
    logoutUser: (state) => {
      state.username = "";
      state.role = "";
      localStorage.removeItem("loggedInUser"); // ✅ Remove user session
    }
  },
});

// Export actions
export const { addUser, logoutUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
