import { useEffect, useState } from "react";

import FriendList from "../../components/lobbyComponent/FriendList";
import AccessorsList from "../../components/lobbyComponent/AccessorList";

const UserList = () => {
  // [친구 목록, 접속자 목록] 2개 토글
  const [toggleFriend, setToggleFriend] = useState(true);
  const [click, setClick] = useState(true);

  return (
    <>
      <div className="col-start-1 col-end-4 row-start-1 row-end-2 p-3">
        <div className="flex items-center">
          <button
            className={`text-center rounded-t-lg ${
              toggleFriend === true ? "bg-tab11" : "bg-tab9"
            } hover:bg-tab11 ml-[12px] pt-[8px] px-[20px] text-xl transform origin-bottom transition duration-200 hover:scale-y-125`}
            onClick={() => {
              setClick(true);
              setToggleFriend(true);
            }}
          >
            친구
          </button>
          <button
            className={`text-center rounded-t-lg ${
              toggleFriend === false ? "bg-tab11" : "bg-tab9"
            } hover:bg-tab11 pt-[8px] px-[20px] text-xl transform origin-bottom transition duration-200 hover:scale-y-125`}
            onClick={() => {
              setClick(false);
              setToggleFriend(false);
            }}
          >
            접속자
          </button>
        </div>
      </div>
      <div className="col-start-1 col-end-4 row-start-2 row-end-8 mb-[8px] mx-[8px] p-[12px] rounded-2xl border-t-2 border-tab11 bg-tab11">
        {toggleFriend === true ? <FriendList /> : <AccessorsList />}
      </div>
    </>
  );
};

export default UserList;
