const CreateRoomModal = (props) => {
  return (
    <>
      <div
        className="min-w-100 min-h-96 absolute inset-0
    flex justify-center items-center"
      >
        <div className=" bg-formBG rounded-2xl border-2 border-modalBorder justify-center items-center p-2 flex flex-col">
          <div
            className="m-1 px-2 
          border rounded-3xl bg-white"
          >
            <label>
              방제목: <input type="text" placeholder="방 제목을 입력해주세요!" />
            </label>
          </div>
          <div
            className="m-1 px-2 
          border rounded-3xl bg-white"
          >
            <label>
              비밀번호: <input type="text" placeholder="비밀번호를 입력해주세요!" />
            </label>
          </div>
          <div
            className="m-1 px-2 
          border rounded-3xl bg-white"
          >
            참가인원:
            <label className="p-1 m-1">
              4명
              <input type="radio" value={4} name="num" />
            </label>
            <label className="p-1 m-1">
              6명
              <input type="radio" value={6} name="num" />
            </label>
            <label className="p-1 m-1">
              8명
              <input type="radio" value={8} name="num" />
            </label>
          </div>
          <div
            className="m-1 px-2 
          border rounded-3xl bg-white"
          >
            게임선택:
            <input type="radio" className="p-2 m-2" value={"고요속의 침묵"} name="game" />
            고요 속의 침묵
            <input type="radio" className="p-2 m-2" value={"인물 맞추기"} name="game" />
            인물 맞추기
          </div>
          <button onClick={props.setCreateRoom} className="p-2 m-1 rounded w-72 bg-formButton">
            방 만들기
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateRoomModal;
