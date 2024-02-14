import React from "react";
import useClick from "../../../hooks/useClick";
const FriendAlready = (props) => {
  const { playClick } = useClick();
  return (
    <div
      className="bg-white rounded-3xl border-gray-200 border shadow-lg p-5 md:p-6 mx-2"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-lg font-medium text-gray-900 mb-4">{props.text}</h2>
      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={() => {
            props.setModal();
            playClick();
          }}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-xl"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default FriendAlready;
