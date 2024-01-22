const AccessorsList = (props) => {
  return (
    <div>
      <div className="m-2 p-2 col-start-1 col-end-3 row-start-1 row-end-8  rounded-md border">
        <h2>접속자 목록</h2>
        {props.accessors.map((accessor, i) => (
          <p i={i}>{accessor.name}</p>
        ))}
      </div>
    </div>
  );
};

export default AccessorsList;
