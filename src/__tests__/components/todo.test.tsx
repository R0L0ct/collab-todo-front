import Todo from "@/components/Todo";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Todo Component", () => {
  it("should render the Todo Component", () => {
    render(<Todo />);
    expect(screen.getByTestId("new-task-button")).toBeInTheDocument();
  });
});

describe("New task button", () => {
  it("should render the New Task form when Nueva Tarea is clicked", () => {
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
    render(<Todo />);
    const formButtonContent = screen.queryByRole("button", { name: /Crear/i }); // i = case insensitive
    expect(formButtonContent).not.toBeInTheDocument();

    const newTaskButton = screen.getByRole("button", { name: /Nueva Tarea/i });
    fireEvent.click(newTaskButton);

    const renderedForm = screen.getByRole("button", { name: /Crear/i });
    expect(renderedForm).toBeInTheDocument();
  });
});

describe("Add New Task", () => {
  it("should add a new task", async () => {
    render(<Todo />);
    const newTaskButton = screen.getByRole("button", { name: /Nueva Tarea/i });
    fireEvent.click(newTaskButton);

    const createButton = await screen.findByRole("button", { name: /Crear/i });
    expect(createButton).toBeInTheDocument();

    const mockTask = {
      task: "testing2",
    };

    const newTaskInput = await screen.findByRole("textbox", { name: "" });
    fireEvent.change(newTaskInput, { target: { value: mockTask.task } });
    fireEvent.click(createButton);

    const taskButton = await screen.findByRole("button", {
      name: /Nueva Tarea/i,
    });
    expect(taskButton).toBeInTheDocument();

    /* const closedFormButton = screen.queryByRole("button", { */
    /*   name: /Crear/i, */
    /* }); // query se usa para comprobar si algo existe o no */
    /* expect(closedFormButton).not.toBeInTheDocument(); */

    /* const todoList = await screen.findByText("test"); // getByRole es sincrono, mientras que findByRole es asincrono */
    /* expect(todoList).toBeInTheDocument(); */
  });
});
