import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import WebTorrent from "webtorrent";
export interface TorrentSerial {
  name: string;
  torrentId: string;
  downloaded: number;
  downloadSpeed: number;
  progress: number;
  ready: boolean;
  files: {
    name: string;
    include: boolean;
    progress: number;
    downloaded: number;
    blobUrl: string | null
  }[];
}
interface TorrentState {
  torrents: TorrentSerial[];
  downloadSpeed: number;
  progress: number;
  uploadSpeed: number;
  ratio: number;
}

const initialState: TorrentState = {
  torrents: [],
  downloadSpeed: 0,
  progress: 0,
  uploadSpeed: 0,
  ratio: 0,
};
export const torrentSlice = createSlice({
  name: "torrent",
  initialState,
  reducers: {
    addTorrent: (state, action: PayloadAction<string>) => {
      // Handled by torrent middleware
    },
    removeTorrent: (state, action: PayloadAction<string>) => {
      // Handled by torrent middleware
    },
    unselectAll: (state, action: PayloadAction<{ torrentId: string }>) => {
      // TODO
    },
    select: (
      state,
      action: PayloadAction<{ torrentId: string; index: number | number[] }>
    ) => {
      // TODO
    },
    updateStore: (state, action: PayloadAction<TorrentState>) => {
      return action.payload;
    },
  },
});

export const {
  addTorrent,
  removeTorrent,
  select,
  unselectAll,
  updateStore,
} = torrentSlice.actions;
export default torrentSlice.reducer;
