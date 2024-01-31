const IsPlaying = ({ isPlaying, onClose }) => {
  console.log("실행됨!");
  return (
    <>
      {isPlaying && (
        <div
          onClick={onClose}
          className="w-screen h-screen absolute inset-0
flex justify-center items-center"
        >
          <section
            onClick={(e) => e.stopPropagation()}
            className="bg-formBG min-w-80 min-h-40 rounded-2xl border-2 border-modalBorder
  flex flex-col justify-center items-center"
          >
            <p className="text-xl text-center p-4">게임 중입니당!</p>
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

export default IsPlaying;
