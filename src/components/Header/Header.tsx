import React, { useState, useContext } from "react";
import MenuContext from "../../menuContext";
import { LogoGeotabSDK } from "../Logo/LogoGeotabSDK";
import { Link } from "react-router-dom";
import { IconSearch } from "@geotab/react-component-library"
import SearchModal from "../SearchModal/SearchModal"
import "./header.scss";

export default function Header(props: any) {
  const { active, setActive } = useContext(MenuContext);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isLanding, setIsLanding] = useState(props.isLandingPage);

  const openSearchModal = () => {
    setSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setSearchModalOpen(false);
  };

  const handleLinkClick = (target: string) => {
    setActive(target);
    setIsLanding(false);
  };

  return (
    <header className="header-container">
      <div className="header-container__left">
        <div className="header-logo-container">
          {isLanding && <LogoGeotabSDK className="geotab-sdk-logo" />}
        </div>
        <div className="header-menu-tabs">
          <div
            className={`header-menu-tab ${
              active === "myGeotab" ? "active-button" : ""
            }`}
          >
            <Link
              to="/myGeotab/introduction"
              onClick={() => handleLinkClick("myGeotab")}
            >
              myGeotab
            </Link>
          </div>
          <div
            className={`header-menu-tab ${
              active === "myAdmin" ? "active-button" : ""
            }`}
          >
            <Link
              to="/myAdmin/introduction"
              onClick={() => handleLinkClick("myAdmin")}
            >
              myAdmin
            </Link>
          </div>
          <div
            className={`header-menu-tab ${
              active === "Drive" ? "active-button" : ""
            }`}
          >
            <Link
              to="/drive/introduction"
              onClick={() => handleLinkClick("Drive")}
            >
              Drive
            </Link>
          </div>
          <div
            className={`header-menu-tab ${
              active === "Hardware" ? "active-button" : ""
            }`}
          >
            <Link
              to="/hardware/introduction"
              onClick={() => handleLinkClick("Hardware")}
            >
              Hardware
            </Link>
          </div>
        </div>
      </div>
      <div className="header__container__right">
        <div className="header-search-bar-container">
          <div className="header-search-icon">
            <IconSearch />
          </div>
          <input
            type="text"
            placeholder="Search..."
            onClick={openSearchModal}
            className="header-search-bar-input"
            readOnly
          />
        </div>
      </div>
      <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
    </header>
  );
}
