import React, { useEffect } from "react";
import useClick from "../../../hooks/useClick";
const KickedModal = ({ isOpen, onClose }) => {
  const { playClick } = useClick();
  useEffect(() => {
    let timer;
    if (isOpen) {
      // 모달창이 열린 후 3초 뒤에 닫히도록
      timer = setTimeout(onClose, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white text-center rounded-3xl border-gray-200 border shadow-lg p-3 md:p-6 mx-2 w-60">
        <h2 className="text-xl text-center font-bold">알림</h2>
        <p className="my-4 ">강퇴당했어요</p>
        <button
          onClick={() => {
            onClose();
            playClick();
          }}
          className="px-4 py-2 bg-tab10 rounded-xl hover:bg-tab10hover "
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default KickedModal;
