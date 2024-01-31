import React, { useState } from "react";
import axios from "axios";

const FeedbackModal = (props) => {
  const [feedbackContent, setFeedback] = useState("");
  const userSeq = sessionStorage.getItem("userSeq");
  const [ModalOpen, setModalOpen] = useState(false);
  const modalOnOff = () => {
    setModalOpen(!ModalOpen);
  };

  const onChange = (e) => {
    setFeedback(e.currentTarget.value);
  };
  // sendFeedback console 버전
  const sendFeedbackConsole = () => {
    console.log({ userSeq, feedbackContent });
    props.setFeedback(false);
  };

  // 피드백 내용을 가지고 axios 요청
  const sendFeedback = async () => {
    try {
      await axios.post("http://localhost:5000/feedback", { userSeq, feedbackContent });
      console.log({ userSeq, feedbackContent });
      props.setFeedback(false);
    } catch (error) {
      console.error("feedback 전송 실패", error);
    }
  };
  return (
    <>
      <div
        onClick={modalOnOff}
        className="min-w-100 min-h-96 absolute inset-0
    flex justify-center items-center"
      >
        <form
          onClick={(e) => e.stopPropagation()}
          className=" bg-formBG rounded-2xl border-2 border-modalBorder justify-center items-center p-2 flex flex-col"
        >
          <div className="text-center">
            <label>피드백</label>
            <div>
              <textarea
                placeholder="피드백을 입력해주세요!"
                className="m-1 px-2 
          border rounded-3xl bg-white"
                value={feedbackContent}
                onChange={onChange}
              />
            </div>
            <button onClick={sendFeedback} className="bg-formButton py-2 px-4 m-2 rounded">
              보내기
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FeedbackModal;
