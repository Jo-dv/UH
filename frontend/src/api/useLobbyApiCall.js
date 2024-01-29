import axios from "axios";

const useLobbyApiCall = () => {
  const baseUrl = "http://localhost:5000/";
  const roomsListUrl = `${baseUrl}rooms`;
  const searchRoomsUrl = `${baseUrl}searchrooms`;
  const userListUrl = `${baseUrl}user`;
  const userCheckUrl = `${baseUrl}user/check`;

  // roomList 목록
  const getRoomsList = async () => {
    try {
      const response = await axios.get(roomsListUrl);
      const roomsList = response.data;
      return roomsList;
    } catch (error) {
      console.error("roomsList를 불러오는 데, 알 수 없는 에러가 발생했습니다.", error);
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
      console.error("searchRooms를 불러오는 데,알 수 없는 에러가 발생했습니다.", error);
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
      console.error("userList를 불러오는 데,알 수 없는 에러가 발생했습니다.", error);
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

  return {
    getRoomsList,
    getSearchRooms,
    getUserList,
    getUserCheck,
  };
};

export default useLobbyApiCall;
