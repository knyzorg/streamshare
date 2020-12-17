import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import torrentReducer from "../features/torrent/torrentSlice";
import socketMiddleware from "./socketMiddleware";
import torrentMiddleware from "./torrentMiddleware";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    torrent: torrentReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      socketMiddleware,
      torrentMiddleware
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
