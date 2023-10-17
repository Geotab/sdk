import React, { useState, useContext } from "react";
import MenuContext from "../../menuContext";
import { LogoGeotabSDK } from "../Logo/LogoGeotabSDK";
import { Link } from "react-router-dom";
import SearchModal from "../../components/Header/SearchModal";
import "./header.scss";

export default function Header(props: any) {
  const { active, setActive } = useContext(MenuContext);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  const openSearchModal = () => {
    setSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setSearchModalOpen(false);
  };

  const handleLinkClick = (target: string) => {
    setActive(target);
  };

  return (
    <header className="header-container">
      {props.isLandingPage && <LogoGeotabSDK className="geotab-sdk-logo" />}
      <div className="tabs-container">
        <div
          className={`tab-item ${active === "myGeotab" ? "active-button" : ""}`}
        >
          <Link
            to="/myGeotabIntroduction"
            onClick={() => handleLinkClick("myGeotab")}
          >
            myGeotab
          </Link>
        </div>
        <div
          className={`tab-item ${active === "myAdmin" ? "active-button" : ""}`}
        >
          <Link
            to="/myAdminIntroduction"
            onClick={() => handleLinkClick("myAdmin")}
          >
            myAdmin
          </Link>
        </div>
        <div
          className={`tab-item ${active === "Drive" ? "active-button" : ""}`}
        >
          <Link
            to="/driveIntroduction"
            onClick={() => handleLinkClick("Drive")}
          >
            Drive
          </Link>
        </div>
        <div
          className={`tab-item ${active === "Hardware" ? "active-button" : ""}`}
        >
          <Link
            to="/hardwareIntroduction"
            onClick={() => handleLinkClick("Hardware")}
          >
            Hardware
          </Link>
        </div>
      </div>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search..."
          onClick={openSearchModal}
          className="search-bar-input"
        />
      </div>
      <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
    </header>
  );
}
