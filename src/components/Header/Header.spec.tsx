// Header.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import MenuContext from "../../menuContext";
import { BrowserRouter as Router } from "react-router-dom";


describe("Header Component", () => {
    test("renders Header component", () => {
        render(
            <Router>
                <MenuContext.Provider value={{ activeSiteSection: "MyGeotab", setActiveSiteSection: () => {} }}>
                    <Header isLandingPage={true} />
                </MenuContext.Provider>
            </Router>
        );
    });
});
