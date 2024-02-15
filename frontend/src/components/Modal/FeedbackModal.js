import React, { useState } from "react";
import axios from "../../api/axios.js";
import useClick from "../../hooks/useClick";

const FeedbackModal = (props) => {
  const [feedbackContent, setFeedback] = useState("");
  const userSeq = sessionStorage.getItem("userSeq");
  const [feedbackError, setFeedbackError] = useState("");
  const [ModalOpen, setModalOpen] = useState(false);
  const { playClick } = useClick();
  const modalOnOff = () => {
    setModalOpen(!ModalOpen);
  };

  const onChange = (e) => {
    setFeedback(e.currentTarget.value);
    setFeedbackError(""); // 입력 시 에러 메시지 초기화
  };
  // sendFeedback console 버전
  const sendFeedbackConsole = () => {
    // console.log({ userSeq, feedbackContent });
    props.setFeedback(false);
  };
  // 모달을 닫는 함수
  const closeModal = () => {
    props.setFeedback(false); // 부모 컴포넌트에 모달 닫힘 상태 전달
    setFeedback(""); // 피드백 입력 내용 초기화
    setFeedbackError(""); // 에러 메시지 초기화
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
      // console.log({ userSeq, feedbackContent });
      // props.setFeedback(false);
      closeModal();
    } catch (error) {
      console.error("feedback 전송 실패", error);
    }
  };
  return (
    <>
      <div
        onClick={() => {
          if (feedbackContent === "") {
            props.setFeedback(!props.feedback);
          } else {
            setFeedbackError("피드백 전송해주세요ㅠㅠ");
          }
        }}
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      >
        <form
          onClick={(e) => e.stopPropagation()}
          className=" bg-white rounded-3xl border-gray-200 border shadow-lg p-5 md:p-4 mx-2 w-80"
        >
          <div className=" text-center text-lg font-medium text-gray-900">
            <label>피드백</label>
            <div className="mt-2">
              <textarea
                placeholder="피드백을 입력해주세요!"
                className="m-1 px-2 
          border border-gray-400 rounded-xl bg-white text-center resize-none w-full h-32"
                value={feedbackContent}
                onChange={onChange}
              />
              {feedbackError && <div className="text-red-500">{feedbackError}</div>}
            </div>
            <button onClick={() => {
              closeModal();
              playClick();
            }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 mr-2 rounded-xl">
              취소
            </button>
            <button onClick={() => {
              sendFeedback();
              playClick();
            }}
              className="bg-tab10 py-2 px-3 m-2 rounded-xl hover:bg-tab10hover">
              보내기
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FeedbackModal;
