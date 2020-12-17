import { createAction, Middleware, PayloadAction } from "@reduxjs/toolkit";
import { resolve } from "dns";
import WebTorrent, { TorrentDestroyOptions } from "webtorrent";
import {
  addTorrent,
  removeTorrent,
  torrentSlice,
  updateStore,
} from "../features/torrent/torrentSlice";

const blobUrlPromisfy = (file: WebTorrent.TorrentFile) =>
  new Promise<string>((res, rej) => file.getBlobURL((err, url) => err ? rej(err) : res(url ?? "")));

const torrentMiddleware: Middleware = (store) => {
  const client = new WebTorrent();
  const dispatchStoreUpdate = async () => {
    const torrents = await Promise.all(
      client.torrents.map(async (t) => ({
        name: t.name,
        torrentId: t.magnetURI,
        downloaded: t.downloaded,
        downloadSpeed: t.downloadSpeed,
        progress: t.progress,
        ready: t.ready,
        files: await Promise.all(
          t.files.map(async (f) => ({
            name: f.name,
            // TODO: Make this dynamic in the middleware
            include: true,
            downloaded: f.downloaded,
            progress: f.progress,
            blobUrl: t.ready ? await blobUrlPromisfy(f) : null,
          }))
        ),
      }))
    );

    const payload = {
      torrents,
      downloadSpeed: client.downloadSpeed,
      ratio: client.ratio,
      progress: client.progress,
      uploadSpeed: client.uploadSpeed,
    };
    store.dispatch(updateStore(payload));
  };
  return (next) => async (action: PayloadAction<any>) => {
    switch (action.type) {
      case addTorrent.type:
        const addedTorrent = client.add(
          (<ReturnType<typeof addTorrent>>action).payload
        );
        // Wait for metadata to become available
        addedTorrent.on("ready", dispatchStoreUpdate);
        addedTorrent.on("download", dispatchStoreUpdate);
        // TODO: Remove all selected by default
        // Notify store of changes
        dispatchStoreUpdate();
        break;
      case removeTorrent.type:
        client.remove(action.payload.torrentId as string);
        dispatchStoreUpdate();
    }
    next(action);
  };
};

export default torrentMiddleware;
