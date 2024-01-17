import { ReactElement } from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

export const renderStaticPage = (ui: ReactElement) => render(<BrowserRouter>{ui}</BrowserRouter>);