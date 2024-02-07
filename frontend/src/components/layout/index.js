import { Outlet } from "react-router-dom";
import Header from "./Header.js";
import { WebSocketProvider } from "../../webSocket/UseWebSocket.js";
const Layout = () => {
  return (
    <WebSocketProvider>
    <>
      <Header />
      <Outlet />
    </>
    </WebSocketProvider>
  );
};

export default Layout;
