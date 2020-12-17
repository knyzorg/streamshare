import { Action, createAction, Middleware, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const connect = createAction<string>("socket/connect");
export const disconnect = createAction("socket/disconnect");
export const message = createAction<any>("socket/connect");


const socketMiddleware: Middleware = store => {
  let socket: WebSocket | null;

  const onOpen: WebSocket['onopen'] = (event) => {
    console.log("websocket opened", event);
    //store.dispatch(actions.wsConnected(event.target.url));
  };

  const onClose: WebSocket['onclose'] = () => {
    console.log("websocket closed")
  };

  const onMessage: WebSocket['onmessage'] = (event) => {
    console.log("websocket message", event)
  };

  // the middleware part of this function
  return next => (action: PayloadAction<any>) => {
      console.log(action)
    switch (action.type) {
      case connect.toString():
        if (socket != null) {
          socket.close();
        }
        // connect to the remote host
        socket = new WebSocket(action.payload);

        // websocket handlers
        socket.onmessage = onMessage;
        socket.onclose = onClose;
        socket.onopen = onOpen;

        break;
      case disconnect.toString():
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        console.log("websocket closed");
        break;
      case message.toString():
        console.log("sending a message", action.payload);
        break;
      default:
        console.log("the next action:", action);
        return next(action);
    }
  };
};

export default socketMiddleware;
