import { OpenVidu } from "openvidu-browser";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

// api, store
import { useWebSocket } from "../../webSocket/UseWebSocket.js";
import { createSession, createToken, addPlayer, exitRoom } from "../../api/roomAPI.js";
import { getGameData, getRoomInfo, playerTeam, ready, startPlay } from "../../api/waitRoom.js";
import useWaitingRoomApiCall from "../../api/useWaitingRoomApiCall.js";
import UseRoomSetting from "../../store/UseRoomSetting.js";
import UseInvitingStore from "../../store/UseInvitingStore.js";
import useStore from "../../store/UserAuthStore";
import UseLeavingStore from "../../store/UseLeavingStore.js";
import { usePreventGoBack } from "../../hooks/usePreventGoBack.js";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonIcon from "@mui/icons-material/Person";

// component, modal
import Chat from "../../components/Chat/index.js";
import Game from "../Game/index.js";
import Leaving from "../../components/Modal/waiting/Leaving.js";
import RoomSetting from "../../components/Modal/waiting/RoomSetting.js";
import Inviting from "../../components/Modal/waiting/Inviting.js";
import Person from "../../components/waitingComponent/Person.js";
import KickedModal from "../../components/Modal/waiting/KickedModal.js";

export default function RoomId() {
  // usePreventGoBack();
  const OV = useRef(undefined);
  const { getRoomInfo } = useWaitingRoomApiCall();
  const nickname = useStore((state) => state.user.userNickname);
  const { inviting, setInviting } = UseInvitingStore();
  const { send } = useWebSocket();
  const { roomSetting, setRoomSetting } = UseRoomSetting();
  const { leaving, setLeaving } = UseLeavingStore();
  const { refreshRequested, setRefreshRequested } = useWebSocket();
  const [myUserName, setMyUserName] = useState(nickname);
  const { id } = useParams();
  const [mySessionId, setMySessionId] = useState(id);
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  const [openLink, setOpenLink] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [gameQuiz, setGameQuiz] = useState(undefined);
  const location = useLocation();
  const firstRoomInfo = { ...location.state };
  const [roomInfo, setroomInfo] = useState({});
  const [sessionID, setSessionID] = useState("");
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  const [isMeme, setIsMeme] = useState(false);

  const navigate = useNavigate();
  const [isKickeded, setIsKicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [roomName, setRoomName] = useState(roomInfo.roomData?.roomName || "");
  const [roomPassword, setRoomPassword] = useState(roomInfo.roomData?.roomPassword || "");
  const [roomMax, setRoomMax] = useState(roomInfo.roomData?.max || "");
  const [roomGame, setRoomGame] = useState(roomInfo.roomData?.gameCategory || "");
  const [adjusting, setAdjusting] = useState(false);

  const itemUse = (myTeam) => {
    if (session !== undefined) {
      session
        .signal({
          data: JSON.stringify({
            myTeam: myTeam
          }),
          to: [],
          type: "meme",
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  // 함수 정의

  const handleMainVideoStream = useCallback(
    (stream) => {
      if (mainStreamManager !== stream) {
        setMainStreamManager(stream);
      }
    },
    [mainStreamManager]
  );
  // console.log(mySessionId);
  const joinSession = useCallback(() => {
    // console.log("joinSession 함수 시작");
    if (session) {
      session.disconnect();
    }
    OV.current = new OpenVidu();
    OV.current.enableProdMode(); // 로그 기록 해제
    const mySession = OV.current.initSession();
    // console.log("OpenVidu 세션 초기화 완료:", mySession);
    mySession.on("streamCreated", (event) => {
      // console.log(teamA);
      handleNewRoomInfo(mySession);
      // console.log("hhhhhhhh", mySession);
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((subscribers) => [...subscribers, subscriber]);
    });

    mySession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
      handleNewRoomInfo(mySession);
    });

    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    mySession.on("signal:team-change", (event) => {
      const { connectionId, team } = JSON.parse(event.data);
      handleNewRoomInfo(mySession);
      // teamA와 teamB 상태 업데이트
      if (team === "A") {
        setTeamA((prev) => [...prev, connectionId]);
        setTeamB((prev) => prev.filter((id) => id !== connectionId));
      } else if (team === "B") {
        setTeamB((prev) => [...prev, connectionId]);
        setTeamA((prev) => prev.filter((id) => id !== connectionId));
      }
    });
    mySession.on("signal:ready", (event) => {
      //ready를 누군가 눌렀을 때 방 정보 새로 불러오기
      handleNewRoomInfo(mySession);
    });

    mySession.on("signal:ready", (event) => {
      //ready를 누군가 눌렀을 때 방 정보 새로 불러오기
      handleNewRoomInfo(mySession);
    });

    //강퇴 처리(event로 보낸 connectionId와 같은 아이디를 찾아 방나가기 처리)
    mySession.on("signal:disconnect", async (event) => {
      const { connectionId } = JSON.parse(event.data);
      if (mySession.connection.connectionId === connectionId) {
        // alert("강퇴");
        // await leaveSession();
        // navigate("/lobby");
        setIsKicked(true);
      }
    });

    setSession(mySession);
    // console.log("111111111111111111", mySession);
    window.addEventListener("beforeunload", leaveSession);
    // console.log("세션 설정 완료");
  }, []);

  useEffect(() => {
    if (session) {
      // Get a token from the OpenVidu deployment
      getToken()
        .then(async (token) => {
          try {
            await session.connect(token, { clientData: myUserName });
            let publisher = await OV.current.initPublisherAsync(undefined, {
              audioSource: undefined,
              videoSource: undefined,
              publishAudio: true,
              publishVideo: true,
              resolution: "320x240",
              frameRate: 30,
              insertMode: "APPEND",
              mirror: false,
            });

            session.publish(publisher);

            const devices = await OV.current.getDevices();
            const videoDevices = devices.filter((device) => device.kind === "videoinput");
            const currentVideoDeviceId = publisher.stream
              .getMediaStream()
              .getVideoTracks()[0]
              .getSettings().deviceId;
            const currentVideoDevice = videoDevices.find(
              (device) => device.deviceId === currentVideoDeviceId
            );

            setMainStreamManager(publisher);
            setPublisher(publisher);
            setCurrentVideoDevice(currentVideoDevice);
          } catch (error) {
            console.log("There was an error connecting to the session:", error.code, error.message);
          }
        })
        //플레이어 추가
        .then(async () => {
          const playerSessionId = session.sessionId;
          const playerConnectionId = session.connection.connectionId;
          // console.log("플레이어 추가", mySessionId);
          if (mySessionId === "create") {
            await addPlayer(playerSessionId, playerConnectionId, 1, myUserName, true);
          } else {
            await addPlayer(playerSessionId, playerConnectionId, 1, myUserName, false);
          }
        })
        //방조회
        .then(async () => {
          const serverRoomInfo = await getRoomInfo(session.sessionId);
          // console.log("서버에서 받은 방정보", serverRoomInfo);
          handleNewRoomInfo(session);
          setroomInfo(serverRoomInfo);

          // console.log("서버에서 받은 방정보", serverRoomInfo);
        });
    }
  }, [session, myUserName]);

  const leaveSession = useCallback(async () => {
    // Leave the session
    if (session) {
      //나갔을 때 알림
      await session
      .signal({
        data: `${nickname}님이 나갔습니다.`,
        to: [], 
        type: "room-chat", 
      })
      .catch((error) => {
        console.error(error);
      });

      await exitRoom(session.sessionId, session.connection.connectionId);
      await session.disconnect();
      await send({ type: "refresh" });
    }

    OV.current = undefined;
    setSession(undefined);
    setSubscribers([]);
    setMainStreamManager(undefined);
    setPublisher(undefined);
  }, [session]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      leaveSession();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [leaveSession]);

  const deleteSubscriber = useCallback((streamManager) => {
    setSubscribers((prevSubscribers) => {
      const index = prevSubscribers.indexOf(streamManager);
      if (index > -1) {
        const newSubscribers = [...prevSubscribers];
        newSubscribers.splice(index, 1);
        return newSubscribers;
      } else {
        return prevSubscribers;
      }
    });
  }, []);

  //로비로 나갔을 때 (로고,방 나가기) 세션 종료 처리
  useEffect(() => {
    const cleanup = () => {
      if (window.location.pathname === "/lobby") {
        leaveSession();
      }
    };

    return cleanup;
  }, [leaveSession]);

  const getToken = useCallback(async () => {
    //API import 함수 사용 중
    const sessionId = await createSession(
      mySessionId,
      firstRoomInfo.roomName,
      firstRoomInfo.roomPassword,
      firstRoomInfo.roomGame,
      firstRoomInfo.roomMax
    );
    // console.log("방생성결과", sessionId);
    // await createToken(sessionId);
    setOpenLink(sessionId);
    return await createToken(sessionId);
  }, [mySessionId]);

  const changeTeam = (team) => {
    // console.log(`팀변경 ${team}`, session);
    try {
      playerTeam(session.sessionId, session.connection.connectionId, team);

      const connectionId = session.connection.connectionId; // connectionId를 추출
      sendTeamChangeSignal(connectionId, team);
      if (team === "A") {
        setTeamA((prev) => [...prev, connectionId]);
        setTeamB((prev) => prev.filter((id) => id !== connectionId));
      } else if (team === "B") {
        setTeamB((prev) => [...prev, connectionId]);
        setTeamA((prev) => prev.filter((id) => id !== connectionId));
      }

      // console.log(nickname, team);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // 팀 변경 시그널 보내기
  const sendTeamChangeSignal = (connectionId, team) => {
    session
      .signal({
        data: JSON.stringify({ connectionId, team }), // connectionId와 team 정보를 JSON 문자열로 변환
        to: [], // 모든 참가자에게 전송
        type: "team-change",
      })
      .then(() => {
        // console.log("팀 변경 시그널 전송 성공");
      })
      .catch((error) => {
        // console.error("팀 변경 시그널 전송 실패:", error);
      });
  };

  useEffect(() => {
    // session 객체가 존재하는지 확인
    if (session) {
      // 팀 변경 시그널 수신 리스너 설정
      session.on("signal:team-change", (event) => {
        const { connectionId, team } = JSON.parse(event.data);
        if (team === "A") {
          setTeamA((prev) => [...prev, connectionId]);
          setTeamB((prev) => prev.filter((id) => id !== connectionId));
        } else if (team === "B") {
          setTeamB((prev) => [...prev, connectionId]);
          setTeamA((prev) => prev.filter((id) => id !== connectionId));
        }
      });


      //아이템 처리
      session.on("signal:meme", (event) => {
        const { myTeam } = JSON.parse(event.data);
        console.log(session.connection.connectionId)
        if (myTeam === "A") {
          if (teamB.includes(session.connection.connectionId)) {
            // console.log("공격받음")
            setIsMeme(true);
          }
        } else if (myTeam === "B") {
          if (teamA.includes(session.connection.connectionId)) {
            // console.log("공격받음")
            setIsMeme(true);
          }
        }
      });
    }
  }, [session,teamA,teamB]); // session 객체를 의존성 배열에 추가

  const setReady = async () => {
    // console.log("준비");
    try {
      if (isHost) {
        await startPlay(session.sessionId);
      } else {
        if (isReady) {
          await ready(session.sessionId, session.connection.connectionId, false);
        } else {
          await ready(session.sessionId, session.connection.connectionId, true);
        }
        setIsReady(!isReady);
      }
      const roomData = await getRoomInfo(session.sessionId);
      if (roomData.roomData.play) {
        setIsPlay(true);
        sendPlay();
      } else {
        setIsPlay(false);
      }
      if (session !== undefined) {
        session
          .signal({
            type: "ready",
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (error) {
      console.error("set Ready Error:", error);
    }
  };
  const sendPlay = () => {
    // console.log("플레이 소켓 보냄");
    if (session !== undefined) {
      session
        .signal({
          data: `${mySessionId} - 게임시작: ${isPlay}`,
          to: [],
          type: "room-play",
        })
        .then(() => {
          // console.log("게임시작 :", isPlay);
        })
        .catch((error) => {
          console.error(error);
        });

      send({ type: "refresh" });
    }
  };
  if (session !== undefined) {
    session.on("signal:room-play", (event) => {
      // console.log("플레이 소켓 받음", event.data);
      setIsPlay(true);
    });
  }
  const sendPlayDone = () => {
    // console.log("플레이 소켓 보냄");
    if (session !== undefined) {
      session
        .signal({
          data: `${mySessionId} - 게임끝: ${isPlay}`,
          to: [],
          type: "room-playDone",
        })
        .then(() => {
          // console.log("게임끝 :", isPlay);
        })
        .catch((error) => {
          console.error(error);
        });

      send({ type: "refresh" });
    }
  };
  if (session !== undefined) {
    session.on("signal:room-playDone", (event) => {
      // console.log("플레이 소켓 받음", event.data);
      setIsReady(false);
      setIsPlay(false);
    });
  }
  // 새 사용자가 접속할 때 실행되는 함수
  const handleNewRoomInfo = async (session) => {
    try {
      const roomData = await getRoomInfo(session.sessionId);
      const players = roomData.roomStatus.players;
      setroomInfo(roomData);
      if (roomData.roomStatus.hostId === session.connection.connectionId) {
        setIsHost(true);
      }
      // 플레이어 객체를 순회하며 teamA와 teamB 배열 생성
      const teamAData = [];
      const teamBData = [];
      Object.entries(players).forEach(([connectionId, playerData]) => {
        if (playerData.team === "A") {
          teamAData.push(connectionId);
        } else if (playerData.team === "B") {
          teamBData.push(connectionId);
        }
      });
      setTeamA(teamAData);
      setTeamB(teamBData);
    } catch (error) {
      console.error("Error fetching room info:", error);
    }
  };

  const kickOutUser = async (connectionId) => {
    if (isHost) {
      try {
        session.signal({
          type: "disconnect",
          data: JSON.stringify({
            connectionId: connectionId,
          }),
        });
      } catch (error) {
        console.error("강퇴 중 오류 발생:", error);
      }
    } else {
      console.error("호스트만 강퇴할 수 있습니다.");
    }
  };

  useEffect(() => {
    if (roomInfo && roomInfo.roomData) {
      setRoomName(roomInfo.roomData.roomName);
      setRoomPassword(roomInfo.roomData.roomPassword);
      setRoomGame(roomInfo.roomData.gameCategory);
      setRoomMax(roomInfo.roomData.max);
    }
  }, [roomInfo]);

  useEffect(() => {
    joinSession();
    setIsLoading(false);
  }, []);

  const fetchData = async () => {
    try {
      const data = await getRoomInfo(session.sessionId);
      setroomInfo(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // WebSocket을 통한 새로고침 요청에 대한 처리
  useEffect(() => {
    if (refreshRequested) {
      fetchData();
      setRefreshRequested(false);
    }
  }, [refreshRequested]);

  return (
    <>
      {/* {isLoading ? (<p>Loading</p>) : ( */}

      {/* {session === undefined ? (
        <div>
        <button onClick={joinSession} className="bg-mc1 p-2">
            {firstRoomInfo.roomName} : JOIN ROOM
          </button>
          <section className="w-1/2">
          <MyCam />
          </section>
        </div>
      ) : null} */}

      {session !== undefined && isPlay === false ? (
        <div className="container-box bg-[#FFFBF7] grid grid-rows-10 grid-cols-12 p-2 mx-2 mb-2 border rounded-3xl h-screen-80">
          {/* 방 정보 출력 */}
          <div className="flex flex-wrap col-start-1 col-end-13 row-start-1 row-end-2 ml-10 relative">
            {roomInfo && roomInfo.roomData && (
              <div className="flex items-center space-x-3 w-full">
                <p>{roomPassword === null ? <LockOpenIcon /> : <LockIcon />}</p>
                <div className="text-2xl">
                  {roomName} - {roomGame === 101 ? "고요 속의 외침" : "인물 맞추기"}
                </div>
                <div className="absolute right-11 flex flex-wrap items-center space-x-3">
                  <p>
                    <PersonIcon />
                  </p>
                  <p className="text-2xl">
                    {roomInfo.roomData.count}/{roomMax}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="col-start-3 col-end-13 row-start-2 row-end-8  mb-2">
            {
              <Person
                publisher={publisher}
                handleMainVideoStream={handleMainVideoStream}
                session={session}
                isHost={isHost}
                isReady={isReady}
                subscribers={subscribers}
                teamA={teamA}
                teamB={teamB}
                deleteSubscriber={deleteSubscriber}
                kickOutUser={kickOutUser}
                hostId={
                  roomInfo.roomStatus && roomInfo.roomStatus.hostId
                    ? roomInfo.roomStatus.hostId
                    : undefined
                }
                playersInfo={
                  roomInfo.roomStatus && roomInfo.roomStatus.players
                    ? roomInfo.roomStatus.players
                    : undefined
                }
              />
            }
          </div>

          {/* 하단 채팅, 버튼 */}
          <div className="grid col-start-3 col-end-13 row-start-8 row-end-11 ">
            <div className="col-start-1 col-end-7 row-start-1 row-end-13 mr-2 h-38 overflow-y-auto">
              <Chat
                myUserName={myUserName}
                session={session}
                myConnectionId={"undefined 방지용 데이터"}
              />
            </div>
            <div className="grid col-start-7 col-end-9 row-start-1 row-end-13">
              <div className="grid grid-cols-2 gap-2 col-start-1 col-end-9 row-start-1 row-end-6">
                <button
                  className="bg-tab1 border rounded-2xl w-full h-full flex justify-center items-center"
                  onClick={() => changeTeam("A")}
                >
                  A팀
                </button>

                <button
                  className="border rounded-2xl bg-tab12 w-full h-full flex justify-center items-center"
                  onClick={() => changeTeam("B")}
                >
                  B팀
                </button>
              </div>
              <div className="grid col-start-1 col-end-9 row-start-6 row-end-13 mt-2">
                <button
                  onClick={() => {
                    setReady();
                  }}
                  className={`bg-tab10 active:bg-tab4 border rounded-2xl h-full flex justify-center items-center w-full ${
                    isReady ? "bg-tab4" : ""
                  }`}
                >
                  {isHost ? "게임시작" : isReady ? "준비완료" : "준비"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* 모달 창 관리 */}

      {isPlay ? (
        <Game
          publisher={publisher}
          subscribers={subscribers}
          session={session}
          myUserName={myUserName}
          sendPlayDone={sendPlayDone}
          itemUse={itemUse}
          isMeme={isMeme}
        />
      ) : null}
      {leaving && (
        <Leaving onClose={() => setLeaving(false)} leaving={leaving} leaveSession={leaveSession} />
      )}

      {roomSetting && (
        <RoomSetting
          onClose={() => setRoomSetting(false)}
          roomSetting={roomSetting}
          roomInfo={roomInfo}
          connectionId={session.connection.connectionId}
        />
      )}
      {inviting && (
        <Inviting onClose={() => setInviting(false)} inviting={inviting} openLink={openLink} />
      )}
      {/* <KickedModal isOpen={isKickeded} onClose={handleKickedModalClose} /> */}
      <KickedModal
        isOpen={isKickeded}
        onClose={() => {
          setIsKicked(false); // 모달 닫기
          navigate("/lobby"); // 사용자를 로비로 이동
        }}
      />
    </>
  );
}
