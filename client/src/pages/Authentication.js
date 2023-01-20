import React, { useState } from "react";

import LoginCSS from "../assets/Login.module.css";
import Registration from "../features/authentication/components/Registration";
import Login from "../features/authentication/components/Login";

const Authentication = () => {
  const [pwFieldType, setPwFieldType] = useState("password");
  const [isLogin, setIsLogin] = useState(true);
  const togglePwVisibility = () => {
    setPwFieldType((fieldType) => {
      if (fieldType === "password") setPwFieldType("text");
      else setPwFieldType("password");
    });
  };

  const toggleLoginRegister = () => {
    setIsLogin((isLogin) => {
      setIsLogin(!isLogin);
    });
  };

  return (
    <div className={LoginCSS.container}>
      <div className={LoginCSS.forms}>
        {isLogin && (
          <Login
            pwFieldType={pwFieldType}
            togglePwVisibility={togglePwVisibility}
            toggleLoginRegister={toggleLoginRegister}
          />
        )}
        {!isLogin && (
          <Registration
            pwFieldType={pwFieldType}
            togglePwVisibility={togglePwVisibility}
            toggleLoginRegister={toggleLoginRegister}
          />
        )}
      </div>
    </div>
  );
};

export default Authentication;
