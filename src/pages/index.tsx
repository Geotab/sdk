import React from "react";
import { Link } from "react-router-dom";
import MyGeotabImage from "./../assets/images/landingPage/mygeotabImage.svg";
import MyAdminImage from "./../assets/images/landingPage/myadminImage.svg";
import DriveImage from "./../assets/images/landingPage/driveImage.svg";
import HardwareImage from "./../assets/images/landingPage/hardwareImage.svg";
import "./pages.scss";

const LandingPage = () => {
  return (
    <div className="landing-page" data-testid="landing-page">
      <div className="landing-page__left">
        <div className="landing-page__text-container">
          <p className="text--medium">This site provides tools for integrating with various types of Geotab products. </p>
          <p className="text--small">You will find the information and tools needed to develop software integrations with:</p>
          <ul>
            <li className="text--small">MyGeotab</li>
            <li className="text--small">MyAdmin</li>
            <li className="text--small">Drive</li>
            <li className="text--small">Hardware</li>
          </ul>
          <p className="text--small">Please refer to <Link to="/" aria-label="View Toolkits">Toolkits</Link> for more information.</p>
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
  );
};

export default LandingPage;