import Login from "@/components/Login";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Login form", () => {
  it("should render the login form correctly", () => {
    render(<Login />);
    const signinButton = screen.getByRole("button", { name: /ingresar/i });
    expect(signinButton).toBeInTheDocument();
  });

  it("should change the inputs", async () => {
    render(<Login />);
    const usernameLabel = screen.getByText(/username/i);
    const usernameContainer = usernameLabel.closest("div");
    const usernameInput = usernameContainer?.querySelector("input");
    expect(usernameInput).toBeInTheDocument();

    const passwordLabel = screen.getByText(/password/i);
    const passwordContainer = passwordLabel.closest("div");
    const passwordInput = passwordContainer?.querySelector("input");
    expect(passwordInput).toBeInTheDocument();

    if (!usernameInput) throw new Error("usernameInput error");
    if (!passwordInput) throw new Error("passwordInput error");

    await userEvent.type(usernameInput, "test-user");
    await userEvent.type(passwordInput, "test123");
    expect(usernameInput).toHaveValue("test-user");
    expect(passwordInput).toHaveValue("test123");
  });
});
