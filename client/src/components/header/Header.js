import React from "react";
import { Link } from "react-router-dom";
import HeaderCSS from "../../assets/Header.module.css";

import SearchBar from "../../features/searchTutors/components/SearchBar";
import logoImage from "../../assets/logo.png";
import { useLocation } from "react-router-dom";
import { MdLogin } from "react-icons/md";

const Header = () => {
  const path = useLocation().pathname;
  return (
    <div className={`container ${HeaderCSS.navBar}`}>
      <div className={HeaderCSS.appTitle}>
        <Link to={"/"} className={HeaderCSS.companyName}>
          <img className={HeaderCSS.logo} src={logoImage} alt="logo" />
          <h3 className={HeaderCSS.name}>Wise Paals</h3>
        </Link>
      </div>
      <div className={HeaderCSS.SearchBar}>{path != "/" && <SearchBar />}</div>
      <div className={HeaderCSS.links}>
        <Link to={"/addTutor"}>Teach</Link>
      </div>
      <div className={HeaderCSS.login}>
        <MdLogin /> <div className={HeaderCSS.loginText}>Login</div>
      </div>
    </div>
  );
};

export default Header;
