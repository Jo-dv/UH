import React, { useState } from "react";
import useFriends from "../../hooks/useFriends";

const FriendList = () => {
  const { friendRefs } = useFriends();
  const [friends, setFriends] = useState([
    "박정인",
    "박아림",
    "황희경",
    "박수빈",
    "유영준",
    "신현중",
    "조우재",
    "황채원",
    "이성완",
    "박나린",
  ]);

  friendRefs.current = friends.map((_, i) => friendRefs.current[i] || React.createRef());

  return (
    <div className="m-1 overflow-y-scroll h-[34vh]">
      <div className="w-1/2 stretch m-3 ">
        {friends.map((friend, i) => (
          <div className="ml-3 mb-1" ref={(el) => (friendRefs.current[i] = el)} key={i}>
            {friend}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
