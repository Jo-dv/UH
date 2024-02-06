import React, { useEffect } from "react";
import useFriends from "../../hooks/useFriends";
import UseFriendsStore from "../../store/UseFriendsStore";

const FriendList = () => {
  const { friendRefs } = useFriends();
  const { friends } = UseFriendsStore();

  useEffect(() => {
    friendRefs.current = friends.map((_, i) => friendRefs.current[i] || React.createRef());
  }, [friends]);

  return (
    <div className="p-4 overflow-y-scroll h-full scroll-smooth">
      <div className="w-1/2">
        {friends.map((friend, i) => (
          <div className="ml-3 mb-1 text-l" ref={(el) => (friendRefs.current[i] = el)} key={i}>
            {friend}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
