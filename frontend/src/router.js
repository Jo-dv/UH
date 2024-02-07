import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Start from "./pages/Start";

import Lobby from "./pages/Lobby";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import SocialKakao from "./pages/Auth/socialKakao";
import Layout from "./components/layout";
import CreateNickname from "./pages/Auth/CreateNickname";
import Game from "./pages/Game";
import RoomId from "./pages/RoomId";

const route = (
  <>
    <Route path="/" element={<Start />}></Route>
    <Route path="game" element={<Game />}></Route>
    <Route element={<Layout />}>
      <Route path="room/:id" element={<RoomId />}></Route>
      <Route path="lobby" element={<Lobby />}></Route>
    </Route>
    <Route path="auth">
      <Route path="login" element={<Login />}></Route>
      <Route path="signup" element={<Signup />}></Route>
      <Route path="nickname" element={<CreateNickname />}></Route>
    </Route>
    <Route path="callback">
      <Route path="kakao" element={<SocialKakao />}></Route>
    </Route>
  </>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(route));
export default rootRouter;
