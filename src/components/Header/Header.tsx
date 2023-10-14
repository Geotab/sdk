import React, { useState } from "react";
import { MenuContext } from "../../menuContext";
import { LogoGeotabSDK } from "../Logo/LogoGeotabSDK";
import { Link } from "react-router-dom";
import SearchBar from "../../components/Searchbar/Searchbar";
import "./header.scss";

export default function Header(props: any) {
  const [active, setActive] = useState("myGeotab");

  return (
    <MenuContext.Provider value={active}>
      <header className="header-container">
        {props.isLandingPage && <LogoGeotabSDK className="geotab-sdk-logo" />}
        <div className="tabs-container">
          <div className="tab-item">
            <Link to="/myGeotabIntroduction">myGeotab</Link>
          </div>
          <div className="tab-item">
            <Link to="/myAdminIntroduction">myAdmin</Link>
          </div>
          <div className="tab-item">
            <Link to="/driveIntroduction">Drive</Link>
          </div>
          <div className="tab-item">
            <Link to="/hardwareIntroduction">Hardware</Link>
          </div>
        </div>

        <SearchBar className="searchbar" />
      </header>
    </MenuContext.Provider>
  );
}
