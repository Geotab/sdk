import { Link } from "react-router-dom";
import MyGeotabImage from "./../assets/images/landingPage/mygeotabImage.svg";
import MyAdminImage from "./../assets/images/landingPage/myadminImage.svg";
import DriveImage from "./../assets/images/landingPage/driveImage.svg";
import HardwareImage from "./../assets/images/landingPage/hardwareImage.svg";

import "./pages.scss";
import { Page } from "../components";
import { HeaderSections } from "../components/Header/headerSectionsEnum";

export default function LandingPage() {
  return (
    <Page section={HeaderSections.Landing}>
      <div className="landing-page" data-testid="landing-page">
        <div className="landing-page__left">
          <div className="landing-page__text-container">
            <p className="title">This site provides tools for integrating with various types of Geotab products. </p>
            <div className="subtitle">
              <p>You will find the information and tools needed to develop software integrations with:</p>
              <ul>
                <li>MyGeotab</li>
                <li>MyAdmin</li>
                <li>Drive</li>
                <li>Hardware</li>
              </ul>
              <p>Please refer to <Link to="/" aria-label="View Toolkits">Toolkits</Link> for more information.</p>
            </div>
          </div>
        </div>
        <div className="landing-page__right">
          <div className="landing-page__button-container">
            <div className="landing-page__product-buttons-row">
              <Link className="landing-page__product-button" to="/myGeotabIntroduction">
                <img src={MyGeotabImage} alt="Navigate to MyGeotab introduction" />
              </Link>
              <Link className="landing-page__product-button" to="/myAdminIntroduction">
                <img src={MyAdminImage} alt="Navigate to MyAdmin introduction" />
              </Link>
            </div>
            <div className="landing-page__product-buttons-row">
              <Link className="landing-page__product-button" to="/driveIntroduction">
                <img src={DriveImage} alt="Navigate to Drive introduction" />
              </Link>
              <Link className="landing-page__product-button" to="/hardwareIntroduction">
                <img src={HardwareImage} alt="Navigate to Hardware introduction" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};