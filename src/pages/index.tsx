import React from "react";
import { Link } from "react-router-dom";
import MyGeotabImage from "./../assets/images/landingPage/mygeotabImage.svg";
import MyAdminImage from "./../assets/images/landingPage/myadminImage.svg";
import DriveImage from "./../assets/images/landingPage/driveImage.svg";
import HardwareImage from "./../assets/images/landingPage/hardwareImage.svg";
import "./pages.scss";

const LandingPage = () => {
  return (
    <div className="landing-page">
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
            <Link to="/myGeotabIntroduction">
              <button type="button" className="landing-page__product-button"><img src={MyGeotabImage} alt="Navigate to MyGeotab introduction" /></button>
            </Link>
            <Link to="/myAdminIntroduction">
              <button type="button" className="landing-page__product-button"><img src={MyAdminImage} alt="Navigate to MyAdmin introduction" /></button>
            </Link>
          </div>
          <div className="landing-page__product-buttons-row">
            <Link to="/driveIntroduction" title="my-element">
              <button type="button" className="landing-page__product-button"><img src={DriveImage} alt="Navigate to Drive introduction" /></button>
            </Link>
            <Link to="/hardwareIntroduction">
              <button type="button" className="landing-page__product-button"><img src={HardwareImage} alt="Navigate to Hardware introduction" /></button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;