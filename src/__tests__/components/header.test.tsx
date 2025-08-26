import Header from "@/components/Header";
import { render, screen } from "@testing-library/react";

describe("Header", () => {
  it("should render correctly", () => {
    render(<Header />);
    const logo = screen.getByText(/todo/i);
    expect(logo).toBeInTheDocument();
  });
});
