import axios from "./axios.js";

const useWaitingRoomApiCall = () => {
  const roomUpdateUrl = `rooms`;
  const roomInfoUrl = `rooms/`;

  // roomList 목록 수정
  const putRoomsList = async (roomInfo) => {
    try {
      const response = await axios.put(roomUpdateUrl, roomInfo);
      const roomUpdateInfo = response.data;
      return roomUpdateInfo;
    } catch (error) {
      console.error("방 설정 업데이트 중 에러 발생", error);
      throw error;
    }
  };
  // 방정보 조회
  const getRoomInfo = async (sessionId) => {
    try {
      const response = await axios.get(roomInfoUrl + sessionId);
      const roomInfo = response.data;
      return roomInfo;
    } catch (error) {
      console.log("방 정보 조회 중 에러 발생", error);
      throw error;
    }
  };
  return {
    putRoomsList,
    getRoomInfo,
  };
};

export default useWaitingRoomApiCall;
