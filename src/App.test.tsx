import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LandingPage from "./pages";
import { BrowserRouter } from "react-router-dom";

// TODO: complete remaining tests

describe("Landing page", () => {
    test("should have a brief description about the site.", () => {
        render(
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>
        );
        const headerElement = screen.getByText("This site provides tools for integrating with various types of Geotab products.");
        expect(headerElement).toBeInTheDocument();
    });

    test("should have link to the Toolkits page.", () => {
        render(
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>
        );
        const link = screen.getByLabelText("View Toolkits");
        expect(link).toBeInTheDocument();
    });

    test("should redirect to the toolkit section when the Toolkits button is clicked.", () => {
        render(
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>
        );
        const link = screen.getByLabelText("View Toolkits");
        fireEvent.click(link);
        expect(window.location.pathname).toBe("/");
    });

    test("should have four buttons on the page.", () => {
        render(
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>
        );
        const container = screen.getByTestId("landing-page");
        const buttons = container.querySelectorAll(".landing-page__product-button");
        expect(buttons.length).toBe(4);
    });

    test("should redirect to the MyGeotab section when the MyGeotab button is clicked.", () => {
        render(
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>
        );
        const link = screen.getByRole("link", { name: "Navigate to MyGeotab introduction" });
        fireEvent.click(link);
        expect(window.location.pathname).toBe("/myGeotab/introduction");
    });

    test("should redirect to the MyAdmin section when the MyAdmin button is clicked.", () => {
        render(
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>
        );
        const link = screen.getByRole("link", { name: "Navigate to MyAdmin introduction" });
        fireEvent.click(link);
        expect(window.location.pathname).toBe("/myAdmin/introduction");
    });

    test("should redirect to the Drive section when the Drive button is clicked.", () => {
        render(
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>
        );
        const link = screen.getByRole("link", { name: "Navigate to Drive introduction" });
        fireEvent.click(link);
        expect(window.location.pathname).toBe("/drive/introduction");
    });

    test("should redirect to the Hardware section when the Hardware button is clicked.", () => {
        render(
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>
        );
        const link = screen.getByRole("link", { name: "Navigate to Hardware introduction" });
        fireEvent.click(link);
        expect(window.location.pathname).toBe("/hardware/introduction");
    });
});