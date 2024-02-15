import React from 'react';
import useClick from "../../../hooks/useClick";

const KickOutModal = ({ isOpen, onClose, onConfirm, userName }) => {
  const { playClick } = useClick();

  if (!isOpen) return null;

  return (
    <div className="z-40 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-3xl border-gray-200 border shadow-lg p-5 md:p-6 mx-2">
        <p className="mb-4">{userName}님을 정말로 강퇴하시겠습니까?</p>
        <div className="flex justify-center items-center space-x-4">
          <button onClick={() => {
            onClose();
            playClick();
          }}
            className="px-4 py-2 bg-gray-200 rounded-xl">취소</button>
          <button onClick={() => {
            onConfirm();
            playClick();
          }}
            className="mr-2 px-4 py-2 bg-tab1 rounded-xl">강퇴하기</button>
        </div>
      </div>
    </div>
  );
};

export default KickOutModal;