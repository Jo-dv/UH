import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import App from '../App';
import Room from '../pages/Room';
import Lobby from '../pages/Lobby';
import Login from '../pages/Auth/Login';

const route = (
  <Route>
    <Route path='/' element={<App/>}></Route>
    <Route path='room' element={<Room/>}></Route>
    <Route path='lobby' element={<Lobby/>}></Route>
    <Route path='auth'>
      <Route path='login' element={<Login/>}></Route>
    </Route>
  </Route>
)

const rootRouter = createBrowserRouter(createRoutesFromElements(route));
export default rootRouter;