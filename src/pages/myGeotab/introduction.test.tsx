import React from "react";
import { screen } from "@testing-library/react";
import Introduction from "./introduction";
import { renderStaticPage } from "../../testUtils/testUtils";

describe.skip("Introduction Component", () => {
    beforeEach(() => {
        renderStaticPage(<Introduction />);
    });

    it('ensures all external links have target="_blank" and rel="noopener noreferrer"', () => {
        const links = screen.getAllByRole("link");
        links.forEach((link) => {
            const href = link.getAttribute("href");
            if (href && (href.startsWith("http") || href.startsWith("//"))) {
                expect(link).toHaveAttribute("target", "_blank");
                expect(link).toHaveAttribute("rel", "noopener noreferrer");
            }
        });
    });

    it("renders the main paragraph with key phrases", () => {
        // Check for key phrases that are less likely to change
        expect(screen.getByText(/The MyGeotab SDK/i)).toBeInTheDocument();
        expect(screen.getByText(/powerful set of tools/i)).toBeInTheDocument();
        expect(screen.getByText(/working with the data/i)).toBeInTheDocument();
    });

    it("renders the list items with key content", () => {
        // Check for key list item content
        expect(screen.getByText(/GPS and speed/i)).toBeInTheDocument();
        expect(screen.getByText(/vehicle measurements/i)).toBeInTheDocument();
        expect(screen.getByText(/fault codes/i)).toBeInTheDocument();
    });

    it("renders the InformationalBox component with a key message", () => {
        // Check for a key message that is less likely to change
        expect(screen.getByText(/supported data feed types/i)).toBeInTheDocument();
    });
    // Add more tests for each section, similar to the tests above, using key phrases
});