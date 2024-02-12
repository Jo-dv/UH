import React, { useEffect, useCallback, useState } from "react";
import { useWebSocket } from "../../webSocket/UseWebSocket.js";
import useAccessors from "../../hooks/useAccessors";
import UseAccessorsStore from "../../store/UseAccessorsStore";
import useFriends from "../../hooks/useFriends";
import UseFriendsStore from "../../store/UseFriendsStore";
import useLobbyApiCall from "../../api/useLobbyApiCall";
import FriendRequestList from "./FriendRequestList";
import FriendDeleteModal from "../Modal/Lobby/FriendDeleteModal";

const FriendList = () => {
  const { accessorRefs } = useAccessors();
  const { accessors } = UseAccessorsStore();
  const { friendRefs } = useFriends();
  const { friends, setFriends } = UseFriendsStore();
  const [combinedList, setCombinedList] = useState([]);
  const { send } = useWebSocket();
  const [friendsNotInCommon, setFriendsNotInCommon] = useState([]);
  const { rejectFriends, listFriends } = useLobbyApiCall();
  const [showModal, setShowModal] = useState(false);
  const [deleted, setDelete] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  
  // 클릭된 친구의 닉네임을 선택하고 삭제 모달을 엽니다.
  const handleFriendDelete = (friend) => {
    setSelectedFriend(friend.userNickname);
    setSelectedFriendId(friend.friendsId);
    setDelete(true);
  };

  // 모달 닫기 함수
  const closeModal = (event) => {
    if (event.target === event.currentTarget) {
      setShowModal(false);
    }
  };


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

  // friends에서 가져온 friendsId 속성 추가
  setCombinedList(commonUsers.map(user => ({
      ...user,
      friendsId: acceptedFriends.find(friend => friend.userNickname === user.nickname)?.friendsId
  })));

  // commonUsers에 속하지 않는 Friends 리스트의 사용자들 필터링
  const friendsNotInCommonList = acceptedFriends.filter(friend => {
      return !commonUsers.some(user => user.nickname === friend.userNickname);
  });

  // friendsNotInCommon 업데이트
  setFriendsNotInCommon(friendsNotInCommonList);
  }, [accessors, friends]);

  return (
    <div className="relative">
      <div className="p-[16px] overflow-y-scroll h-[250px] scroll-smooth">
        <div className="w-1/2">
          <p>접속한 친구</p>
          {combinedList.map((friend, i) => (
            <div className="ml-[12px] mb-[4px] text-l text-gray-500" key={i}>
              <div>
                {selectedFriend === friend && (
                  <div className="absolute top-[30px] right-0 bg-white border border-gray-200 shadow-md rounded-md z-10">
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={async () => {
                      send({
                        type: "follow",
                        connectionId: friend.connectionId
                      });
                    }}>
                      따라가기
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleFriendDelete(friend)}>
                      삭제하기
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <p>미접속 친구</p>
          {friendsNotInCommon.map((friend, i) => (
            <div className="ml-[12px] mb-[4px] text-l" ref={friendRefs.current[i]} key={i}>
              <button className="text-gray-500" onClick={() => handleFriendDelete(friend)}>
                {friend.userNickname}
              </button>
              {deleted === true ? <FriendDeleteModal selectedFriend={selectedFriend} selectedFriendId={selectedFriendId} setModal={setDelete} /> : null}
            </div>
          ))}
          {showModal && (
            <div className="absolute top-80 left-150 w-full h-full flex justify-center items-center z-50" onClick={closeModal}>
              <div>
                <FriendRequestList />
              </div>
            </div>
          )}
          </div>
      </div>
      <div className="absolute bottom-0 right-0 z-999 mr-6">
            <button className="bg-tab10 hover:bg-[#95c75a] py-1 px-2 rounded-xl mr-1"
              onClick={() => {
                setShowModal(prevState => !prevState);
              }}
            >
            {showModal ? "닫기" : "요청"}
            </button>
          </div>
    </div>
  );
};

export default FriendList;
