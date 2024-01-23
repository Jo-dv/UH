const Search = (props) => {
  return (
    <div className="m-1 col-start-3 col-end-9 row-start-1 row-end-2 flex space-x-4 items-center rounded-md border">
      <button
        className="m-2 px-2 border rounded-3xl bg-white"
        onClick={() => {
          props.setIsSearchPlaying(!props.isSearchPlaying);
        }}
      >
        {props.isSearchPlaying === false ? "전체 보기" : "대기방만 보기"}
      </button>
      <select
        value={props.selectedGame}
        onChange={props.handleChangeOfGame}
        className="m-2 px-2 border rounded-3xl bg-white"
      >
        <option value="">전체 게임</option>
        <option value="game1">고요 속의 외침</option>
        <option value="game2">인물 맞추기</option>
      </select>

      <form
        className="m-2 px-2 
          border rounded-3xl bg-white
          flex"
        onSubmit={props.handleSubmit}
      >
        <input
          type="search"
          placeholder="방 제목을 주세요!"
          className="flex-row"
          maxLength="20"
          value={props.searchRoomTittle}
          onChange={props.handleChangeOfRoomTittle}
        />
        <button className="flex-none m-1 px-2 border-l-2 border-solid" type="submit">
          검색
        </button>
      </form>
    </div>
  );
};

export default Search;
