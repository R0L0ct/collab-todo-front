import { login } from "@/api/data";
import Header from "@/components/Header";
import Login from "@/components/Login";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@/api/data", () => ({
  login: jest.fn(),
}));

const mockedLogin = login as jest.Mock;

describe("Login form", () => {
  it("should render the login form correctly", () => {
    render(<Login />);
    const signinButton = screen.getByRole("button", { name: /ingresar/i });
    expect(signinButton).toBeInTheDocument();
  });

  it("should change the inputs values", async () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText(/username/i);
    expect(usernameInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();

    await userEvent.type(usernameInput, "test-user");
    await userEvent.type(passwordInput, "test123");

    expect(usernameInput).toHaveValue("test-user");
    expect(passwordInput).toHaveValue("test123");
  });

  it("should login correctly when the submit button is clicked & show the username in the header", async () => {
    mockedLogin.mockResolvedValue({
      data: {
        user: { username: "test-user", userId: 1 },
        access_token: "fake_token",
      },
    });

    render(<Header />);
    render(<Login />);

    const usernameInput = screen.getByLabelText(/username/i);
    expect(usernameInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();

    await userEvent.type(usernameInput, "test-user");
    await userEvent.type(passwordInput, "test123");

    expect(usernameInput).toHaveValue("test-user");
    expect(passwordInput).toHaveValue("test123");

    const submitButton = screen.getByRole("button", { name: /ingresar/i });
    expect(submitButton).toBeInTheDocument();

    await userEvent.click(submitButton);
    expect(login).toHaveBeenCalledWith({
      username: "test-user",
      password: "test123",
    });
    expect(login).toHaveBeenCalledTimes(1);

    const usernameHeader = await screen.findByText(/test-user/i);
    expect(usernameHeader).toBeInTheDocument();
  });
});
