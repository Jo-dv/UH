import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios.js";
import useStore from "../../store/UserAuthStore";

const InviteModal = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        // onClick={() => {
        //   props.setLogout(false);
        // }}
      >
        <div
          className="bg-white rounded-3xl border-gray-200 border shadow-lg p-5 md:p-6 mx-2"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {props.fromNickname}님에게 초대가 도착했습니다
          </h2>
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={() => {
                props.handleFollow();
                props.setInvite(false);
              }}
              className="bg-tab10 hover:bg-tab10hover py-2 px-4 rounded-xl"
            >
              따라가기
            </button>

            <button
              onClick={() => props.setInvite(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-xl"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InviteModal;
