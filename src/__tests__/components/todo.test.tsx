import Todo from "@/components/Todo";
import { fireEvent, render, screen } from "@testing-library/react";
import { createTask, getTasks, updateTask } from "@/api/data";

jest.mock("@/api/data", () => ({
  createTask: jest.fn(),
  getTasks: jest.fn(),
  updateTask: jest.fn(),
}));

const mockTask = {
  task: "testing testing",
};

const mockedCreateTask = createTask as jest.Mock;
const mockedGetTasks = getTasks as jest.Mock;
const mockedUpdateTask = updateTask as jest.Mock;

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
    mockedCreateTask.mockResolvedValue({
      data: {
        id: 20,
        task: mockTask.task,
        isCompleted: false,
      },
    });

    render(<Todo />);

    const newTaskButton = screen.getByRole("button", { name: /Nueva Tarea/i });
    fireEvent.click(newTaskButton);

    const createButton = await screen.findByRole("button", { name: /Crear/i });
    expect(createButton).toBeInTheDocument();

    const newTaskInput = await screen.findByRole("textbox", { name: "" });
    fireEvent.change(newTaskInput, { target: { value: mockTask.task } });
    fireEvent.click(createButton);

    const todoTask = await screen.findByText(`${mockTask.task}`, undefined, {
      timeout: 2000,
    }); // getByRole es sincrono, mientras que findByRole es asincrono
    expect(todoTask).toBeInTheDocument();
  });
});

describe("Update a task", () => {
  it("should update a task status", async () => {
    mockedGetTasks.mockResolvedValue({
      data: [
        {
          id: 1,
          task: "task_1",
          isCompleted: false,
        },
      ],
    });
    render(<Todo />);

    const task = await screen.findByText("task_1");
    expect(task).toBeInTheDocument();

    const checkButton = await screen.findByTestId("check-button");
    expect(checkButton).toBeInTheDocument();

    const uncheckedButton = await screen.findByTestId("unchecked-status");
    expect(uncheckedButton).toBeInTheDocument();

    const checkedButton = screen.queryByTestId("checked-status");
    expect(checkedButton).not.toBeInTheDocument();

    fireEvent.click(checkButton);

    const checkedButton2 = await screen.findByTestId("checked-status");
    expect(checkedButton2).toBeInTheDocument();
  });
});
