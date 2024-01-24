import React, { useState } from "react";
import axios from "axios";

const FeedbackModal = (props) => {
  const [feedback, setFeedback] = useState("");
  const userNickname = sessionStorage.getItem("userNickname");

  const onChange = (e) => {
    setFeedback(e.currentTarget.value);
  };
  // sendFeedback console 버전
  const sendFeedbackConsole = () => {
    console.log({userNickname, feedback});
    props.setFeedback(false);
  }
  // 피드백 내용을 가지고 axios 요청
  const sendFeedback = async () =>{
    try {
      await axios.post("http://localhost:5000/feedback", { feedback });
      props.setFeedback(false);
    } catch (error) {
      console.error("feedback 전송 실패", error);
    }
  };
  return (
    <>
      <div
        className="min-w-100 min-h-96 absolute inset-0
    flex justify-center items-center"
      >
        <div className=" bg-formBG rounded-2xl border-2 border-modalBorder justify-center items-center p-2 flex flex-col">
          <div className="text-center">
            <label>피드백</label>
            <div>
              <textarea
                placeholder="피드백을 입력해주세요!"
                className="m-1 px-2 
          border rounded-3xl bg-white"
                value={feedback}
                onChange={onChange}
              />
            </div>
            <button onClick={sendFeedbackConsole} className="bg-formButton py-2 px-4 m-2 rounded">
              보내기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackModal;
