import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '../features/loadingSlice.ts';
import loggedInReducer from "../features/LoginDetailsSlice.ts"

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    loggedIn: loggedInReducer,
  },
});

export default store;
// Define RootState & AppDispatch types for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
