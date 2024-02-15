import { useEffect, useRef, useState } from "react";
import Donut from "./Donut";

const TurnTimer = ({ maxTurnTime, turnTime, setTurnTime, quizIndex, plusQuizIndex }) => {
  const startTime = useRef(null);
  const nowTime = useRef(null);
  const [delay, setDelay] = useState(100);
  const [isRunning, setIsRunning] = useState(true);
  // const [time, setTime] = useState(0);
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const timePlay = () => {
    if (startTime.current === null) {
      startTime.current = Date.now();
    } else {
      nowTime.current = Date.now() - startTime.current;
      setTurnTime(nowTime.current);
    }

    if (turnTime >= maxTurnTime) {
      // console.log(nowTime.current, time);
      plusQuizIndex();
    }
  };
  useEffect(() => {
    startTime.current = Date.now();
    setTurnTime(0);
  }, [quizIndex]);

  useInterval(
    () => {
      timePlay();
    },
    isRunning ? delay : null
  );

  return (
    <Donut
      color="#F88585"
      percent={turnTime / maxTurnTime}
      size="200px"
      time={Math.floor((maxTurnTime - turnTime) / 1000) + 1}
    />
  );
};

export default TurnTimer;

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
