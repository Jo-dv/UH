import React, { useEffect, useCallback, useState } from "react";
import useFriends from "../../hooks/useFriends";
import UseFriendsStore from "../../store/UseFriendsStore";
import useLobbyApiCall from "../../api/useLobbyApiCall";
import FriendRequestList from "./FriendRequestList";
import FriendDeleteModal from "../Modal/Lobby/FriendDeleteModal";

const FriendList = () => {
  const { friendRefs } = useFriends();
  const { friends, setFriends } = UseFriendsStore();
  const { rejectFriends, listFriends } = useLobbyApiCall();
  const [showModal, setShowModal] = useState(false);
  const [deleted, setDelete] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // 클릭된 친구의 닉네임을 선택하고 삭제 모달을 엽니다.
  const handleFriendDelete = (friend) => {
    setSelectedFriend(friend.userNickname);
    setSelectedFriendId(friend.friendsId);
    setDelete(true);
  };

  // 친구 목록 갱신을 위한 함수 정의
  const updateFriendsList = useCallback(async () => {
    const friendsList = await listFriends();
    setFriends(friendsList);
  }, [listFriends, setFriends]);

  useEffect(() => {
    friendRefs.current = friends.map((_, i) => friendRefs.current[i] || React.createRef());
  }, [friends]);

  // 요청 상태가 아닌 친구들의 리스트만 불러옴
  const acceptedFriends = friends.filter(friend => friend.friendsState === true);

  // 모달 닫기 함수
  const closeModal = () => {
    setShowModal(false);
  };


  return (
    <div className="relative p-[16px] overflow-y-scroll h-full scroll-smooth">
      <div className="w-1/2">
        {acceptedFriends.map((friend, i) => (
          <div
            className="ml-[12px] mb-[4px] text-l"
            ref={(el) => (friendRefs.current[i] = el)}
            key={i}
          >
            <button onClick={() => handleFriendDelete(friend)}>
              {friend.userNickname}
            </button>
            {deleted === true ? <FriendDeleteModal selectedFriend={selectedFriend} selectedFriendId={selectedFriendId} setModal={setDelete} /> : null}
        </div>
        ))}
        {showModal && (
          <div className="fixed top-0 right-30 w-full h-full flex justify-center items-center z-50" onClick={closeModal}>
            <div>
              <FriendRequestList />
            </div>
          </div>
        )}
        <div className="absolute bottom-0 right-0 z-999">
          <button className="bg-tab10 hover:bg-[#95c75a] py-1 px-2 rounded-xl mr-1"
            onClick={() => {
              setShowModal(prevState => !prevState);
            }}
          >
            {showModal ? "닫기" : "요청"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendList;
