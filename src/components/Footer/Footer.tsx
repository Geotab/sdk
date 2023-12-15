import React from "react";
import { FooterDivider, LogoGeotabFooter } from "../Footer";
import "./footer.scss";

interface FooterLink {
  href: string;
  label: string;
}

const footerLinks: FooterLink[] = [
  { href: "https://www.geotab.com/security", label: "Security" },
  {
    href: "https://docs.google.com/document/d/1sVygLN02w2xNovFY4q5vw-oAzfYxCd7WLhyToElgDbs/pub",
    label: "Privacy Policy",
  },
  {
    href: "https://docs.google.com/document/d/1jA8Qc8WZMhmaqdjd8Ng8rY4iMI073xCfLNt_DSP72TQ/edit#heading=h.gjdgxs",
    label: "End User Agreement",
  },
  {
    href: "https://docs.google.com/document/d/1aFJnFYpHCN4bFe6yVhj5m5AiJClfucRhJWVSDBqRObg/edit?usp=sharing",
    label: "API Terms of Service",
  },
  {
    href: "https://geotab.github.io/sdk/software/guides/addin-storage/",
    label: "Storage Preferences",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-container__left">
        <LogoGeotabFooter />
        {footerLinks.map((link, index) => (
          <div key={link.label} className="link-container">
            <a
              href={link.href}
              aria-label={link.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
            <span className="footer-link-divider">
              {index < footerLinks.length - 1 && <FooterDivider />}
            </span>
          </div>
        ))}
      </div>

      <div className="footer-container__right">
        <small className="footer-copyright">Copyright © {currentYear} Geotab</small>
      </div>
    </footer>
  );
}
