import axios from "./axios.js";

/**
 * 플레이어의 팀 변경
 * @param {string} sessionId 방의 세션 아이디
 * @param {string} connectionId 플레이어의 커넥션 아이디
 * @param {string} team A | B, 서버의 기본 설정은 적은 팀의 값 할당
 */
export const playerTeam = async (sessionId, connectionId, team) => {
  // console.log("플레이어 팀 변경", sessionId, connectionId, team);
  try {
    const response = await axios.put("team", {
      sessionId: sessionId,
      connectionId: connectionId,
      team: team,
    });
    // console.log(response.data); // "팀이 변경 되었습니다."
  } catch (error) {
    // console.log("플레이어 팀 변경 에러");
    console.error("Error:", error.message);
  }
};

export const getRoomInfo = async (sessionId) => {
  // console.log("방정보 조회", sessionId);
  try {
    const response = await axios.get("rooms/" + sessionId);
    // console.log(response.data);
    return response.data; // "방정보"
  } catch (error) {
    console.log("방정보 조회 에러");
    console.error("Error:", error.message);
  }
};

export const passHost = async (sessionId, connectionId) => {
  // console.log("반장 변경", sessionId, connectionId);
  try {
    const response = await axios.put("host", {
      sessionId: sessionId,
      connectionId: connectionId,
    });
    // console.log(response.data); // "방장 권한을 전달했습니다."
  } catch (error) {
    console.log("반장 변경 에러");
    console.error("Error:", error.message);
  }
};

export const exitRoom = async (sessionId, connectionId) => {
  // console.log("방나가기", sessionId, connectionId);
  try {
    const response = await axios.delete("exitrooms", {
      sessionId: sessionId,
      connectionId: connectionId,
    });
    // console.log(response.data);
  } catch (error) {
    console.log("방나가기 에러");
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
  try {
    const response = await axios.put("ready", {
      sessionId: sessionId,
      connectionId: connectionId,
      ready: isReady,
    });
  } catch (error) {
    console.log("준비 에러");
    console.error("api ready Error:", error);
  }
};

export const startPlay = async (sessionId) => {
  try {
    const response = await axios.put("play", {
      sessionId: sessionId,
      play: true,
    });
  } catch (error) {
    alert(error.response.data)
  }
};

export const getGameData = async (sessionId) => {
  try {
    const response = await axios.get("game/" + sessionId);
    return response.data; //
  } catch (error) {
    console.error("게임 문제 로드 error", error);
  }
};

export const endPlay = async (sessionId, winTeam, winScore, loseScore) => {
  try {
    const response = await axios.put("play", {
      sessionId: sessionId,
      play: false,
      winTeam,
      winScore,
      loseScore,
    });
  } catch (error) {
    console.log("게임종료");
    console.error("Error:", error);
  }
};
