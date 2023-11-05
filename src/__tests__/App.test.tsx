import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import FAQ from "../routes/homepage/components/FAQ";

test('demo', () => {
    expect(true).toBe(true);
});

test("Renders the FAQ page", () => {
    render(<FAQ />);
    expect(true).toBeTruthy();
});