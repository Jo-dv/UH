import { useEffect, useRef, useState } from "react";

const Timer = ({ maxT, changeTeamTurn }) => {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);
  // console.log(maxTime);
  let maxTime = maxT;
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount >= maxTime) {
          clearInterval(intervalRef.current); // 카운트가 1이면 타이머 정지
        }
        return prevCount + 10;
      });
    }, 10);

    return () => clearInterval(intervalRef.current); // 컴포넌트가 언마운트될 때 타이머 정리
  }, []);

  return (
    <meter
      min="0"
      max={maxTime}
      optimum={maxTime / 4}
      low={maxTime / 2}
      high={(maxTime * 3) / 4}
      value={count}
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
