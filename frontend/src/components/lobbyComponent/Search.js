const Search = (props) => {
  return (
    <div className=" col-start-2 col-end-7 row-start-1 row-end-2">
      <div className="flex items-center mx-1 mt-4">
        <button
          onClick={() => {
            props.setIsSearchPlaying(!props.isSearchPlaying);
          }}
          className="mx-2 px-2 border rounded-3xl bg-whitem-4 bg-white"
        >
          {props.isSearchPlaying === false ? "전체 보기" : "대기방만 보기"}
        </button>
        <select
          value={props.selectedGame}
          onChange={props.handleChangeOfGame}
          className="bg-whitem-4 mr-2 border rounded-3xl bg-white"
        >
          <option value="">전체 게임</option>
          <option value="game1">고요 속의 외침</option>
          <option value="game2">인물 맞추기</option>
        </select>

        <div
          className="flex flex-grow items-center space-x-2 bg-whitem-4 mr-2 border rounded-3xl bg-white"
          onSubmit={props.handleSubmit}
        >
          <input
            className="flex-grow bg-whitem-4 ml-3 border rounded-3xl bg-white"
            type="search"
            placeholder="방 제목을 주세요!"
            maxLength="20"
            value={props.searchRoomTittle}
            onChange={props.handleChangeOfRoomTittle}
          />
          <button type="submit" className="pr-4 bg-whitem-4 m-1 rounded-3xl bg-white">
            검색
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
