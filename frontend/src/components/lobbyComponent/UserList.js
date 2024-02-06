import { useEffect, useState } from "react";

import FriendList from "../../components/lobbyComponent/FriendList";
import AccessorsList from "../../components/lobbyComponent/AccessorList";

const UserList = () => {
  // [친구 목록, 접속자 목록] 2개 토글
  const [toggleFriend, setToggleFriend] = useState(true);
  const [click, setClick] = useState(true);

  return (
    <>
      <div className="col-start-1 col-end-4 row-start-1 row-end-2 mt-2 p-2">
        <div className="flex items-center">
          <div
            className="text-center rounded-t-lg bg-tab11 ml-3 py-2 px-5 text-l transform origin-bottom transition duration-200 hover:scale-y-125"
            onClick={() => {
              setClick(true);
              setToggleFriend(true);
            }}
          >
            친구
          </div>
          <div
            className="text-center rounded-t-lg bg-tab11 py-2 px-5 text-l transform origin-bottom transition duration-200 hover:scale-y-125"
            onClick={() => {
              setClick(false);
              setToggleFriend(false);
            }}
          >
            접속자
          </div>
        </div>
      </div>
      <div className="col-start-1 col-end-4 row-start-2 row-end-8 mb-2 mx-2 p-3 rounded-2xl border bg-tab11">
        {toggleFriend === true ? <FriendList /> : <AccessorsList />}
      </div>
    </>
  );
};

export default UserList;
