import { Link } from "react-router-dom";
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
        label: "Privacy Policy"
    },
    {
        href: "https://docs.google.com/document/d/1aFJnFYpHCN4bFe6yVhj5m5AiJClfucRhJWVSDBqRObg/edit?usp=sharing",
        label: "Terms of Service"
    },
    {
        href: "/myGeotab/addIns/addInStorage",
        label: "Storage Preferences"
    }
];

export default function Footer(): JSX.Element {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-container">
            <div className="footer-container__left">
                <LogoGeotabFooter />
                {footerLinks.map((link, index) => (
                    <div key={link.label} className="link-container">
                        <Link to={link.href}>{link.label}</Link>
                        <span className="footer-link-divider">{index < footerLinks.length - 1 && <FooterDivider />}</span>
                    </div>
                ))}
            </div>

            <div className="footer-container__right">
                <small className="footer-copyright">Copyright © {currentYear} Geotab</small>
            </div>
        </footer>
    );
}
