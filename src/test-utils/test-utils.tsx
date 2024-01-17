import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

export const renderWithRouter = (ui: React.ReactElement) => render(<BrowserRouter>{ui}</BrowserRouter>);
