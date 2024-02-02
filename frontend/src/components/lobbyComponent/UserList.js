import { useEffect, useState } from "react";

import FriendList from "../../components/lobbyComponent/FriendList";
import AccessorsList from "../../components/lobbyComponent/AccessorList";

const UserList = () => {
  // [친구 목록, 접속자 목록] 2개 토글
  const [toggleFriend, setToggleFriend] = useState(true);
  console.log("---------");

  return (
    <>
      <div className="col-start-1 col-end-2 row-start-1 row-end-2 m-2 p-2">
        <div className="flex items-center">
          <div
            className="mr-3"
            onClick={() => {
              setToggleFriend(true);
            }}
          >
            친구
          </div>
          <div
            onClick={() => {
              setToggleFriend(false);
            }}
          >
            접속자
          </div>
        </div>
      </div>
      <div className="border-7 border-modalBorder col-start-1 col-end-2 row-start-2 row-end-8 m-2 p-2 divide-gray-500 rounded-3xl border">
        {toggleFriend === true ? <FriendList /> : <AccessorsList />}
      </div>
    </>
  );
};

export default UserList;
