import { useState } from "react";

const Modal = ({ btnText, content, cancelText, okText, onClick, ...props }) => {
  const [ModalOpen, setModalOpen] = useState(false);
  const modalOnOff = () => {
    setModalOpen(!ModalOpen);
  };

  return (
    <>
      <button onClick={modalOnOff}>{btnText}</button>
      {ModalOpen && (
        <div
          onClick={modalOnOff}
          className="w-screen h-screen absolute inset-0
flex justify-center items-center"
        >
          <section
            onClick={(e) => e.stopPropagation()}
            className="bg-formBG min-w-80 min-h-40 rounded-2xl border-2 border-modalBorder
  flex flex-col justify-center items-center"
          >
            <p className="text-xl text-center p-4">{content}</p>
            <div className="">
              <button onClick={modalOnOff} className="bg-cancelButton py-2 px-4 m-2 rounded">
                {cancelText}
              </button>

              <button onClick={onClick} className="bg-formButton py-2 px-4 m-2 rounded">
                {okText}
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Modal;
