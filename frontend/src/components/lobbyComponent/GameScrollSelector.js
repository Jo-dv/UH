import { useState } from "react";

const GameScrollSelector = ({ onGameCategory, extraOptions = [], showAllOption = true }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    onGameCategory(selectedValue);
  };

  return (
    <select
      className="basis-1/6 m-2 border rounded-3xl bg-white hover:bg-tab9"
      onChange={handleCategoryChange}
      value={selectedCategory}
    >
      {showAllOption && <option value="">전체 게임</option>}
      {extraOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
      <option value="101">고요 속의 외침</option>
      <option value="102">인물 맞추기</option>
    </select>
  );
};

export default GameScrollSelector;
