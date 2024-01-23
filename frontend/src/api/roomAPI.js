import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000/";

//방 만들기, 입장
export const createSession = async (sessionId) => {
  try {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "rooms",
      {
        customSessionId: sessionId,
        roomName: this.roomName,
        roomPassword: this.roomPassword,
        gameCategory: 100,
        quizCategory: 100,
        max: 8,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("방만들기", response.data);
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

export const listRoom = async () => {
  axios
    .get(APPLICATION_SERVER_URL + "rooms") // 백엔드 엔드포인트 변경
    .then((response) => {
      // 성공적으로 데이터를 받아오면 roomList에 할당
      this.roomList = response.data;
    })
    .catch((error) => {
      console.error("Error fetching room list:", error);
    });
};

// 비밀번호확인
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
