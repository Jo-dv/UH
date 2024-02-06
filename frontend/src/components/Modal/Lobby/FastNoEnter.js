const FastNoEnter = ({ showNoEnter, onClose }) => {
  console.log("실행됨!");
  return (
    <>
      {showNoEnter && (
        <div
          onClick={onClose}
          className="w-screen h-screen absolute inset-0
flex justify-center items-center"
        >
          <section
            onClick={(e) => e.stopPropagation()}
            className="bg-formBG min-w-80 min-h-40 rounded-2xl border-2 border-modalBorder
  flex flex-col justify-center items-center z-50"
          >
            <p className="text-xl text-center p-4">입장할 수 있는 방이 없습니다.</p>
            <div>
              <button onClick={onClose} className="bg-formButton py-2 px-4 m-2 rounded">
                확인
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default FastNoEnter;
