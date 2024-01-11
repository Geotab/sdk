import { useState, useContext } from "react";
import MenuContext from "../../menuContext";
import { LogoGeotabSDK } from "../Logo/LogoGeotabSDK";
import { Link } from "react-router-dom";
import { IconSearch } from "@geotab/react-component-library";
import SearchModal from "../SearchModal/SearchModal";
import "./header.scss";
import { HeaderSections } from "./headerSectionsEnum";

interface HeaderProps {
  isLandingPage: boolean;
}

export default function Header({ isLandingPage }: HeaderProps): JSX.Element {
  const { activeSiteSection, setActiveSiteSection } = useContext(MenuContext);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isLanding, setIsLanding] = useState(isLandingPage);

  const openSearchModal = (): void => {
    setSearchModalOpen(true);
  };

  const closeSearchModal = (): void => {
    setSearchModalOpen(false);
  };

  const handleLinkClick = (target: string): void => {
    setActiveSiteSection(target);
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
              activeSiteSection === HeaderSections.MyGeotab ? "active-button" : ""
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
              activeSiteSection === HeaderSections.MyAdmin ? "active-button" : ""
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
              activeSiteSection === HeaderSections.Drive ? "active-button" : ""
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
              activeSiteSection === HeaderSections.Hardware ? "active-button" : ""
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
            readOnly
          />
        </div>
      </div>
      <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
    </header>
  );
}
