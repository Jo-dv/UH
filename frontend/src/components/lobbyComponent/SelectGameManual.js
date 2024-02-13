import React, { useState } from "react";
import GameScrollSelector from "./GameScrollSelector";
import Manual from "./Manual";

const SelectGameManual = ({ onGameCategoryView }) => {
  const [viewGameCategoryManual, setViewGameCategoryManual] = useState("101");

  const handleGameCategoryView = (selectedCategory) => {
    setViewGameCategoryManual(selectedCategory);
  };

  return (
    <div className="col-start-4 col-end-13 row-start-1 row-end-13 m-5">
      <div className="col-start-2 col-end-7 row-start-1 row-end-2">
        <GameScrollSelector onGameCategory={handleGameCategoryView} showAllOption={false} />
      </div>
      <div className="col-start-2 col-end-7 row-start-2 row-end-13 z-40">
        <Manual viewGameCategoryManual={viewGameCategoryManual} />
      </div>
    </div>
  );
};

export default SelectGameManual;
