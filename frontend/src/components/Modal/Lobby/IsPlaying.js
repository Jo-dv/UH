import useClick from "../../../hooks/useClick";

const IsPlaying = ({ isPlaying, onClose }) => {
  const { playClick } = useClick();
  return (
    <>
      {isPlaying && (
        <div
          onClick={() => {
            onClose();
            playClick();
          }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <section
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl border-gray-200 border shadow-lg p-5 md:p-6 mx-2"
          >
            <p className="flex justify-center items-center text-lg font-medium text-gray-900 mb-4">
              게임 중입니당!
            </p>
            <div className="flex justify-center items-center text-lg font-medium mt-2">
              <button
                onClick={() => {
                  onClose();
                  playClick();
                }}
                className="bg-tab10 hover:bg-[#95c75a] py-2 px-4 rounded-xl"
              >
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
