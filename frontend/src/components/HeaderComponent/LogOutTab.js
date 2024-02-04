import React, { useState } from "react";
import LogOutModal from "../Modal/LogOutModal";

const LogOutTab = () => {
  const [logout, setLogout] = useState(false);

  return (
    <>
      <h3
        className="w-24 text-center rounded-t-lg bg-tab6 p-2 transform origin-bottom transition duration-200 hover:scale-y-125"
        onClick={() => {
          setLogout(!logout);
        }}
      >
        로그아웃
      </h3>
      {logout === true ? <LogOutModal logout={logout} setLogout={setLogout} /> : null}
    </>
  );
};
export default LogOutTab;
