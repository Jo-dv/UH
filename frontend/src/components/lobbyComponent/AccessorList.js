const AccessorsList = (props) => {
  return (
    <div>
      <div className="col-start-1 col-end-2 row-start-2 row-end-8 m-2 p-2 divide-gray-500 rounded-md border">
        {props.accessors.map((accessor, i) => (
          <p i={i}>{accessor.name}</p>
        ))}
      </div>
    </div>
  );
};

export default AccessorsList;
