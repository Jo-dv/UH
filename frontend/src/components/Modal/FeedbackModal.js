const FeedbackModal = (props) => {
  return (
    <>
      <div
        className="min-w-100 min-h-96 absolute inset-0
    flex justify-center items-center"
      >
        <div className=" bg-formBG rounded-2xl border-2 border-modalBorder justify-center items-center p-2 flex flex-col">
          <div className="text-center">
            <label>피드백</label>
            <div>
              <textarea
                placeholder="피드백을 입력해주세요!"
                className="m-1 px-2 
          border rounded-3xl bg-white"
              />
            </div>
            <button onClick={props.setFeedback} className="bg-formButton py-2 px-4 m-2 rounded">
              보내기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackModal;
