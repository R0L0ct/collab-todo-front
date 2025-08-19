import NewTask from "@/components/NewTask";
import { fireEvent, render, screen } from "@testing-library/react";

describe("New task form", () => {
  it("should change the new task input value", async () => {
    render(<NewTask />);

    const mockTask = {
      task: "test",
    };

    const formInput = screen.getByRole("textbox", { name: "" });
    fireEvent.change(formInput, {
      target: { value: mockTask.task },
    });
    expect(formInput).toHaveValue(mockTask.task);
  });
});
