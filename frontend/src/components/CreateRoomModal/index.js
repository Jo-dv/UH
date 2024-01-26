import { OpenVidu } from "openvidu-browser";
import { useCallback, useEffect, useRef, useState } from "react";
import { addPlayer, createSession, createToken, exitRoom } from "../../api/roomAPI";
import { useNavigate } from "react-router-dom";

const CreateRoomModal = ({ modalOnOff }) => {
  const [roomName, setRoomName] = useState(`X-${Math.floor(Math.random() * 1000)}`);
  const [roomPassword, setRoomPassword] = useState(null);
  const [roomMax, setRoomMax] = useState(4);
  const [roomGame, setRoomGame] = useState(100);

  const [mySessionId, setMySessionId] = useState("create");
  const [myUserName, setMyUserName] = useState(`익명${Math.floor(Math.random() * 100)}`);
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

  const handleChangeRoomName = useCallback((e) => {
    setRoomName(e.target.value);
  }, []);
  const handleChangeRoomPassword = useCallback((e) => {
    setRoomPassword(e.target.value);
  }, []);
  const handleChangeRoomMax = useCallback((e) => {
    setRoomMax(e.target.value);
  }, []);
  const handleChangeRoomGame = useCallback((e) => {
    setRoomGame(e.target.value);
  }, []);

  const navigate = useNavigate();
  const submitHandler = (e) => {
    //1. 페이지 리로드 방지
    e.preventDefault();
    // joinSession();
    navigate("/room/create", {
      state: {
        roomName: roomName,
        roomPassword: roomPassword,
        roomMax: roomMax,
        roomGame: roomGame,
      },
    });
  };
  const OV = useRef(new OpenVidu());

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
      getToken().then(async (token) => {
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
      });
      // 플레이어 추가
      // .then(() => {
      //   const playerSessionId = session.sessionId;
      //   const playerConnectionId = session.connection.connectionId;
      //   console.log("플레이어 추가", mySessionId);
      //   if (mySessionId === "create") {
      //     addPlayer(playerSessionId, playerConnectionId, 1, myUserName, true);
      //   } else {
      //     addPlayer(playerSessionId, playerConnectionId, 1, myUserName, false);
      //   }
      // });
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
    const sessionId = await createSession(mySessionId, roomName);
    console.log("방생성결과", sessionId, roomName);
    // await createToken(sessionId);
    return await createToken(sessionId);
  }, [mySessionId, roomName]);

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

  return (
    <>
      <div
        onClick={modalOnOff}
        className="min-w-100 min-h-96 absolute inset-0
    flex justify-center items-center"
      >
        <form
          onSubmit={submitHandler}
          onClick={(e) => e.stopPropagation()}
          className=" rounded-2xl border-2 border-modalBorder 
          justify-center  p-2 flex flex-col bg-formBG"
        >
          <div
            className="m-1 px-2 
          border rounded-3xl bg-white"
          >
            <label>
              방제목:
              <input
                type="text"
                placeholder="방 제목을 입력해주세요!"
                value={roomName}
                onChange={handleChangeRoomName}
                required
              />
            </label>
          </div>
          <div
            className="m-1 px-2 
          border rounded-3xl bg-white"
          >
            <label>
              비밀번호:
              <input
                type="text"
                placeholder="비밀번호를 입력해주세요!"
                value={roomPassword}
                onChange={handleChangeRoomPassword}
              />
            </label>
          </div>
          <div
            className="m-1 px-2 
          border rounded-3xl bg-white"
          >
            참가인원:
            <label className="p-1 m-1">
              4명
              <input
                type="radio"
                value={4}
                name="num"
                onChange={handleChangeRoomMax}
                defaultChecked
              />
            </label>
            <label className="p-1 m-1">
              6명
              <input type="radio" value={6} name="num" onChange={handleChangeRoomMax} />
            </label>
            <label className="p-1 m-1">
              8명
              <input type="radio" value={8} name="num" onChange={handleChangeRoomMax} />
            </label>
          </div>
          <div
            className="m-1 px-2 
          border rounded-3xl bg-white flex flex-col"
          >
            <p>게임선택:</p>
            <label>
              <input
                type="radio"
                value={100}
                name="game"
                onChange={handleChangeRoomGame}
                defaultChecked
              />
              고요 속의 외침
            </label>
            <label>
              <input type="radio" value={200} name="game" onChange={handleChangeRoomGame} />
              인물 맞추기
            </label>
          </div>
          <button type="submit" className="p-2 m-1 rounded w-72 bg-formButton self-center">
            방 만들기
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateRoomModal;
