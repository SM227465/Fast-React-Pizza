import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;