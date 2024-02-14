import React, { useEffect, useCallback, useRef, useState } from "react";
import { useWebSocket } from "../../webSocket/UseWebSocket.js";
import useAccessors from "../../hooks/useAccessors";
import UseAccessorsStore from "../../store/UseAccessorsStore";
import useFriends from "../../hooks/useFriends";
import UseFriendsStore from "../../store/UseFriendsStore";
import UseFriendRequestStore from "../../store/UseFriendRequestStore";
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
  const [onlineFreindDropdown, setOnlineFreindDropdown] = useState(false);
  const [offlineFreindDropdown, setOfflineFreindDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const {requestList, setRequestList} = UseFriendRequestStore();
  const modalRef = useRef(null);
  
  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOnlineFreindDropdown(null); // 온라인 드롭다운을 닫음
        setOfflineFreindDropdown(null); // 오프라인 드롭다운을 닫음
      }
    };

    // 클릭 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 클린업 함수에서 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 모달 외부 클릭  감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showModal && modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false); // 모달 외부 클릭 시 모달 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  // 친구 삭제 모달
  const handleFriendDelete = (friend) => {
    setSelectedFriend(friend.userNickname);
    setSelectedFriendId(friend.friendsId);
    setDelete(true);
  };

  // 요청 모달 닫기
  const closeModal = (event) => {
    if (event.target === event.currentTarget) {
      setShowModal(false);
    }
  };

  // 온라인 친구 드롭다운
  const onlineDropdown = (friend) => {
    if (onlineFreindDropdown === friend.nickname) {
      setOnlineFreindDropdown(null);
    } else {
      setOnlineFreindDropdown(friend.nickname);
    }
  };

  // 오프라인 친구 드롭다운
  const offlineDropdown = (friend) => {
    if (offlineFreindDropdown === friend.userNickname) {
      setOfflineFreindDropdown(null);
    } else {
      setOfflineFreindDropdown(friend.userNickname);
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
    const acceptedFriends = friends.filter((friend) => friend.friendsState === true);

    // Accessors와 Friends에서 동일한 닉네임을 가진 사용자 찾기
    const commonUsers = accessors.filter((accessor) => {
      return acceptedFriends.some((friend) => friend.userNickname === accessor.nickname);
    });

    // combinedList 업데이트
    setCombinedList(commonUsers);

    // friends에서 가져온 friendsId 속성 추가
    setCombinedList(
      commonUsers.map((user) => ({
        ...user,
        friendsId: acceptedFriends.find((friend) => friend.userNickname === user.nickname)
          ?.friendsId,
      }))
    );

    // commonUsers에 속하지 않는 Friends 리스트의 사용자들 필터링
    const friendsNotInCommonList = acceptedFriends.filter((friend) => {
      return !commonUsers.some((user) => user.nickname === friend.userNickname);
    });

    // friendsNotInCommon 업데이트
    setFriendsNotInCommon(friendsNotInCommonList);

    // friendRefs.current = friends.map((_, i) => friendRefs.current[i] || React.createRef());

    // 친구 요청 리스트를 불러옴
    const requestedFriends = friends.filter((friend) => friend.friendsState === false);

    setRequestList(requestedFriends);
  }, [accessors, friends]);

  return (
    <div className="relative">
      <div className="p-[16px] overflow-y-scroll h-[250px] scroll-smooth">
        <div className="w-full">
          <p style={{ fontFamily: "var(--font-extrabold)" }}>접속한 친구</p>
          {combinedList &&
            combinedList.map((friend, i) => (
              <div className="ml-[12px] mb-[4px] text-l" ref={accessorRefs.current[i]} key={i}>
                <div className="relative inline-block">
                  <button
                    onClick={() => onlineDropdown(friend)}
                    aria-expanded={onlineFreindDropdown === friend ? "true" : "false"}
                    aria-haspopup="true"
                  >
                    {friend.nickname}
                  </button>
                  {onlineFreindDropdown === friend.nickname && (
                    <div
                      ref={dropdownRef}
                      className="absolute ml-5 z-10 w-[87px] bg-white bg-opacity-95 rounded-2xl border-gray-200 border shadow-lg"
                    >
                      <button
                        className="text-gray-700 text-sm block px-4 py-1 w-full text-left hover:bg-gray-100 rounded-t-2xl"
                        onClick={async () => {
                          send({
                            type: "follow",
                            connectionId: friend.connectionId,
                          });
                        }}
                      >
                        따라가기
                      </button>
                      <hr></hr>
                      <div
                        className="text-gray-700 text-sm block px-4 py-1 text-sm w-full text-left hover:bg-gray-100 rounded-b-2xl"
                        onClick={() => handleFriendDelete(friend)}
                      >
                        <button onClick={() => handleFriendDelete(friend)}>삭제하기</button>
                      </div>
                    </div>
                  )}
                </div>
                {deleted === true && selectedFriendId === friend.friendsId ? (
                  <FriendDeleteModal
                    selectedFriend={selectedFriend}
                    selectedFriendId={selectedFriendId}
                    setModal={setDelete}
                  />
                ) : null}
              </div>
            ))}
          <hr className="border-orange-900 my-2"></hr>
          <p style={{ fontFamily: "var(--font-extrabold)" }}>미접속 친구</p>
          {friendsNotInCommon &&
            friendsNotInCommon.map((friend, i) => (
              <div className="ml-[12px] mb-[4px] text-l" ref={friendRefs.current[i]} key={i}>
                <div className="relative inline-block">
                  <button
                    className="text-gray-500"
                    onClick={() => offlineDropdown(friend)}
                    aria-expanded={offlineFreindDropdown === friend ? "true" : "false"}
                    aria-haspopup="true"
                  >
                    {friend.userNickname}
                  </button>
                  {offlineFreindDropdown === friend.userNickname && (
                    <div
                      ref={dropdownRef}
                      className="absolute ml-5 z-10 w-[87px] bg-white bg-opacity-95 rounded-2xl border-gray-200 border shadow-lg"
                    >
                      <div
                        className="text-gray-700 text-sm block px-4 py-1 text-sm w-full text-left hover:bg-gray-100 rounded-b-2xl"
                        onClick={() => handleFriendDelete(friend)}
                      >
                        <button onClick={() => handleFriendDelete(friend)}>삭제하기</button>
                      </div>
                    </div>
                  )}
                </div>
                {deleted === true && selectedFriendId === friend.friendsId ? (
                  <FriendDeleteModal
                    selectedFriend={selectedFriend}
                    selectedFriendId={selectedFriendId}
                    setModal={setDelete}
                  />
                ) : null}
              </div>
            ))}
        </div>
        <div className="absolute bottom-0 right-0 z-999 mr-6">
          <div className="relative mb-2">
            <button
              className="bg-tab10 hover:bg-[#95c75a] py-1 px-2 rounded-xl mr-1 w-10"
              onClick={() => {
                setShowModal((prevState) => !prevState);
              }}
            >
              {showModal ? "✖" : "🔔"}
              {requestList.length > 0 && (
                // requestListLength가 0보다 클 때 뱃지 표시
                <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {requestList.length}
                </span>
              )}
            </button>
          </div>
          {showModal && (
            <div
              className="absolute ml-10 h-full flex justify-center items-center z-50"
              onClick={closeModal}
              ref={modalRef}
            >
              <div>
                <FriendRequestList/>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendList;
