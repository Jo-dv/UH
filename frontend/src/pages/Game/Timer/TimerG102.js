import { useEffect, useRef, useState } from "react";

const Timer102 = ({ maxTime, time, setTime, setIsGameEnd }) => {
  const startTime = useRef(null);
  const nowTime = useRef(null);
  const [delay, setDelay] = useState(500);
  const [isRunning, setIsRunning] = useState(true);

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
      setTime(nowTime.current);
    }

    if (time > maxTime) {
      setIsRunning(false);
      setIsGameEnd(true);
    }
  };

  useInterval(
    () => {
      timePlay();
    },
    isRunning ? delay : null
  );

  return (
    <meter
      min="0"
      max={maxTime}
      optimum={maxTime / 4}
      low={maxTime / 2}
      high={(maxTime * 3) / 4}
      value={time}
      className="w-full h-10 absolute top-[-10px]"
    ></meter>
  );
};

export default Timer102;

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
