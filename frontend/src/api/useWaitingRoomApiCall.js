import axios from "./axios.js";

const useWaitingRoomApiCall = () => {
  const roomUpdateUrl = `rooms`;

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
  return {
    putRoomsList,
  };
};

export default useWaitingRoomApiCall;
