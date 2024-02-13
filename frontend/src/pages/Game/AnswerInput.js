import { useEffect, useRef, useState } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
const AnswerInput = ({
  myUserName,
  session,
  answer,
  plusQuizIndex,
  Team,
  plusScore,
  changeTeamIndex,
  setTurnTime,
  quizIndex,
  setQuizIndex,
  G101form,
}) => {
  const [answerMsg, setAnswerMsg] = useState("");
  const [sendList, setSendList] = useState([]);
  const ulRef = useRef(null);
  const [isAnswer, setIsAnswer] = useState(false);

  const sendAnswer = (e) => {
    // console.log("정답제출", answer);
    e.preventDefault();
    // setAnswerMsg("");
    // console.log(session);

    const data = JSON.stringify({
      ans: answerMsg,
      team: Team,
      quizIndex: quizIndex,
      myUserName: myUserName,
    });
    // console.log("정답창에서 보냄", data);
    session
      .signal({
        data: data, // Any string (optional)
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "game-answer", // The type of message (optional)
      })
      .then(() => {
        // console.log("정답제출 보냄 :", answerMsg);
        setAnswerMsg("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // console.log("정답창에서 받음", answer);
  session.on("signal:game-answer", (event) => {
    console.log("정답창에서 받음", answer);
    const dataObj = JSON.parse(event.data);
    if (dataObj.ans === answer) {
      // plusQuizIndex();
      setQuizIndex(dataObj.quizIndex + 1);
      plusScore(dataObj.team);
      changeTeamIndex();
      setIsAnswer(true);
      setTimeout(() => setIsAnswer(false), 1000);
    } else {
      const msg = dataObj.myUserName + " : " + dataObj.ans;
      setSendList([...sendList, msg]);
    }
  });

  useEffect(() => {
    // 컴포넌트가 업데이트 될 때마다 스크롤을 맨 아래로 이동
    if (ulRef.current) {
      ulRef.current.scrollTop = ulRef.current.scrollHeight;
    }
  }, [sendList]);

  // useEffect(() => {
  //   setTimeout(() => setIsAnswer(false), 1000);
  // }, [isAnswer]);

  return (
    <>
      {isAnswer ? (
        <TaskAltIcon
          className="absolute bottom-20 animate-jump-in"
          color="success"
          sx={{ fontSize: 400 }}
        />
      ) : null}
      <session>
        <ul
          ref={ulRef}
          className=" px-2 w-full h-[200px] overflow-auto flex flex-col justify-end items-end absolute bottom-[68px] left-0"
        >
          {sendList.map((item, index) => {
            return (
              <li className="m-2 " key={index}>
                <span className="bg-tab1 opacity-50 text-white p-1 rounded-xl">{item}</span>
              </li>
            );
          })}
        </ul>
        {G101form ? null : (
          <form
            className="px-2 border rounded-3xl bg-white flex flex-row overflow-hidden z-20"
            onSubmit={sendAnswer}
          >
            <input
              type="text"
              placeholder="정답을 입력해 주세요!"
              className="grow"
              maxLength="10"
              value={answerMsg}
              onChange={(e) => setAnswerMsg(e.target.value)}
            />
            <button className="w-11 m-1 pl-2 border-l-2 border-solid" type="submit">
              정답
            </button>
          </form>
        )}
      </session>
    </>
  );
};

export default AnswerInput;
