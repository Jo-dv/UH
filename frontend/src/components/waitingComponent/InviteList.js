import React, { useEffect, useState, useCallback, useRef } from "react";
import useAccessors from "../../hooks/useAccessors";
import UseAccessorsStore from "../../store/UseAccessorsStore";
import useFriends from "../../hooks/useFriends";
import UseFriendsStore from "../../store/UseFriendsStore";
import useLobbyApiCall from "../../api/useLobbyApiCall";
import useStore from "../../store/UserAuthStore.js";
import { useWebSocket } from "../../webSocket/UseWebSocket.js";
import useClick from "../../hooks/useClick";

const InviteList = (props) => {
  const { accessorRefs } = useAccessors();
  const { accessors } = UseAccessorsStore();
  const { friendRefs } = useFriends();
  const { friends, setFriends } = UseFriendsStore();
  const [combinedList, setCombinedList] = useState([]);
  const { listFriends } = useLobbyApiCall();
  const { user } = useStore();
  const { send } = useWebSocket();
  const modalRef = useRef(null);
  const buttonRef = useRef(null);
  const [buttonText, setButtonText] = useState("초대");
  const [buttonColor, setButtonColor] = useState("bg-tab10");
  const [isInvited, setIsInvited] = useState(false);
  const [invitedStatus, setInvitedStatus] = useState({});
  const { playClick } = useClick();

  const sendInvite = async (friend) => {
    if (!invitedStatus[friend.nickname]) {
      await send({
        type: "invite",
        fromNickname: user.userNickname,
        toConnectionId: friend.connectionId,
      });

      // 특정 친구의 초대 상태를 업데이트
      setInvitedStatus((prevStatus) => ({
        ...prevStatus,
        [friend.nickname]: true,
      }));
    }
  };
  // // 친구 목록 갱신을 위한 함수 정의
  // const updateFriendsList = useCallback(async () => {
  //   const friendsList = await listFriends();
  //   setFriends(friendsList);
  // }, [listFriends, setFriends]);

  useEffect(() => {
    // updateFriendsList();

    friendRefs.current = friends.map((_, i) => friendRefs.current[i] || React.createRef());

    // 요청 상태가 아닌 친구들의 리스트만 불러옴
    const acceptedFriends = friends.filter((friend) => friend.friendsState === true);

    // Accessors와 Friends에서 동일한 닉네임을 가진 사용자 찾기
    const commonUsers = accessors.filter((accessor) => {
      return acceptedFriends.some((friend) => friend.userNickname === accessor.nickname);
    });

    // combinedList 업데이트
    setCombinedList(commonUsers);
  }, [accessors, friends]);

  // // 모달 외부 클릭 감지
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       props.setShowInviteList &&
  //       modalRef.current &&
  //       !modalRef.current.contains(event.target) &&
  //       !buttonRef.current.contains(event.target)
  //     ) {
  //       props.setShowInviteList(false); // 모달 외부 클릭 시 모달 닫기
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [props.setShowInviteList]);

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div
          className="relative z-40 bg-white rounded-3xl border-gray-200 border shadow-lg p-5 md:p-6 mx-2"
          style={{ width: "300px", height: "300px" }}
          ref={modalRef}
        >
          <p className="text-xl text-center">접속중인 친구</p>
          <hr className="border border-gray-300 my-3" />
          <div style={{ maxHeight: "200px", overflowY: "auto" }}>
            {combinedList.map((friend, i) => (
              <div key={i}>
                {/* key를 div에 적용 */}
                <div className="flex items-center justify-between" ref={accessorRefs.current[i]}>
                  <div className="flex-grow pl-4">{friend.nickname}</div>
                  <div className="flex pr-4">
                    <button
                      className={`py-1 px-2 rounded-xl mr-1 ${invitedStatus[friend.nickname]
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-tab10 hover:bg-[#95c75a]"
                        }`}
                      onClick={() => { sendInvite(friend); playClick(); }}
                    // disabled={invitedStatus[friend.userNickname]} // 특정 친구의 초대 상태를 기반으로 비활성화 상태 결정
                    >
                      {invitedStatus[friend.nickname] ? "요청보냄" : "초대하기"}
                    </button>
                  </div>
                </div>
                {i !== combinedList.length - 1 && (
                  <hr className="border-1 border-gray-300 my-1 w-full" />
                )}
              </div>
            ))}
          </div>
          {combinedList.length === 0 && (
            <div>
              <p className="text-center">현재 접속중인 친구가 없습니다</p>
            </div>
          )}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 pb-5">
            <button
              ref={buttonRef}
              onClick={() => { props.setShowInviteList(); playClick(); }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-xl"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InviteList;
