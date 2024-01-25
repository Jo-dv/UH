import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000/";

/**
 * 방 생성 & 입장
 * @param {string} sessionId 생성시: 'create'
 * @param {string} roomName
 * @param {string} roomPassword
 * @returns sessionId
 */
export const createSession = async (sessionId, roomName = "방이름", roomPassword = null) => {
  try {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "rooms",
      {
        customSessionId: sessionId,
        roomName: roomName,
        roomPassword: roomPassword,
        gameCategory: 100,
        quizCategory: 100,
        max: 8,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    // console.log("방만들기", response.data);
    // 성공적인 응답의 경우 sessionId 반환
    return response.data;
  } catch (error) {
    // 오류 발생 시
    if (error.response && error.response.status === 400) {
      // HTTP 응답 코드가 400인 경우
      alert("비밀번호를 확인해주세요.");
    } else {
      // 그 외의 경우에 대한 일반적인 에러 처리
      console.error("Error:", error.message);
    }

    // 실패한 경우 null 반환 또는 다른 방식으로 처리
    return null;
  }
};

/**
 * openvidu가 생성한 토큰 서버로 전송
 * @param {string} sessionId
 * @returns token
 */
export const createToken = async (sessionId) => {
  const response = await axios.post(
    APPLICATION_SERVER_URL + "tokens/" + sessionId,
    {},
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data; // The token
};

/**
 * 방 진입 후 플레이어 추가
 * @param {string} sessionId
 * @param {string} connectionId
 * @param {number} userSeq
 * @param {string} userNickname
 * @param {boolean} isHost
 */
export const addPlayer = async (sessionId, connectionId, userSeq, userNickname, isHost) => {
  console.log("플레이어추가 진행함", sessionId, connectionId, userSeq, userNickname, isHost);
  try {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "players",
      {
        sessionId: sessionId,
        connectionId: connectionId,
        userSeq: userSeq,
        userNickname: userNickname,
        isHost: isHost,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response.data); // "방에 입장했습니다."
  } catch (error) {
    console.log("플레이어 추가 에러");
    console.error("Error:", error.message);
  }
};

/**
 *
 * @param {string} sessionId
 * @param {string} connectionId
 */
export const exitRoom = async (sessionId, connectionId) => {
  console.log("방나가기 sessionId:", sessionId, " connectionId:", connectionId);
  try {
    const response = await axios.delete(
      APPLICATION_SERVER_URL + "exitrooms/" + sessionId + "/" + connectionId,
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log("방나가기 에러");
    console.error("Error:", error.message);
  }
};

/**
 * 룸 리스트 가져오기
 *
 * @returns 룸 리스트
 */
export const listRoom = async () => {
  try {
    const response = await axios.get(APPLICATION_SERVER_URL + "rooms");
    // console.log("룸 리스트", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching room list:", error);
  }
};

/**
 *
 * @param {string} sessionId
 * @param {string} enterPassword
 * @returns token
 */
export const checkPassword = async (sessionId, enterPassword) => {
  const response = await axios.post(
    APPLICATION_SERVER_URL + "password",
    {
      customSessionId: sessionId,
      enterPassword: enterPassword,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data; // The token
};
