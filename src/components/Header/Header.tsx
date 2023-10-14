import React, { useState } from "react";
import { MenuContext } from "../../menuContext";
import { LogoGeotabSDK } from "../Logo/LogoGeotabSDK";
import { Link } from "react-router-dom";
import SearchModal from "../../components/Header/SearchModal";
import "./header.scss";

export default function Header(props: any) {
  const [active, setActive] = useState("");
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  const openSearchModal = () => {
    setSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setSearchModalOpen(false);
  };

  const handleLinkClick = (target: string) => {
    setActive(target);
    console.log("Active state is now:", target);
  };

  const isActive = (target: string) => {
    const isActiveClass = target === active ? "active-button" : "";
    console.log("isActive for", target, "is", isActiveClass); // Add this line
    return isActiveClass;
  };

  return (
    <MenuContext.Provider value={active}>
      <header className="header-container">
        {props.isLandingPage && <LogoGeotabSDK className="geotab-sdk-logo" />}
        <div className="tabs-container">
          <div className={`tab-item ${isActive("myGeotab")}`}>
            <Link
              to="/myGeotabIntroduction"
              onClick={() => handleLinkClick("myGeotab")}
            >
              myGeotab
            </Link>
          </div>
          <div className={`tab-item ${isActive("myAdmin")}`}>
            <Link
              to="/myAdminIntroduction"
              onClick={() => handleLinkClick("myAdmin")}
            >
              myAdmin
            </Link>
          </div>
          <div className={`tab-item ${isActive("Drive")}`}>
            <Link
              to="/driveIntroduction"
              onClick={() => handleLinkClick("Drive")}
            >
              Drive
            </Link>
          </div>
          <div className={`tab-item ${isActive("Hardware")}`}>
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
    </MenuContext.Provider>
  );
}
