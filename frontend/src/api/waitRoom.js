import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000/";

/**
 * 플레이어의 팀 변경
 * @param {string} sessionId 방의 세션 아이디
 * @param {string} connectionId 플레이어의 커넥션 아이디
 * @param {string} team A | B, 서버의 기본 설정은 적은 팀의 값 할당
 */
export const playerTeam = async (sessionId, connectionId, team) => {
  console.log("플레이어 팀 변경", sessionId, connectionId, team);
  try {
    const response = await axios.put(
      APPLICATION_SERVER_URL + "team",
      {
        sessionId: sessionId,
        connectionId: connectionId,
        team: team,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response.data); // "팀이 변경 되었습니다."
  } catch (error) {
    console.log("플레이어 팀 변경 에러");
    console.error("Error:", error.message);
  }
};

export const getRoomInfo = async (sessionId) => {
  console.log("방정보 조회", sessionId);
  try {
    const response = await axios.get(APPLICATION_SERVER_URL + "rooms/" + sessionId);
    console.log(response.data); // "방정보"
  } catch (error) {
    console.log("방정보");
    console.error("Error:", error.message);
  }
};

/**
 *
 * @param {string} sessionId
 * @param {string} connectionId
 * @param {boolean} isReady
 */
export const ready = async (sessionId, connectionId, isReady) => {
  console.log("준비", sessionId, connectionId);
  try {
    const response = await axios.put(
      APPLICATION_SERVER_URL + "ready",
      {
        sessionId: sessionId,
        connectionId: connectionId,
        isReady: isReady,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response.data); // "준비 상태를 변경했습니다"
  } catch (error) {
    console.log("준비");
    console.error("Error:", error.message);
  }
};

export const startPlay = async (sessionId) => {
  console.log("게임시작", sessionId);
  try {
    const response = await axios.put(
      APPLICATION_SERVER_URL + "play",
      {
        sessionId: sessionId,
        play: true,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log("게임시작");
    console.error("Error:", error.message);
  }
};

export const endPlay = async (sessionId, winTeam, winScore, loseScore) => {
  console.log("게임종료", sessionId);
  try {
    const response = await axios.put(
      APPLICATION_SERVER_URL + "play",
      {
        sessionId: sessionId,
        play: false,
        winTeam,
        winScore,
        loseScore,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log("게임종료");
    console.error("Error:", error.message);
  }
};

export const passHost = async (sessionId, connectionId) => {
  console.log("반장 변경", sessionId, connectionId);
  try {
    const response = await axios.put(
      APPLICATION_SERVER_URL + "host",
      {
        sessionId: sessionId,
        connectionId: connectionId,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response.data); // "방장 권한을 전달했습니다."
  } catch (error) {
    console.log("반장 변경 에러");
    console.error("Error:", error.message);
  }
};
