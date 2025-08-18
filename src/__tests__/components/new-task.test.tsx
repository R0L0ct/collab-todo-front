import Todo from "@/components/Todo";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock(
  "@/components/NewTask",
  () =>
    function NewTask() {
      return (
        <div>
          <button>Crear</button>
        </div>
      );
    },
);

describe("New Task Component", () => {
  it("renders New Task form when clicking Nueva Tarea", () => {
    render(<Todo />);
    const formButtonContent = screen.queryByRole("button", { name: /Crear/i });
    expect(formButtonContent).not.toBeInTheDocument();

    const newTaskButton = screen.getByRole("button", { name: /Nueva Tarea/i });
    fireEvent.click(newTaskButton);

    const renderedForm = screen.getByRole("button", { name: /Crear/i });
    expect(renderedForm).toBeInTheDocument();
  });
});
