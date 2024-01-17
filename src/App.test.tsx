import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

/*
* mock each page component that is rendered by a route in the App component
* make sure the paths provided to jest.mock match the actual import paths of the components you want to mock
* use window.history.pushState to simulate navigation to a specific path (this updates the URL, and the App component should respond by rendering the appropriate component for that route)
**/
jest.mock("./pages", () => () => <div data-testid="landing-page">Landing Page Mock</div>);
jest.mock("./pages/myGeotab/introduction", () => () => <div data-testid="mygeotab-introduction">MyGeotab Introduction Mock</div>);
jest.mock("./pages/myGeotab/releaseNotes", () => () => <div data-testid="mygeotab-release-notes">MyGeotab Release Notes Mock</div>);
// TODO: add other components that are being routed to

describe.skip("App Routing", () => {
    it.skip("renders landing page by default", () => {
        render(<App />);
        expect(screen.getByTestId("landing-page")).toBeInTheDocument();
    });

    it.skip("renders MyGeotabIntroduction page when path is /myGeotab/introduction", () => {
        window.history.pushState({}, "Test page", "/myGeotab/introduction");
        render(<App />);
        expect(screen.getByTestId("mygeotab-introduction")).toBeInTheDocument();
    });

    it.skip("renders MyGeotabReleaseNotes page when path is /myGeotab/releaseNotes", () => {
        window.history.pushState({}, "Test page", "/myGeotab/releaseNotes");
        render(<App />);
        expect(screen.getByTestId("mygeotab-release-notes")).toBeInTheDocument();
    });

    // TODO: additional tests for other routes
});

// Reset the mocks after each test
afterEach(() => {
    jest.resetAllMocks();
});
