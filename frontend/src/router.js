import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Start from "./pages/Start";
import Room from "./pages/Room";
import Lobby from "./pages/Lobby";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Layout from "./components/layout";
import CreateNickname from "./pages/Auth/CreateNickname";
import Game from "./pages/Game";

const route = (
<<<<<<< HEAD
  <>
    <Route path="/" element={<Start />}></Route>
    <Route path="game" element={<Game />}></Route>
    <Route element={<Layout />}>
      <Route path="room" element={<Room />}></Route>
      <Route path="lobby" element={<Lobby />}></Route>
      <Route path="auth">
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="nickname" element={<CreateNickname />}></Route>
      </Route>
    </Route>
  </>
=======
    <>
        <Route path="/" element={<Start />}></Route>
        <Route path="game" element={<Game />}></Route>
        <Route element={<Layout />}>
            <Route path="room" element={<Room />}></Route>
            <Route path="lobby" element={<Lobby />}></Route>
            <Route path="auth">
                <Route path="login" element={<Login />}></Route>
                <Route path="signup" element={<Signup />}></Route>
                <Route path="nickname" element={<CreateNickname />}></Route>
            </Route>
        </Route>
    </>
>>>>>>> fe_dev
);

const rootRouter = createBrowserRouter(createRoutesFromElements(route));
export default rootRouter;
