import { FooterDivider, LogoGeotabFooter } from "../Footer";
import "./footer.scss";

export default function Footer() {
  return (
    <div>
      <footer>
        <div className="footer-container">
          <div className="footer-container__left">
            <div className="footer-logo-container">
              {" "}
              <LogoGeotabFooter />
            </div>
            <div>
              {" "}
              {/* NOTE: Will these links lead to outside resources are will the content be created  */}
              <a href="https://www.geotab.com/security">Security</a>
            </div>
            <FooterDivider />
            <div>
              <a href="https://docs.google.com/document/d/1sVygLN02w2xNovFY4q5vw-oAzfYxCd7WLhyToElgDbs/pub">
                Privacy Policy
              </a>
            </div>
            <FooterDivider />
            <div>
              <a href="https://docs.google.com/document/d/1jA8Qc8WZMhmaqdjd8Ng8rY4iMI073xCfLNt_DSP72TQ/edit#heading=h.gjdgxs">
                End User Agreement
              </a>
            </div>
            <FooterDivider />
            <div>
              {/* TODO: Current SDK site did not have Storage Preferences link so will likely need to update this */}
              <a href="https://geotab.github.io/sdk/software/guides/addin-storage/">
                Storage Preferences
              </a>
            </div>
          </div>
          <div className="footer-container__right">
            <span className="footer-copyright">Copyright © 2023 Geotab</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
