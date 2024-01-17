// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

// Mock IntersectionObserver
class MockIntersectionObserver {
    constructor(public callback: (entries: IntersectionObserverEntry[]) => void) {}

    observe(target: Element): void {
        // Simulate the target element being observed
        this.callback([
            {
                isIntersecting: true,
                target: target,
                boundingClientRect: target.getBoundingClientRect(),
                intersectionRatio: 1,
                intersectionRect: target.getBoundingClientRect(),
                rootBounds: document.documentElement.getBoundingClientRect(),
                time: Date.now()
            } as IntersectionObserverEntry
        ]);
    }

    disconnect(): void {}
    unobserve(): void {}
}

global.IntersectionObserver = MockIntersectionObserver as any;

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = jest.fn();
