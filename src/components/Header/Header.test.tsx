import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";
import MenuContext from "../../menuContext";
import { HeaderSections } from "./headerSectionsEnum";
import { SearchModalProps } from "../SearchModal/SearchModal";

// Mock components that are not being directly tested
jest.mock("../Logo/LogoGeotabSDK", () => ({
    __esModule: true,
    LogoGeotabSDK: () => <div data-testid="geotab-sdk-logo">LogoGeotabSDK</div>
}));
jest.mock("../SearchModal/SearchModal", () => ({
    __esModule: true,
    default: ({ isOpen, onClose }: SearchModalProps) => (isOpen ? <div data-testid="search-modal">SearchModal</div> : null)
}));
jest.mock("@geotab/react-component-library", () => ({
    IconSearch: () => <div data-testid="header-search-icon">IconSearch</div>
}));

describe("Header Component", () => {
    // Arrange
    const setActiveSiteSection = jest.fn();
    const contextValue = {
        activeSiteSection: HeaderSections.MyGeotab,
        setActiveSiteSection
    };

    afterEach(() => {
        jest.clearAllMocks(); // Clear mock call history after each test
    });

    it("renders the logo when isLandingPage is true", () => {
        // Act
        render(
            <MemoryRouter>
                <MenuContext.Provider value={contextValue}>
                    <Header isLandingPage={true} />
                </MenuContext.Provider>
            </MemoryRouter>
        );

        // Assert
        const logoElement = screen.getByTestId("geotab-sdk-logo");
        expect(logoElement).toBeInTheDocument();
    });

    it("does not render the logo when isLandingPage is false", () => {
        // Act
        render(
            <MemoryRouter>
                <MenuContext.Provider value={contextValue}>
                    <Header isLandingPage={false} />
                </MenuContext.Provider>
            </MemoryRouter>
        );

        // Assert
        const logoElement = screen.queryByTestId("geotab-sdk-logo");
        expect(logoElement).not.toBeInTheDocument();
    });

    it("opens the search modal when the search bar is clicked", () => {
        // Act
        render(
            <MemoryRouter>
                <MenuContext.Provider value={contextValue}>
                    <Header isLandingPage={false} />
                </MenuContext.Provider>
            </MemoryRouter>
        );
        fireEvent.click(screen.getByPlaceholderText("Search..."));

        // Assert
        const searchModal = screen.getByTestId("search-modal");
        expect(searchModal).toBeInTheDocument();
    });
});
