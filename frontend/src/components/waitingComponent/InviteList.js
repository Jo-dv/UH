import React, { useEffect, useState, useCallback } from "react";
import useAccessors from "../../hooks/useAccessors";
import UseAccessorsStore from "../../store/UseAccessorsStore";
import useFriends from "../../hooks/useFriends";
import UseFriendsStore from "../../store/UseFriendsStore";
import useLobbyApiCall from "../../api/useLobbyApiCall";
import useStore from "../../store/UserAuthStore.js";
import { useWebSocket } from "../../webSocket/UseWebSocket.js";



const InviteList = () => {
  const { accessorRefs } = useAccessors();
  const { accessors } = UseAccessorsStore();
  const { friendRefs } = useFriends();
  const { friends, setFriends } = UseFriendsStore();
  const [combinedList, setCombinedList] = useState([]);
  const { listFriends } = useLobbyApiCall();
  const { user } = useStore();
  const { send } = useWebSocket();

  // 친구 목록 갱신을 위한 함수 정의
  const updateFriendsList = useCallback(async () => {
    const friendsList = await listFriends();
    setFriends(friendsList);
  }, [listFriends, setFriends]);

  useEffect(() => {
    updateFriendsList();

    friendRefs.current = friends.map((_, i) => friendRefs.current[i] || React.createRef());

    // 요청 상태가 아닌 친구들의 리스트만 불러옴
    const acceptedFriends = friends.filter(friend => friend.friendsState === true);

    // Accessors와 Friends에서 동일한 닉네임을 가진 사용자 찾기
    const commonUsers = accessors.filter(accessor => {
      return acceptedFriends.some(friend => friend.userNickname === accessor.nickname);
    });

    // combinedList 업데이트
    setCombinedList(commonUsers);
  }, [accessors, friends]);

  return (
    <div>
      <div className="p-[16px] overflow-y-scroll h-full scroll-smooth">
        <div className="w-1/2">
          {combinedList.map((friend, i) => (
            <div className="ml-[12px] mb-[4px] text-l" ref={accessorRefs.current[i]} key={i}>
              <div>{friend.nickname}
                {/* {초대} */}
                <button className="ml-2" onClick={async () => {
                  send({
                    type: "invite",
                    fromNickname: user.userNickname,
                    toConnectionId: friend.connectionId
                  });
                }}>
                  invite</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default InviteList;
