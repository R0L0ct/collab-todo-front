import NewTask from "@/components/NewTask";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("New task form", () => {
  it("should change the new task input value", async () => {
    render(<NewTask />);

    const mockTask = {
      task: "test",
    };

    const formInput = screen.getByRole("textbox", { name: "" });

    await userEvent.type(formInput, mockTask.task);

    expect(formInput).toHaveValue(mockTask.task);
  });
});
