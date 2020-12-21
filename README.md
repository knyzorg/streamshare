# Streamshare
Streamshare aspires to be [Sync Tube](https://sync-tube.de/) but for Torrents.

## Why?
Sync-Tube is great, but it is limited to YouTube only. Torrents are a rich source of media, a lot of which isn't accessible from YouTube. Furthermore, sharing local files is generally difficult due to the need to upload them to a central server to later push down to other views. This issue is side-stepped through the use of peer-to-peer technology, specifically WebTorrent. 

## How?
If we're going to go peer-to-peer, we may as well go all in. The idea is to eventually settle on a pure peer-to-peer implementation where the commands are dispatched via TURN servers. This will require either a consensus protocol, identity cryptography or the assumption of everyone being good internet citizens.

For now however, the communication will be forwarded through a central socket.io server.

# Protocol

While the exact specification is yet to be settled on, here as some commands which will be used as a working draft.

## Input

This is the data that clients send to the sychronization server. It will usually be passed through as-is, with the addition of a meta object.

### Join

```js
{
    command: "Join",
    name: "<string>",
    roomId: "<string>"
}
```
### Hello
```js
{
    command: "HELLO",
    users: {
        [
            {
                id: "<number>",
                name: "<string>"
            },
            {
                id: "<number>",
                name: "<string>"
            }
        ]
    },
    status: {
        currentTime: "<number>",
        state: "PLAYING" | "PAUSED"
    },
    playlist: 
        [
            {
                filename: "<string>",
                torrentId: "<string>"
            }
        ],
    dispatchedAt: "<number>"
}
```
### Pause:
```js
{
    command: "PAUSE",
    currentTime: "<number>",
    dispatchedAt: "<number>"
}
```

### Play/Pause:
```js
{
    command: "PLAY" | "PAUSE",
    currentTime: "<number>",
    dispatchedAt: "<number>"
}
```
### Sync
```js
{
    command: "SYNC",
    currentTime: "<number>",
    buffer: "<number>",
    dispatchedAt: "<number>"
}
```

##  Output
### Play/Pause:
```js
{
    command: "PLAY" | "PAUSE",
    userId: "<number>",
    currentTime: "<number>",
    dispatchedAt: "<number>"
}
```
### Hello

Message sent to new connections and reconnections:

```js
{
    command: "HELLO",
    users: {
        [
            {
                id: "<number>",
                name: "<string>"
            },
            {
                id: "<number>",
                name: "<string>"
            }
        ]
    },
    status: {
        currentTime: "<number>",
        state: "PLAYING" | "PAUSED"
    },
    playlist: 
        [
            {
                filename: "<string>",
                torrentId: "<string>"
            }
        ],
    dispatchedAt: "<number>"
}
```

### Sync
```js
{
    command: "SYNC",
    userId: "<number>",
    currentTime: "<number>",
    buffer: "<number>",
    dispatchedAt: "<number>"
}
```