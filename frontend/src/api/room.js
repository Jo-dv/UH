import axios from "axios";

const baseURL = "http://localhost:5000";
/**
 *
 * @param {*} customSessionId create | String
 * @param {*} roomName String
 * @param {*} roomPassword null | String
 */
export const createRoom = async (
  customSessionId = "create",
  roomName = "E201",
  roomPassword = null
) => {
  try {
    const response = await axios.post(`${baseURL}/rooms`, {
      customSessionId: customSessionId,
      roomName: roomName,
      roomPassword: roomPassword,
      gameCategory: 101,
      quizCategory: 201,
      max: 8,
    });

    console.log(response.data);
    // 여기서 response.data를 사용하여 필요한 작업 수행
  } catch (error) {
    console.error("방 생성/입장 요청 중 오류 발생:", error);
  }
};
