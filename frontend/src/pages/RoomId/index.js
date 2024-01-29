import { OpenVidu } from "openvidu-browser";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import UserVideoComponent from "./UserVideoComponent.js";
import Chat from "../../components/Chat/index.js";
import {
  createSession,
  createToken,
  listRoom,
  checkPassword,
  addPlayer,
  exitRoom,
} from "../../api/roomAPI.js";
import MyCam from "../../components/lobbyComponent/UserMediaProfile.js";
import { getGameData, getRoomInfo, playerTeam, ready, startPlay } from "../../api/waitRoom.js";

// const APPLICATION_SERVER_URL =
//   process.env.NODE_ENV === "production" ? "" : "https://demos.openvidu.io/";

export default function RoomId() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [mySessionId, setMySessionId] = useState(id);
  const [myUserName, setMyUserName] = useState(`guest-${Math.floor(Math.random() * 100)}`);
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  const [openLink, setOpenLink] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const OV = useRef(new OpenVidu());

  const location = useLocation();
  const firstRoomInfo = { ...location.state };
  // console.log(roomInfo);

  const handleChangeUserName = useCallback((e) => {
    setMyUserName(e.target.value);
  }, []);

  const handleMainVideoStream = useCallback(
    (stream) => {
      if (mainStreamManager !== stream) {
        setMainStreamManager(stream);
      }
    },
    [mainStreamManager]
  );

  const joinSession = useCallback(() => {
    if (session) {
      console.log("리브세션", session);
      exitRoom(session.sessionId, session.connection.connectionId);
      session.disconnect();
    }

    const mySession = OV.current.initSession();

    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((subscribers) => [...subscribers, subscriber]);
    });

    mySession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    setSession(mySession);
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
              resolution: "640x480",
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
        .then(() => {
          const playerSessionId = session.sessionId;
          const playerConnectionId = session.connection.connectionId;
          console.log("플레이어 추가", mySessionId);
          // addPlayer(playerSessionId, playerConnectionId, 1, myUserName, true);
          // addPlayer(playerSessionId, playerConnectionId, 1, myUserName, true);
          if (mySessionId === "create") {
            addPlayer(playerSessionId, playerConnectionId, 1, myUserName, true);
          } else {
            addPlayer(playerSessionId, playerConnectionId, 1, myUserName, false);
          }
        })
        //방조회
        .then(async () => {
          const serverRoomInfo = await getRoomInfo(session.sessionId);
          await console.log("서버에서 받은 방정보", serverRoomInfo);
          // console.log("방 호스트 아이디", serverRoomInfo.roomStatus.hostId);
          // console.log("세션 커넥션 아이디", session.connection.connectionId);
          if (mySessionId === "create") {
            console.log("나는 호스트");
            setIsHost(true);
          } else if (serverRoomInfo.roomStatus.hostId === session.connection.connectionId) {
            console.log("나는 호스트");
            setIsHost(true);
          }
        });
    }
  }, [session, myUserName]);

  const leaveSession = useCallback(() => {
    // Leave the session
    if (session) {
      console.log("리브세션", session);
      exitRoom(session.sessionId, session.connection.connectionId);
      session.disconnect();
    }

    // Reset all states and OpenVidu object
    OV.current = new OpenVidu();
    setSession(undefined);
    setSubscribers([]);
    // setMySessionId("create");
    // setMyUserName("나가고 제설정" + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
  }, [session]);

  const switchCamera = useCallback(async () => {
    try {
      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter((device) => device.kind === "videoinput");

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          const newPublisher = OV.current.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          if (session) {
            await session.unpublish(mainStreamManager);
            await session.publish(newPublisher);
            setCurrentVideoDevice(newVideoDevice[0]);
            setMainStreamManager(newPublisher);
            setPublisher(newPublisher);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentVideoDevice, session, mainStreamManager]);

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

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      leaveSession();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [leaveSession]);

  const getToken = useCallback(async () => {
    //API import 함수 사용 중
    const sessionId = await createSession(
      mySessionId,
      firstRoomInfo.roomName,
      firstRoomInfo.roomMax
    );
    console.log("방생성결과", sessionId);
    // await createToken(sessionId);
    setOpenLink(sessionId);
    return await createToken(sessionId);
  }, [mySessionId]);

  const changeTeam = (team) => {
    console.log(`팀변경 ${team}`, session);
    try {
      playerTeam(session.sessionId, session.connection.connectionId, team);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const setReady = async () => {
    // console.log("준비");
    try {
      if (isHost) {
        await startPlay(session.sessionId);
        try {
          const quizs = await getGameData(session.sessionId);
          console.log(quizs);
        } catch (error) {
          console.error("getGameData Error", error);
        }
      } else {
        if (isReady) {
          await ready(session.sessionId, session.connection.connectionId, false);
        } else {
          await ready(session.sessionId, session.connection.connectionId, true);
        }
        setIsReady(!isReady);
      }
      await getRoomInfo(session.sessionId);
      // navigate("/game", {
      //   state: {
      //     roomName: roomName,
      //     roomPassword: roomPassword,
      //     roomMax: roomMax,
      //     roomGame: roomGame,
      //   },
      // });
    } catch (error) {
      console.error("set Ready Error:", error);
    }
  };
  // useEffect(() => {}, [subscribers]);
  return (
    <>
      {session === undefined ? (
        <div>
          <button onClick={joinSession} className="bg-mc1 p-2">
            {firstRoomInfo.roomName} : JOIN ROOM
          </button>
          <section className="w-1/2">
            <MyCam></MyCam>
          </section>
        </div>
      ) : null}

      {session !== undefined ? (
        <div id="session" className="bg-neutral-200 p-2 mx-2 mb-2 border rounded-3xl h-screen-80">
          <div id="session-header" className="flex flex-row">
            <h1 id="session-title" className="text-xl">
              {firstRoomInfo.roomName}
            </h1>
            <input
              className="bg-mc1 p-2"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
            <input
              type="button"
              id="buttonSwitchCamera"
              onClick={switchCamera}
              value="Switch Camera"
            />
            <p>초대링크 :</p>
            <p> http://localhost:3000/room/{openLink}</p>
          </div>
          <div className="grid grid-cols-4 h-screen-40">
            <div id="video-container" className="col-span-3 grid grid-rows-2 grid-cols-4 gap-2 p-2">
              {publisher !== undefined ? (
                <div className="bg-green-500 p-1 " onClick={() => handleMainVideoStream(publisher)}>
                  <UserVideoComponent
                    streamManager={publisher}
                    session={session}
                    isHost={isHost}
                    isReady={isReady}
                  />
                </div>
              ) : null}
              {/* 나말고 */}
              {subscribers.map((sub, i) => (
                <div
                  key={sub.id}
                  className="bg-teal-500 p-1"
                  onClick={() => handleMainVideoStream(sub)}
                >
                  <span>{sub.id}</span>
                  <UserVideoComponent
                    streamManager={sub}
                    session={session}
                    isHost={isHost}
                    isReady={isReady}
                  />
                </div>
              ))}
            </div>
            <div className="grid col-span-1 grid-rows-4 gap-2">
              <div className="row-span-3">
                <Chat myUserName={myUserName} session={session} />
              </div>

              <div className="row-span-1 grid grid-cols-2 gap-1 w-full">
                <button
                  className="bg-mc1 border rounded-3xl active:bg-mc2"
                  onClick={() => changeTeam("A")}
                >
                  A팀
                </button>
                <button
                  className="bg-mc8 border rounded-3xl active:bg-mc7"
                  onClick={() => changeTeam("B")}
                >
                  B팀
                </button>
                <button
                  className="col-span-2 bg-mc3 border rounded-3xl"
                  // onClick={() => getRoomInfo(session.sessionId)}
                  onClick={setReady}
                >
                  {isHost ? "게임시작" : "준비"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
