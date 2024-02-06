import React, { useState } from "react";
import axios from "../../api/axios.js";

const FeedbackModal = (props) => {
  const [feedbackContent, setFeedback] = useState("");
  const userSeq = sessionStorage.getItem("userSeq");
  const [feedbackError, setFeedbackError] = useState("");
  const [ModalOpen, setModalOpen] = useState(false);
  const modalOnOff = () => {
    setModalOpen(!ModalOpen);
  };

  const onChange = (e) => {
    setFeedback(e.currentTarget.value);
    setFeedbackError(""); // 입력 시 에러 메시지 초기화
  };
  // sendFeedback console 버전
  const sendFeedbackConsole = () => {
    console.log({ userSeq, feedbackContent });
    props.setFeedback(false);
  };

  // 피드백 내용을 가지고 axios 요청
  const sendFeedback = async (e) => {
    e.preventDefault();
    if (!feedbackContent.trim()) {
      // feedbackContent가 빈 문자열이거나 공백만 있는 경우
      setFeedbackError("뭐라도 써주세요ㅠㅠ"); // 에러 메시지 설정
      return; // 함수 실행 중단
    }
    try {
      await axios.post("feedback", 
      { userSeq, feedbackContent }
      );
      console.log({ userSeq, feedbackContent });
      props.setFeedback(false);
    } catch (error) {
      console.error("feedback 전송 실패", error);
    }
  };
  return (
    <>
      <div
      onClick={() => {
        if ( feedbackContent === "" ) {
        props.setFeedback(!props.feedback);
      } else {
        setFeedbackError("피드백 전송해주세요ㅠㅠ");
      }
      }}
        className="min-w-100 min-h-96 absolute inset-0
    flex justify-center items-center z-50"
      >
        <form
          onClick={(e) => e.stopPropagation()}
          className=" bg-formBG rounded-md border-2 border-modalBorder justify-center items-center p-2 flex flex-col"
        >
          <div className="text-center">
            <label>피드백</label>
            <div>
              <textarea
                placeholder="피드백을 입력해주세요!"
                className="m-1 px-2 
          border rounded-md bg-white"
                value={feedbackContent}
                onChange={onChange}
              />
              {feedbackError && <div className="text-red-500">{feedbackError}</div>}
            </div>
            <button onClick={sendFeedback} className="bg-tab10 py-2 px-4 m-2 rounded">
              보내기
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FeedbackModal;
