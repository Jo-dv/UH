import { OpenVidu } from "openvidu-browser";

import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import UserVideoComponent from "./UserVideoComponent";
import Chat from "../../components/Chat";
import {
  createSession,
  createToken,
  listRoom,
  checkPassword,
  addPlayer,
  exitRoom,
} from "../../api/roomAPI.js";

// const APPLICATION_SERVER_URL =
//   process.env.NODE_ENV === "production" ? "" : "https://demos.openvidu.io/";

export default function Room() {
  const [mySessionId, setMySessionId] = useState("create");
  const [myUserName, setMyUserName] = useState(`익명${Math.floor(Math.random() * 100)}`);
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const [roomList, setRoomList] = useState([
    {
      sessionId: "세션아이디",
      roomName: "방이름",
      roomPassword: null,
      gameCategory: 100,
      quizCategory: 100,
      count: 1,
      max: 8,
      play: false,
    },
    {
      sessionId: "세션아이디2",
      roomName: "방이름2",
      roomPassword: null,
      gameCategory: 100,
      quizCategory: 100,
      count: 1,
      max: 8,
      play: false,
    },
  ]);

  const OV = useRef(new OpenVidu());

  const handleChangeSessionId = useCallback((e) => {
    setMySessionId(e.target.value);
  }, []);

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
        .then(() => {
          const playerSessionId = session.sessionId;
          const playerConnectionId = session.connection.connectionId;
          console.log("플레이어 추가", mySessionId);
          if (mySessionId === "create") {
            addPlayer(playerSessionId, playerConnectionId, 1, myUserName, true);
          } else {
            addPlayer(playerSessionId, playerConnectionId, 1, myUserName, false);
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

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  const getToken = useCallback(async () => {
    //API import 함수 사용 중
    const sessionId = await createSession(mySessionId);
    console.log("방생성결과", sessionId);
    // await createToken(sessionId);
    return await createToken(sessionId);
  }, [mySessionId]);

  const createRoom = () => {
    setMySessionId("create");
    joinSession();
  };

  const showRoomList = async () => {
    let res = await listRoom();
    setRoomList(res);
  };
  return (
    <>
      {session === undefined ? (
        <>
          <div id="join" className="bg-slate-500">
            <div id="join-dialog">
              <form
                className="form-group flex flex-col justify-center items-center p-2"
                onSubmit={joinSession}
              >
                <p>
                  <label>Participant: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="userName"
                    value={myUserName}
                    onChange={handleChangeUserName}
                    required
                  />
                </p>
                <p>
                  <label> Session: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="sessionId"
                    value={mySessionId}
                    onChange={handleChangeSessionId}
                    required
                  />
                </p>
                <p className="text-center">
                  <input
                    className="btn btn-lg btn-success"
                    name="commit"
                    type="submit"
                    value="JOIN"
                  />
                </p>
              </form>
            </div>
            {/* <Modal
                      btnText={"모달 여는 버튼"}
                      content={"모달내용"}
                      cancelText={"닫기"}
                      okText={"수락"}
                      onClick={testModal}
                    /> */}
          </div>
          <div>
            <button className="bg-mc3" onClick={showRoomList}>
              Show List
            </button>
            <ul className="bg-white">
              {roomList.map((item, index) => (
                <li key={index} className="border">
                  <p>{item.sessionId}</p>
                  <p>
                    {item.roomName} | {item.play}
                  </p>
                  <p>
                    {item.count} / {item.max}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}

      {session !== undefined ? (
        <div id="session" className="bg-neutral-200 p-2 mx-2 mb-2 border rounded-3xl h-screen-80">
          <div id="session-header" className="flex flex-row">
            <h1 id="session-title" className="text-xl">
              {mySessionId}
            </h1>
            <input
              className="bg-mc1"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
            <input
              className="bg-mc3"
              type="button"
              id="buttonSwitchCamera"
              onClick={switchCamera}
              value="Switch Camera"
            />
          </div>
          <div className="grid grid-cols-4 h-screen-40">
            <div id="video-container" className="col-span-3 grid grid-rows-2 grid-cols-4 gap-2 p-2">
              {publisher !== undefined ? (
                <div className="bg-green-500 p-1 " onClick={() => handleMainVideoStream(publisher)}>
                  <UserVideoComponent streamManager={publisher} session={session} />
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
                  <UserVideoComponent streamManager={sub} session={session} />
                </div>
              ))}
            </div>
            <div className="grid col-span-1 grid-rows-4 gap-2">
              <div className="row-span-3">
                <Chat myUserName={myUserName} session={session} />
              </div>

              <div className="row-span-1 grid grid-cols-2 gap-1 w-full">
                <button className="bg-mc1 border rounded-3xl">A팀</button>
                <button className="bg-mc8 border rounded-3xl">B팀</button>
                <button className="col-span-2 bg-mc3 border rounded-3xl">준비</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
