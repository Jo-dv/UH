import { useState } from "react";

const AnswerInput = ({ myUserName, session }) => {
  const [answerMsg, setAnswerMsg] = useState("");

  const sendAnswer = (e) => {
    console.log("a왬노애");
    e.preventDefault();
    // console.log(session);
    session
      .signal({
        data: answerMsg, // Any string (optional)
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "game-answer", // The type of message (optional)
      })
      .then(() => {
        console.log("보냄 :", answerMsg);
        setAnswerMsg("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  session.on("signal:game-answer", (event) => {
    console.log("받음game :", event.data); // Message
  });

  return (
    <form
      className="px-2
          border rounded-3xl bg-white
          flex flex-row"
      onSubmit={sendAnswer}
    >
      <input
        type="text"
        placeholder="정답을 입력해 주세요!"
        className="grow"
        maxLength="50"
        value={answerMsg}
        onChange={(e) => setAnswerMsg(e.target.value)}
      />
      <button className="w-11 m-1 pl-2 border-l-2 border-solid" type="submit">
        정답
      </button>
    </form>
  );
};

export default AnswerInput;
