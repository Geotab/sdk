import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

// Mock the components that are not being directly tested
jest.mock("../Footer", () => ({
    LogoGeotabFooter: () => <div data-testid="logo-footer">LogoGeotabFooter</div>,
    FooterDivider: () => <div data-testid="divider">|</div>
}));

describe("Footer Component", () => {
    beforeEach(() => {
        // Arrange and Act
        render(<Footer />);
    });

    it("renders the footer logo", () => {
        // Assert
        const logoFooter = screen.getByTestId("logo-footer");
        expect(logoFooter).toBeInTheDocument();
    });

    it("renders the footer links", () => {
        // Assert
        const links = [
            { label: "Security", href: "https://www.geotab.com/security" },
            { label: "Privacy Policy", href: "https://docs.google.com/document/d/1sVygLN02w2xNovFY4q5vw-oAzfYxCd7WLhyToElgDbs/pub" },
            { label: "Terms of Service", href: "https://docs.google.com/document/d/1aFJnFYpHCN4bFe6yVhj5m5AiJClfucRhJWVSDBqRObg/edit?usp=sharing" },
            { label: "Storage Preferences", href: "https://geotab.github.io/sdk/software/guides/addin-storage/" }
        ];

        links.forEach((link) => {
            expect(screen.getByLabelText(link.label)).toHaveAttribute("href", link.href);
        });
    });

    it("renders the correct number of footer link dividers", () => {
        // Assert
        const numberOfLinks = 4; // The number of links in the footerLinks array
        const dividers = screen.getAllByTestId("divider");
        // There should be one less divider than there are links
        expect(dividers.length).toBe(numberOfLinks - 1);
    });

    it("renders the current year in the copyright notice", () => {
        // Assert
        const currentYear = new Date().getFullYear().toString();
        expect(screen.getByText(`Copyright © ${currentYear} Geotab`)).toBeInTheDocument();
    });
});
