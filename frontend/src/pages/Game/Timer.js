import { useEffect, useRef, useState } from "react";

const Timer = ({
  maxTime,
  time,
  setTime,
  maxRound,
  round,
  setRound,
  changeTeamTurn,
  TeamTurn,
  setTeamTurn,
  isHost,
  session,
}) => {
  const intervalRef = useRef(null);
  // console.log(maxTime);
  // const sendTime = (t) => {
  //   if (isHost) {
  //     session
  //       .signal({
  //         data: t, // Any string (optional)
  //         to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
  //         type: "game-time", // The type of message (optional)
  //       })
  //       .then(() => {
  //         // console.log("소켓 시간 보냄", t);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // };

  // session.on("signal:game-time", (event) => {
  //   // console.log("소켓 시간 받음", time);
  //   const T = Number(event.data);
  //   setTime(T);
  //   // if (T >= maxTime) {
  //   //   changeTeamTurn();
  //   //   plusRound();
  //   // }
  // });

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime((prevCount) => {
        if (prevCount >= maxTime) {
          // clearInterval(intervalRef.current); // 카운트가 1이면 타이머 정지
          prevCount = 0;
          changeTeamTurn();
          console.log(TeamTurn);
          setRound((r) => {
            if (r > maxRound) {
              clearInterval(intervalRef.current);
            }
            return r + 1;
          });
        }
        return prevCount + 1000;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current); // 컴포넌트가 언마운트될 때 타이머 정리
  }, []);

  return (
    <meter
      min="0"
      max={maxTime}
      optimum={maxTime / 4}
      low={maxTime / 2}
      high={(maxTime * 3) / 4}
      value={time}
      onClick={() => setTime(0)}
    ></meter>
  );
};

export default Timer;

/*
meter {
    appearance: auto;
    box-sizing: border-box;
    display: inline-block;
    block-size: 1em;
    inline-size: 5em;
    vertical-align: -0.2em;
    -webkit-user-modify: read-only !important;
}
*/
