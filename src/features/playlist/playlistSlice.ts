import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import WebTorrent from "webtorrent";

const client = new WebTorrent();

interface Video {
  filename: string;
  torrentId: string;
}

interface PlaylistState {
  playlist: Video[];
  currentTime: number;
  status: "PLAYING" | "PAUSED";
}

const initialState: PlaylistState = {
  playlist: [],
  currentTime: 0,
  status: "PAUSED",
};

export const playlistSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    pause: (state) => {
      state.status = "PAUSED";
    },
    play: (state) => {
      state.status = "PLAYING";
    },
    updateTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    addVideo: (state, action: PayloadAction<Video>) => {
        state.playlist.push(action.payload);
    },
    nextVideo: (state) => {
        state.playlist.shift();
    }
  },
});

export const { pause, play, updateTime, addVideo, nextVideo } = playlistSlice.actions;

export const synchronize = (): AppThunk => dispatch => {
    // TODO: Request state
}

export default playlistSlice.reducer;