import Todo from "@/components/Todo";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createTask, getTasks, updateTask, deleteTask } from "@/api/data";
import { Provider, useSetAtom } from "jotai";
import { authAtom } from "@/store/store";
import { useEffect } from "react";

jest.mock("@/api/data", () => ({
  createTask: jest.fn(),
  getTasks: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
}));

const mockTask = {
  task: "testing testing",
};

const SetAuthAtomWrapper = ({
  user,
  accessToken,
}: {
  user: { username: string; userId: number };
  accessToken: string;
}) => {
  const setAuthAtom = useSetAtom(authAtom);

  useEffect(() => {
    setAuthAtom({
      user,
      access_token: accessToken,
    });
  }, [setAuthAtom, user, accessToken]);

  return null;
};

const mockedCreateTask = createTask as jest.Mock;
const mockedGetTasks = getTasks as jest.Mock;
const mockedUpdateTask = updateTask as jest.Mock;
const mockedDeleteTask = deleteTask as jest.Mock;

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
        user: { username: "test-user" },
      },
    });

    render(
      <Provider>
        <SetAuthAtomWrapper
          user={{ username: "test-user", userId: 1 }}
          accessToken="fake_token"
        />
        <Todo />
      </Provider>,
    );

    const newTaskButton = screen.getByRole("button", { name: /Nueva Tarea/i });
    await userEvent.click(newTaskButton);

    const createButton = await screen.findByRole("button", { name: /Crear/i });
    expect(createButton).toBeInTheDocument();

    const newTaskInput = await screen.findByRole("textbox", { name: "" });
    await userEvent.type(newTaskInput, mockTask.task);
    await userEvent.click(createButton);

    //const todoTask = await screen.findByText(`${mockTask.task}`, undefined, {
    //  timeout: 2000,
    //});
    const todoTask = await screen.findByText(`${mockTask.task}`); // getByRole es sincrono, mientras que findByRole es asincrono
    expect(todoTask).toBeInTheDocument();

    const todoTaskUser = await screen.findByText("test-user");
    expect(todoTaskUser).toBeInTheDocument();
  });
});

describe("Update a task", () => {
  it("should update a task status when the button is clicked", async () => {
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

    userEvent.click(checkButton);

    const checkedButton2 = await screen.findByTestId("checked-status");
    expect(checkedButton2).toBeInTheDocument();
  });
});

describe("Remove a task", () => {
  it("should remove a task when the 'trash' button is clicked", async () => {
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

    const deleteButton = await screen.findByTestId("delete-button");
    expect(deleteButton).toBeInTheDocument();

    // En React cualquier actualizacion de estado tiene que estar dentro de un act
    // durante los tests.
    // 'act()' asegura que todas las actualizaciones del estado y del DOM se procesen antes de seguir con los asserts
    // Alternativa recomendable: userEvent de "@testing-library/user-event"
    //
    // await act(async () => {
    //   fireEvent.click(deleteButton);
    // });

    userEvent.click(deleteButton);

    await waitFor(() => {
      const task1 = screen.queryByText("task_1");
      expect(task1).not.toBeInTheDocument();
    });
  });
});
