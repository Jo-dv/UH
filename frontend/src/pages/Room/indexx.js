import { OpenVidu } from "openvidu-browser";

import axios from "axios";
import React, { useSate } from "react";
import UserVideoComponent from "./UserVideoComponent";
import Chat from "../../components/Chat";
import Modal from "../../components/Modal";
import RoomNavbar from "./RoomNavbar";

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "https://demos.openvidu.io/";

const Room = () => {
  const [data, setData] = useSate({
    mySessionId: "E201",
    myUserName: "ㅇㅇ" + Math.floor(Math.random() * 100),
    session: undefined,
    mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
    publisher: undefined,
    subscribers: [],
    team: "",
  });
  let OV;

  const onbeforeunload = (e) => {
    leaveSession();
  };

  const componentDidMount = () => {
    window.addEventListener("beforeunload", onbeforeunload);
  };

  const componentWillUnmount = () => {
    window.removeEventListener("beforeunload", onbeforeunload);
  };

  const handleChangeSessionId = (e) => {
    setData((data.mySessionId = e.target.value));
  };

  const handleChangeUserName = (e) => {
    setData((data.myUserName = e.target.value));
  };

  const handleMainVideoStream = (stream) => {
    if (data.mainStreamManager !== stream) {
      setData((data.mainStreamManager = stream));
    }
  };

  const deleteSubscriber = (streamManager) => {
    let subscribers = data.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      setData((data.subscribers = subscribers));
    }
  };

  const joinSession = () => {
    // --- 1) Get an OpenVidu object ---

    OV = new OpenVidu();

    // --- 2) Init a session ---

    setData(
      {
        session: OV.initSession(),
      },
      () => {
        var mySession = data.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on("streamCreated", (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = data.subscribers;
          subscribers.push(subscriber);

          // Update the data with the new subscribers
          setData((data.subscribers = subscribers));
        });

        // On every Stream destroyed...
        mySession.on("streamDestroyed", (event) => {
          // Remove the stream from 'subscribers' array
          deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // Get a token from the OpenVidu deployment
        getToken().then((token) => {
          // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: data.myUserName })
            .then(async () => {
              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = await OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: "640x480", // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---

              mySession.publish(publisher);

              // Obtain the current video device in use
              var devices = await OV.getDevices();
              var videoDevices = devices.filter(
                (device) => device.kind === "videoinput"
              );
              var currentVideoDeviceId = publisher.stream
                .getMediaStream()
                .getVideoTracks()[0]
                .getSettings().deviceId;
              var currentVideoDevice = videoDevices.find(
                (device) => device.deviceId === currentVideoDeviceId
              );

              // Set the main video in the page to display our webcam and store our Publisher
              setData({
                ...data,
                currentVideoDevice: currentVideoDevice,
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
            });
        });
      }
    );
  };

  const leaveSession = () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = data.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    OV = null;
    setData({
      ...data,
      session: undefined,
      subscribers: [],
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
    });
  };

  const switchCamera = async () => {
    try {
      const devices = await OV.getDevices();
      var videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== data.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await data.session.unpublish(data.mainStreamManager);

          await data.session.publish(newPublisher);
          setData({
            ...data,
            currentVideoDevice: newVideoDevice[0],
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

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
  const getToken = async () => {
    const sessionId = await createSession(data.mySessionId);
    return await createToken(sessionId);
  };

  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  };

  const mySessionId = data.mySessionId;
  const myUserName = data.myUserName;

  return (
    <div className="">
      <RoomNavbar />
      {data.session === undefined ? (
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
      ) : null}

      {data.session !== undefined ? (
        <div id="session" className="bg-neutral-200 p-2 m-2 border rounded-3xl">
          <h1 id="session-title" className="text-4xl">
            {mySessionId}
          </h1>
          <div
            id="video-container"
            className="grid grid-rows-2 grid-cols-4 gap-2 p-2"
          >
            {data.publisher !== undefined ? (
              <div
                className="bg-green-500 p-1 "
                onClick={() => handleMainVideoStream(data.publisher)}
              >
                <UserVideoComponent
                  streamManager={data.publisher}
                  session={data.session}
                />
              </div>
            ) : null}
            {/* 나말고 */}
            {data.subscribers.map((sub, i) => (
              <div
                key={sub.id}
                className="bg-teal-500 p-1"
                onClick={() => handleMainVideoStream(sub)}
              >
                <span>{sub.id}</span>
                <UserVideoComponent
                  streamManager={sub}
                  session={data.session}
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-3">
              <Chat myUserName={myUserName} session={data.session} />
            </div>

            <div className="col-span-1 grid grid-cols-2 gap-2">
              <button className="bg-mc1">A팀</button>
              <button className="bg-mc8">B팀</button>
              <button className="col-span-2 bg-mc3">준비</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Room;
