import React, { useCallback, useEffect, useState } from "react";
import Input from "./components/input";

import { IoChevronDown } from "react-icons/io5";

import {
  deleteItemTodo,
  getAllTodos,
  ITodo,
  setNewTodo,
  setUpdateTodo,
  updateStatusItemTodo,
} from "./domain/Todo";

import { SCContainer, SCForm, SCHeaderTodo, SCTitle } from "./styles/appStyle";
import ItemTodo from "./components/patternItemTodo";

export enum ACTION_EDIT_MODE {
  Remove = "REMOVE",
  Select = "SELECT_ONE",
  DoneALL = "DONE_ALL",
}

interface ITodoItem extends ITodo {
  editMode?: boolean;
}

const App = () => {
  const [todos, setTodos] = useState<ITodoItem[]>([]);
  const [selectALL, setSelectALL] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const todos = await getAllTodos();
      if (todos.length === 0) return;
      setTodos(todos);
    })();
  }, []);

  const deleteItem = useCallback(
    async (value: ITodo) => {
      const resp = await deleteItemTodo(value);
      if (!resp) return;

      let filtered = todos.filter(function (item) {
        return item !== value;
      });

      setTodos(filtered);
    },
    [todos]
  );

  const updateStatus = useCallback(
    async (value: ITodo) => {
      const resp = await updateStatusItemTodo(value);
      if (!resp) return;

      let newArray = [...todos];

      const running = newArray.map((element: ITodo, i) => {
        if (element === value) {
          element.isDone = !value.isDone;
          return element;
        } else {
          return element;
        }
      });

      await Promise.all(running);

      setTodos(newArray);
    },
    [todos]
  );

  const controlEditMode = useCallback(
    async (action: ACTION_EDIT_MODE, value?: ITodoItem) => {
      let newArray = [...todos];

      const running = newArray.map(async (element: ITodoItem, i) => {
        if (action === "REMOVE") {
          element.editMode = false;
          return element;
        }

        if (action === "DONE_ALL") {
          element.isDone = selectALL;
          await updateStatus(element);
          return element;
        }

        if (value && action === "SELECT_ONE") {
          if (element.id === value.id) {
            element.editMode = true;
          } else {
            element.editMode = false;
          }
        }

        return element;
      });
      await Promise.all(running);
      setTodos(newArray);
    },
    [todos]
  );

  const submitEdit = useCallback(
    async (data: { id: string; title: string }) => {
      console.log("Alterando info");
      console.log(data);
      const resp = await setUpdateTodo(data);
      if (!resp) return;

      let newArray = [...todos];

      const running = newArray.map((element: ITodo, i) => {
        if (element.id === data.id) {
          element.title = data.title;
          return element;
        } else {
          return element;
        }
      });
      await Promise.all(running);

      console.log(newArray);
      setTodos(newArray);

      console.log("Alteração efetuada");
    },
    [todos]
  );

  const submitInsert = useCallback(
    async (data: { title: string }, { reset }) => {
      const newTodo = await setNewTodo({ title: data.title, isDone: false });
      if (newTodo) {
        setTodos((prevState) => [newTodo, ...prevState]);
      }

      reset();
    },
    []
  );

  return (
    <SCContainer>
      <SCTitle>ToDo List</SCTitle>

      <SCHeaderTodo>
        <IoChevronDown
          size={36}
          color={"#ccc"}
          style={{ paddingTop: "10px", flexBasis: "48px" }}
          onClick={() => {
            setSelectALL((prevState) => !prevState);
            controlEditMode(ACTION_EDIT_MODE.DoneALL);
          }}
        />

        <SCForm onSubmit={submitInsert}>
          <Input
            name="title"
            type="text"
            placeholder="Nova tarefa? Digite aqui"
          />
        </SCForm>
      </SCHeaderTodo>

      {todos.length === 0 && <h5>Listagem vazia</h5>}

      <ul>
        {todos.map((element: ITodoItem) => (
          <li
            key={element.id}
            onDoubleClick={() => {
              controlEditMode(ACTION_EDIT_MODE.Select, element);
            }}
          >
            <ItemTodo
              value={element}
              editMode={element.editMode ? element.editMode : false}
              onUpdateStatus={updateStatus}
              onUpdateTitle={submitEdit}
              onControllerEditMode={controlEditMode}
            />
          </li>
        ))}
      </ul>
    </SCContainer>
  );
};

export default App;
