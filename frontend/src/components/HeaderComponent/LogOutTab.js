import React, { useState } from "react";
import LogOutModal from "../Modal/LogOutModal";

const LogOutTab = () => {
  const [logout, setLogout] = useState(false);

  return (
    <>
      <h3
        className="bg-mc7 p-2"
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
