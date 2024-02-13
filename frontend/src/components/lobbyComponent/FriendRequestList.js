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
    friendRefs.current = friends.map((_, i) => friendRefs.current[i] || React.createRef());

    // 친구 요청 리스트를 불러옴
    const requestedFriends = friends.filter((friend) => friend.friendsState === false);

    setRequestList(requestedFriends);
  }, [friends]);

  return (
    <div
      className="z-1000 bg-white bg-opacity-95 rounded-3xl border-gray-200 border shadow-lg p-5 md:p-6 mx-2 z-999"
      style={{ width: "300px", height: "350px", zIndex: 9999 }}
    >
      <p className="text-xl text-center">받은 친구요청</p>
      <hr className="border border-gray-300 my-3" />
      <div style={{ maxHeight: "250px", overflowY: "auto" }}>
        {requestList.map((friend, i) => (
          <div ref={(el) => (friendRefs.current[i] = el)} key={i}>
            <div className="flex items-center justify-between">
              <div className="flex-grow">{friend.userNickname}</div>
              <div className="flex">
                <button
                  onClick={async () => {
                    await acceptFriends(friend.friendsId);
                    updateFriendsList();
                  }}
                  className="bg-tab10 hover:bg-[#95c75a] py-1 px-2 rounded-xl mr-1"
                >
                  수락
                </button>
                <button
                  onClick={async () => {
                    await rejectFriends(friend.friendsId);
                    updateFriendsList();
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-2 rounded-xl"
                >
                  거절
                </button>
              </div>
            </div>
            {i !== requestList.length - 1 && (
              <hr className="border-1 border-gray-300 my-1 w-full" />
            )}
          </div>
        ))}
      </div>
      {requestList.length === 0 && (
        <div>
          <p className="text-center">받은 요청이 없습니다</p>
        </div>
      )}
    </div>
  );
};

export default FriendRequestList;
