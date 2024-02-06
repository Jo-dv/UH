import React, { useState } from "react";
import LogOutModal from "../Modal/LogOutModal";

const LogOutTab = () => {
  const [logout, setLogout] = useState(false);

  return (
    <>
      <button
        className="py-2 px-5 text-xl text-center rounded-t-lg bg-tab11 transform origin-bottom transition duration-200 hover:scale-y-125"
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
