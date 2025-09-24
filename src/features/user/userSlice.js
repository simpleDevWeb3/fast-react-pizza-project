import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  phone: null,
  address: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUsername: (state, action) => {
      state.name = action.payload.name;
    },
  },
});

export const { updateUsername } = userSlice.actions;
export default userSlice.reducer;
