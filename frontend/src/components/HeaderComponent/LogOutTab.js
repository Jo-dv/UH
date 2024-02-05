import React, { useState } from "react";
import LogOutModal from "../Modal/LogOutModal";

const LogOutTab = () => {
  const [logout, setLogout] = useState(false);

  return (
    <>
      <button
        className="w-24 text-center rounded-t-lg bg-stone-300 p-2 transform origin-bottom transition duration-200 hover:scale-y-125"
        onClick={() => {
          setLogout(!logout);
        }}
      >
        로그아웃
      </button>
      {logout === true ? <LogOutModal logout={logout} setLogout={setLogout} /> : null}
    </>
  );
};
export default LogOutTab;
