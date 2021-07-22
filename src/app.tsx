import React, { useCallback, useEffect, useState } from "react";
import Input from "./components/input";

import { IoChevronDown } from "react-icons/io5";

import {
  deleteItemTodo,
  getAllActive,
  getAllComplete,
  getAllTodos,
  ITodo,
  setNewTodo,
  setUpdateTodo,
  updateStatusItemTodo,
} from "./domain/Todo";

import { toast } from "react-toastify";

import {
  SCContainer,
  SCForm,
  SCHeaderTodo,
  SCListEmpty,
  SCTitle,
} from "./styles/appStyle";
import ItemTodo from "./components/patternItemTodo";

export enum ACTION_EDIT_MODE {
  Remove = "REMOVE",
  Select = "SELECT_ONE",
  DoneALL = "DONE_ALL",
}

export enum TOAST_STATUS {
  SUCESS = "SUCESS",
  DELETE = "DELETE",
}

interface ITodoItem extends ITodo {
  editMode?: boolean;
}

export enum FILTER {
  ALL = "ALL",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

interface PropsAPP {
  filter: FILTER;
}

const App: React.FC<PropsAPP> = (props) => {
  const [todos, setTodos] = useState<ITodoItem[]>([]);
  const [selectALL, setSelectALL] = useState<boolean>(true);

  const notify = (status: TOAST_STATUS, msg: string) =>
    toast(msg, {
      autoClose: 1000,
      hideProgressBar: true,
      style: {
        backgroundColor: status === "SUCESS" ? "#4ab453" : "#c21616",
        color: "#fff",
      },
    });

  useEffect(() => {
    (async () => {
      let todos = [];

      switch (props.filter) {
        case FILTER.ALL:
          todos = await getAllTodos();
          setTodos(todos);
          break;
        case FILTER.ACTIVE:
          todos = await getAllActive();
          setTodos(todos);
          break;
        case FILTER.COMPLETED:
          todos = await getAllComplete();
          setTodos(todos);
          break;

        default:
          todos = await getAllTodos();
          setTodos(todos);
          break;
      }
    })();
  }, [props.filter]);

  const deleteItem = useCallback(
    async (value: ITodo) => {
      const resp = await deleteItemTodo(value);
      if (!resp) return;

      let filtered = todos.filter(function (item) {
        return item !== value;
      });

      setTodos(filtered);
      notify(TOAST_STATUS.DELETE, "Tarefa removida com sucesso");
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
      notify(
        TOAST_STATUS.SUCESS,
        value.isDone === true
          ? "Tarefa realizada com sucesso"
          : "Tente fazer novamente"
      );
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
    [selectALL, todos, updateStatus]
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

      notify(TOAST_STATUS.SUCESS, "Tarefa atualizada com sucesso");
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
      notify(TOAST_STATUS.SUCESS, "Tarefa cadastrada com sucesso");
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

      {todos.length === 0 && (
        <SCListEmpty>
          <h5>Listagem vazia</h5>
          <img
            src={"/complete_task.svg"}
            style={{ height: 150, width: 150 }}
            alt="website logo"
          />
        </SCListEmpty>
      )}

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
              onDeleteItem={deleteItem}
            />
          </li>
        ))}
      </ul>
    </SCContainer>
  );
};

export default App;
