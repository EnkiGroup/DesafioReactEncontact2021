import React, { useCallback, useEffect, useState } from "react";
import { Form } from "@unform/web";
import Input from "./components/input";

import {
  deleteItemTodo,
  getAllTodos,
  ITodo,
  setNewTodo,
  setUpdateTodo,
  updateStatusItemTodo,
} from "./domain/Todo";

import CheckBox from "./components/CheckBox";
import { SCContainer, SCHeaderTodo, SCTitle } from "./styles/appStyle";

export default function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);

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

  const submitEdit = useCallback(
    async (data: { id: string; title: string }, { reset }) => {
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
      <SCTitle>Todos</SCTitle>

      <SCHeaderTodo>
        <Form onSubmit={submitInsert}>
          <Input name="title" type="text" />
        </Form>
      </SCHeaderTodo>

      {todos.length === 0 && <h5>Listagem vazia</h5>}

      <ul>
        {todos.map((element: ITodo) => (
          <li key={element.id}>
            <input
              key={element.id}
              onClick={() => {
                updateStatus(element);
              }}
              type="checkbox"
              checked={element.isDone}
              value={element.title}
            />
            {element.title}

            {/* <div style={{ display: "flex", flexDirection: "row" }}>
                {element.title} - {String(element.isDone)}
                <p
                  onClick={() => {
                    deleteItem(element);
                  }}
                >
                  delete
                </p>
                <p
                  onClick={() => {
                    updateStatus(element);
                  }}
                >
                  alterar
                </p>
              </div> */}
            {/* <Form onSubmit={submitEdit}>
                <Input
                  name="id"
                  type="text"
                  defaultValue={element.id}
                  style={{ display: "none" }}
                />
                <Input name="title" type="text" />
                <button style={{ display: "none" }} type="submit">
                  enviar
                </button>
              </Form> */}
          </li>
        ))}
      </ul>
    </SCContainer>
  );
}
