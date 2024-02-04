import { useState } from "react";

const GameScrollSelector = ({ onGameCategory, extraOptions = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    onGameCategory(selectedValue);
  };

  return (
    <select
      className="bg-whitem-4 mr-2 p-2 border rounded-3xl bg-white"
      onChange={handleCategoryChange}
      value={selectedCategory}
    >
      <option value="">전체 게임</option>
      <option value="101">고요 속의 외침</option>
      <option value="102">인물 맞추기</option>
      {extraOptions.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};

export default GameScrollSelector;
