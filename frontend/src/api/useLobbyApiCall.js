import axios from "axios";

const useLobbyApiCall = () => {
  const baseUrl = "http://localhost:5000/";
  const roomsListUrl = `${baseUrl}rooms`;
  const searchRoomsUrl = `${baseUrl}searchrooms`;
  const userListUrl = `${baseUrl}user`;
  const userCheckUrl = `${baseUrl}user/check`;
  const rankAllUrl = `${baseUrl}rank`;
  const rankPersonUrl = `${baseUrl}rank/person`;
  const rankShoutUrl = `${baseUrl}rank/shout`;
  const rankSoloUrl = `${baseUrl}rank/solo`;

  // roomList 목록
  const getRoomsList = async () => {
    try {
      const response = await axios.get(roomsListUrl);
      const roomsList = response.data;
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

  return {
    getRoomsList,
    getSearchRooms,
    getUserList,
    getUserCheck,
    getRankAllList,
    getRankPerson,
    getRankShout,
    getRankSolo,
  };
};

export default useLobbyApiCall;
