import axios from "./axios";

const useLobbyApiCall = () => {
  const roomsListUrl = `rooms`;
  const searchRoomsUrl = `searchrooms`;
  const userListUrl = `user`;
  const userCheckUrl = `user/check`;
  const rankAllUrl = `rank`;
  const rankPersonUrl = `rank/person`;
  const rankShoutUrl = `rank/shout`;
  const rankSoloUrl = `rank/solo`;
  const checkPasswordUrl = `password`;
  const friendsUrl = `friends`;

  // roomList 목록
  const getRoomsList = async () => {
    try {
      const response = await axios.get(roomsListUrl);
      const roomsList = response.data;
      // console.log(roomsList);
      return roomsList;
    } catch (error) {
      console.error("roomsList 확인 중 에러 발생", error);
      throw error;
    }
  };

  // searchRooms 목록
  const getSearchRooms = async () => {
    try {
      const response = await axios.get(searchRoomsUrl);
      const searchRooms = response.data;
      return searchRooms;
    } catch (error) {
      console.error("searchRooms 확인 중 에러 발생", error);
      throw error;
    }
  };

  // 유저 목록
  const getUserList = async () => {
    try {
      const response = await axios.get(userListUrl);
      const userList = response.data;
      return userList;
    } catch (error) {
      console.error("userList 확인 중 에러 발생", error);
      throw error;
    }
  };

  // user check
  const getUserCheck = async () => {
    try {
      const response = await axios.get(userCheckUrl);
      const userCheck = response.data;
      return userCheck;
    } catch (error) {
      console.error("사용자 인증 확인 중 에러 발생", error);
      // throw error;
    }
  };

  // [랭킹] 전체 랭킹 목록
  const getRankAllList = async () => {
    try {
      const response = await axios.get(rankAllUrl);
      const rankAllList = response.data;
      return rankAllList;
    } catch (error) {
      console.error("전체 랭킹 목록 확인 중 에러 발생", error);
      throw error;
    }
  };

  // [랭킹] 인물 맞추기 게임 랭킹 목록
  const getRankPerson = async () => {
    try {
      const response = await axios.get(rankPersonUrl);
      const rankPersonList = response.data;
      return rankPersonList;
    } catch (error) {
      console.error("인물 맞추기 게임 랭킹 목록 확인 중 에러 발생", error);
      throw error;
    }
  };
  // [랭킹] 고요 속의 외침 게임 랭킹 목록
  const getRankShout = async () => {
    try {
      const response = await axios.get(rankShoutUrl);
      const rankShoutList = response.data;
      return rankShoutList;
    } catch (error) {
      console.error("고요 속의 외침 게임 랭킹 목록 확인 중 에러 발생", error);
      throw error;
    }
  };

  // [랭킹] 개인 랭킹 목록
  const getRankSolo = async () => {
    try {
      const response = await axios.get(rankSoloUrl);
      const rankSoloList = response.data;
      return rankSoloList;
    } catch (error) {
      console.error("개인 랭킹 목록 확인 중 에러 발생", error);
      throw error;
    }
  };

  // 마이페이지 정보
  const getMyPageInfo = async (userSeq) => {
    try {
      const response = await axios.get(`mypage/${userSeq}`);
      const myPageInfo = response.data;
      return myPageInfo;
    } catch (error) {
      console.error("마이페이지 정보 확인 중 에러 발생", error);
      throw error;
    }
  };

  // [방 입장] 방 비밀번호 일치 확인
  const postCheckPassword = async (sessionId, roomPassword) => {
    try {
      const response = await axios.post(checkPasswordUrl, {
        sessionId: sessionId,
        enterPassword: roomPassword,
      });
      const checkPassword = response.data;
      return checkPassword;
    } catch (error) {
      console.error("방 비밀번호 일치 확인 중 에러 발생", error);
      throw error;
    }
  };

  // 친구 목록 확인 
  const listFriends = async () => {
    try {
      const response = await axios.get(friendsUrl);
      const friendsList = response.data;
      return friendsList;
    } catch (error) {
      console.error("비정상적인 접근", error);
      throw error;
    }
  };

  //친구 요청을 수락
  const acceptFriends = async (friendsId) => {
    try {
      await axios.put(friendsUrl + `/${friendsId}`);
    } catch (error) {
      console.error("비정상적인 접근", error);
      throw error;
    }
  };

  //친구 요청을 거절
  const rejectFriends = async (friendsId) => {
    try {
      await axios.delete(friendsUrl + `/${friendsId}`);
    } catch (error) {
      console.error("비정상적인 접근", error);
      throw error;
    }
  };

  //친구 요청 보내기
  const requestFriends = async (toUserSeq) => {
    try {
      await axios.post(friendsUrl, { toUserSeq: toUserSeq });
      alert("친구 요청 완료");
    } catch (error) {
      if (error.response.status === 400) {
        alert("이미 요청되었거나 친구 상태입니다.");
      } else {
        console.error("비정상적인 접근", error);
        throw error;
      }
    }
  };


  return {
    getRoomsList,
    getSearchRooms,
    getUserList,
    getUserCheck,
    getRankAllList,
    getRankPerson,
    getRankShout,
    getRankSolo,
    getMyPageInfo,
    postCheckPassword,
    listFriends,
    acceptFriends,
    rejectFriends,
    requestFriends,
  };
};

export default useLobbyApiCall;
