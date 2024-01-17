import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Accordion from "./Accordion";
import "@testing-library/jest-dom/extend-expect";

// Since Accordion uses icons from a library, we'll mock them to simplify the tests
jest.mock("@geotab/react-component-library", () => ({
    IconChevronUp: () => <span data-testid="icon-chevron-up" />,
    IconChevronDown: () => <span data-testid="icon-chevron-down" />
}));

describe("Accordion Component", () => {
    const summaryText = "Test Summary";
    const detailsContent = <div>Test Details</div>;
    const testId = "test-accordion";

    it("renders the summary and is initially expanded", () => {
        render(<Accordion summary={summaryText} p={detailsContent} id={testId} />);

        const summaryElement = screen.getByText(summaryText);
        expect(summaryElement).toBeInTheDocument();
        expect(screen.getByTestId("icon-chevron-up")).toBeInTheDocument(); // Initially expanded
        expect(screen.getByText("Test Details")).toBeVisible(); // Content is visible
    });

    it("toggles the expanded state and icon when the summary is clicked", async () => {
        render(<Accordion summary="Test Summary" p={<div>Test Details</div>} id="test-accordion" />);

        // Click the summary to collapse the Accordion
        fireEvent.click(screen.getByText("Test Summary"));

        // Use waitFor to wait for the icon-chevron-down to appear
        await waitFor(() => {
            expect(screen.getByTestId("icon-chevron-down")).toBeInTheDocument();
        });

        // Expect the details to not be visible
        expect(screen.getByText("Test Details")).not.toBeVisible();

        // Click the summary again to expand the Accordion
        fireEvent.click(screen.getByText("Test Summary"));

        // Use waitFor to wait for the icon-chevron-up to appear
        await waitFor(() => {
            expect(screen.getByTestId("icon-chevron-up")).toBeInTheDocument();
        });

        // Expect the details to be visible
        expect(screen.getByText("Test Details")).toBeVisible();
    });
});
