// Page.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "./Page";
import { HeaderSections } from "../Header/headerSectionsEnum";

// Mock the Navbar and PageContent components to isolate the test
jest.mock("../Navbar/Navbar", () => (props: { section: any }) => <div data-testid="Navbar" data-section={props.section}></div>);
// eslint-disable-next-line max-len
jest.mock("../PageContent/PageContent", () => (props: { isLandingPage: any; pageContent: string | number | boolean | React.ReactElement | Iterable<React.ReactNode> | React.ReactPortal | null | undefined }) => (
    <div data-testid="PageContent" data-landing={props.isLandingPage}>
        {props.pageContent}
    </div>
));

describe("Page Component", () => {
    const pageTitleProps = {
        title: "Test Page Title",
        breadCrumbItems: ["Home", "Test Page"]
    };

    it("renders Page component correctly", () => {
        render(
            <Page section={HeaderSections.MyGeotab} pageTitle={pageTitleProps}>
                Test Content
            </Page>
        );

        // Check that the Navbar is rendered for non-landing pages
        expect(screen.getByTestId("Navbar")).toBeInTheDocument();
        expect(screen.getByTestId("Navbar").getAttribute("data-section")).toBe(HeaderSections.MyGeotab);

        // Check that the PageContent is rendered with the correct content
        expect(screen.getByTestId("PageContent")).toHaveTextContent("Test Content");
        expect(screen.getByTestId("PageContent").getAttribute("data-landing")).toBe("false");
    });

    it("does not render Navbar on landing pages", () => {
        render(<Page section={HeaderSections.Landing}>Landing Content</Page>);

        // Check that the Navbar is not rendered on landing pages
        expect(screen.queryByTestId("Navbar")).not.toBeInTheDocument();

        // Check that the PageContent is rendered with the correct content
        expect(screen.getByTestId("PageContent")).toHaveTextContent("Landing Content");
        expect(screen.getByTestId("PageContent").getAttribute("data-landing")).toBe("true");
    });

    // More tests can be added as needed
});
