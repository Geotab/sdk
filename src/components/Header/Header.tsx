import React, { useState, useContext } from "react";
import MenuContext from "../../menuContext";
import { LogoGeotabSDK } from "../Logo/LogoGeotabSDK";
import { Link } from "react-router-dom";
import { IconSearch } from "./IconSearch";
import SearchModal from "../../components/Header/SearchModal";
import "./header.scss";
import { HeaderSections } from "./headerSectionsEnum";

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
              active === HeaderSections.MyGeotab ? "active-button" : ""
            }`}
          >
            <Link
              to="/myGeotab/introduction"
              onClick={() => handleLinkClick(HeaderSections.MyGeotab)}
            >
              myGeotab
            </Link>
          </div>
          <div
            className={`header-menu-tab ${
              active === HeaderSections.MyAdmin ? "active-button" : ""
            }`}
          >
            <Link
              to="/myAdmin/introduction"
              onClick={() => handleLinkClick(HeaderSections.MyAdmin)}
            >
              myAdmin
            </Link>
          </div>
          <div
            className={`header-menu-tab ${
              active === HeaderSections.Drive ? "active-button" : ""
            }`}
          >
            <Link
              to="/drive/introduction"
              onClick={() => handleLinkClick(HeaderSections.Drive)}
            >
              Drive
            </Link>
          </div>
          <div
            className={`header-menu-tab ${
              active === HeaderSections.Hardware ? "active-button" : ""
            }`}
          >
            <Link
              to="/hardware/introduction"
              onClick={() => handleLinkClick(HeaderSections.Hardware)}
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
          />
        </div>
      </div>
      <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
    </header>
  );
}
