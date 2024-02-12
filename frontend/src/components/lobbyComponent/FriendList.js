import React, { useEffect, useState, useCallback } from "react";
import useAccessors from "../../hooks/useAccessors";
import UseAccessorsStore from "../../store/UseAccessorsStore";
import useFriends from "../../hooks/useFriends";
import UseFriendsStore from "../../store/UseFriendsStore";
import useLobbyApiCall from "../../api/useLobbyApiCall";
import { useWebSocket } from "../../webSocket/UseWebSocket.js";


const FriendList = () => {
    const { accessorRefs } = useAccessors();
    const { accessors } = UseAccessorsStore();
    const { friendRefs } = useFriends();
    const { friends, setFriends } = UseFriendsStore();
    const [combinedList, setCombinedList] = useState([]);
    const [friendsNotInCommon, setFriendsNotInCommon] = useState([]);
    const { rejectFriends, listFriends } = useLobbyApiCall();
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
        <div>
            <div className="p-[16px] overflow-y-scroll h-full scroll-smooth">
                <div className="w-1/2">
                    {combinedList.map((friend, i) => (
                        <div className="ml-[12px] mb-[4px] text-l" ref={accessorRefs.current[i]} key={i}>
                            <div>{friend.nickname}
                                {/* 따라가기 */}
                                <button className="ml-2" onClick={async () => {
                                    send({
                                        type: "follow",
                                        connectionId: friend.connectionId
                                    });
                                }}>
                                    follow</button>
                                {/* 친구 삭제 기능 드롭다운으로든 버튼으로든 디자인 필요 */}
                                <button className="ml-2" onClick={async () => {
                                    if (window.confirm("삭제하시겠습니까")) {
                                        await rejectFriends(friend.friendsId);
                                    }
                                }}>
                                    x</button></div>
                        </div>
                    ))}
                    {friendsNotInCommon.map((friend, i) => (
                        <div className="ml-[12px] mb-[4px] text-l" ref={friendRefs.current[i]} key={i}>
                            <div style={{ color: "gray" }}>{friend.userNickname}
                                {/* 친구 삭제 기능 드롭다운으로든 버튼으로든 디자인 필요 */}
                                <button className="ml-2" onClick={async () => {
                                    if (window.confirm("삭제하시겠습니까")) {
                                        await rejectFriends(friend.friendsId);
                                    }
                                }}>
                                    x</button></div> {/* 회색 텍스트 */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FriendList;
