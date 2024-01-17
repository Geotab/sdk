// Header.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "./Footer";
import { BrowserRouter as Router } from "react-router-dom";


describe("Header Component", () => {
    test("renders Header component", () => {
        render(
            <Router>
                <Footer />
            </Router>
        );
    });
});
