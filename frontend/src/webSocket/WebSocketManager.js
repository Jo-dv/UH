const WebSocketManager = () => {
  let socket = null;
  let connected = false;

  const connect = (url, onOpen, onMessage, onClose) => {
    socket = new WebSocket(url);

    socket.onopen = () => {
      connected = true;
      if (onOpen) onOpen();
    };

    socket.onmessage = (event) => {
      if (onMessage) onMessage(event);
    };

    socket.onclose = () => {
      connected = false;
      if (onClose) onClose();
    };
  };

  const send = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  };

  const close = () => {
    if (socket) {
      socket.close();
    }
  };

  return { connect, send, close };
};

export default WebSocketManager;
