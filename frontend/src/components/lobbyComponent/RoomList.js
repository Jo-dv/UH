import { OpenVidu } from "openvidu-browser";

import { useCallback, useEffect, useRef, useState } from "react";
import Rooms from "./Rooms";
import UseRoomListApiCall from "../../api/UseRoomListApiCall";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 방목록 조회 컴포넌트
const RoomList = () => {
  // 방 리스트를 받는 변수
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    UseRoomListApiCall()
      .then((rooms) => {
        setRooms(rooms);
      })
      .catch((error) => {
        console.error("RoomList 데이터 가져오기 오류: ", error);
      });
  }, []);

  // 콘솔창에 확인하는 작업
  console.log(rooms);

  // rooms 컴포넌트에 대한 참조를 저장할 배열
  const roomRefs = useRef([]);

  // 스크롤 기능 구현
  useEffect(() => {
    // IntersectionObserver 초기화
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
        } else {
          entry.target.style.opacity = 0;
        }
      });
    });

    // 각 Rooms 컴포넌트를 관찰 대상으로 추가
    roomRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // 컴포넌트가 언마운트될 때 observer 해제
    return () => {
      roomRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [rooms]); // rooms가 변경될 때마다 실행

  // 룸 입장시, token 발행
  const createToken = async (sessionId) => {
    const response = await axios.post(
      "http://localhost:5000/" + "tokens/" + sessionId,
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response.data);
    return response.data; // The token
  };

  // 룸에 join하기
  const OV = useRef(new OpenVidu());
  const [subscribers, setSubscribers] = useState([]);
  const [session, setSession] = useState(undefined);
  const navigate = useNavigate();

  const joinSession = useCallback(
    async (token, roomId) => {
      const mySession = OV.current.initSession();

      mySession.on("streamCreated", (event) => {
        const subscriber = mySession.subscribe(event.stream, undefined);
        setSubscribers((subscribers) => [...subscribers, subscriber]);
      });

      mySession.on("exception", (exception) => {
        console.warn(exception);
      });

      try {
        await mySession.connect(token);
        console.log("방 입장!");
        setSession(mySession);
        navigate(`/room`);
      } catch (error) {
        console.error("방 입장 못해용", error);
      }

      setSession(mySession);
    },
    [navigate]
  );

  return (
    <section className="p-3 border-7 border-modalBorder mt-4 col-start-2 col-end-7 row-start-2 row-end-13">
      <div className="flex flex-wrap mx-2 overflow-y-scroll h-[69vh]">
        {rooms.map((room, i) => (
          <div
            onClick={async () => {
              try {
                const token = await createToken(room.sessionId);
                await joinSession(token, room.roomId);
              } catch (error) {
                console.error("방 입장 못해용", error);
              }
            }}
            className="w-1/2"
            ref={(el) => (roomRefs.current[i] = el)}
            key={i}
          >
            <Rooms
              key={i}
              roomTitle={room.roomName}
              gameType={room.gameCategory}
              numberOfPeople={room.count}
              totalNumberOfPeople={room.max}
              isLocked={room.roomPassword}
              isPlaying={room.play}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoomList;
