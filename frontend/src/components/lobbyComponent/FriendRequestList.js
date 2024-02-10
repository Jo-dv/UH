import React, { useEffect, useCallback, useState } from "react";
import useFriends from "../../hooks/useFriends";
import UseFriendsStore from "../../store/UseFriendsStore";
import useLobbyApiCall from "../../api/useLobbyApiCall";

const FriendRequestList = () => {
  const { friendRefs } = useFriends();
  const { friends, setFriends } = UseFriendsStore();
  const { acceptFriends, rejectFriends, listFriends } = useLobbyApiCall();
  const [requestList, setRequestList] = useState([]);


  // 친구 목록 갱신을 위한 함수 정의
  const updateFriendsList = useCallback(async () => {
    const friendsList = await listFriends();
    setFriends(friendsList);
  }, [listFriends, setFriends]);

  useEffect(() => {
    updateFriendsList();
    
    friendRefs.current = friends.map((_, i) => friendRefs.current[i] || React.createRef());

    // 친구 요청 리스트를 불러옴
    const requestedFriends = friends.filter(friend => friend.friendsState === false);

    setRequestList(requestedFriends);
  }, [friends]);



  return (
    <div className="p-[16px] overflow-y-scroll h-full scroll-smooth">
      <div className="w-1/2">
        {requestList.map((friend, i) => (
          <div
            className="ml-[12px] mb-[4px] text-l"
            ref={(el) => (friendRefs.current[i] = el)}
            key={i}
          >
            {friend.userNickname}
            {/* 친구 요청 수락,거절 기능 드롭다운으로든 버튼으로든 디자인 필요 */}
            <button onClick={async () => { await acceptFriends(friend.friendsId); }}>수락</button>
            <button onClick={async () => { await rejectFriends(friend.friendsId); }}>거절</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRequestList;
