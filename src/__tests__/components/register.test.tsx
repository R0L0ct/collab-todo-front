import { register } from "@/api/data";
import Register from "@/components/Register";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@/api/data", () => ({
  register: jest.fn(),
}));

const mockedRegister = register as jest.Mock;

describe("Register Form", () => {
  it("should render correctly", () => {
    render(<Register />);
  });

  it("should change the values of the inputs", async () => {
    render(<Register />);

    const usernameInput = screen.getByLabelText(/username/i);
    expect(usernameInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();

    await userEvent.type(usernameInput, "test-user");
    await userEvent.type(passwordInput, "test123");

    expect(usernameInput).toHaveValue("test-user");
    expect(passwordInput).toHaveValue("test123");
  });

  it("should register a user correctly when the submit button is clicked", async () => {
    mockedRegister.mockResolvedValue({
      data: {
        username: "test-user",
      },
    });

    render(<Register />);

    const usernameInput = screen.getByLabelText(/username/i);
    expect(usernameInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();

    await userEvent.type(usernameInput, "test-user");
    await userEvent.type(passwordInput, "test123");

    expect(usernameInput).toHaveValue("test-user");
    expect(passwordInput).toHaveValue("test123");

    const submitButton = screen.getByRole("button", { name: /enviar/i });
    expect(submitButton).toBeInTheDocument();

    await userEvent.click(submitButton);

    expect(register).toHaveBeenCalledWith({
      username: "test-user",
      password: "test123",
    });
  });
});
