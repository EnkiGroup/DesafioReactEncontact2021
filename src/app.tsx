import React, { useCallback, useEffect, useState } from "react";
import Input from "./components/input";
import { Link } from "react-router-dom";
import Switch from "react-switch";

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
  SCFooterTodo,
  SCForm,
  SCHeaderTodo,
  SCListEmpty,
  SCListTODO,
  SCTitle,
} from "./styles/appStyle";
import ItemTodo from "./components/patternItemTodo";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/themes";
import GlobalStyle from "./styles/global";

export enum ACTION_EDIT_MODE {
  Remove = "REMOVE",
  Select = "SELECT_ONE",
  DoneALL = "DONE_ALL",
  Undone = "UNDONE_ALL",
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

  const [isDarkTheme, setIsDarkTheme] = useState(true);

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

  const countLeftTodo = useCallback(() => {
    const filtered = todos.filter((element: ITodo) => {
      if (!element.isDone) return element;
    });

    return filtered.length;
  }, [todos]);

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

      const running = newArray.map(async (element: ITodoItem) => {
        if (action === "REMOVE") {
          element.editMode = false;
          return element;
        }

        if (action === "DONE_ALL") {
          element.isDone = false;
          await updateStatus(element);
          return element;
        }

        if (action === "UNDONE_ALL") {
          element.isDone = true;
          await updateStatus(element);
          return element;
        }

        if (value && action === "SELECT_ONE") {
          if (element.id === value.id) {
            element.editMode = true;
          } else {
            element.editMode = false;
          }
          return element;
        }
      });

      await Promise.all(running);
      setTodos(newArray);
    },
    [todos, updateStatus]
  );

  const handleDarkTheme = useCallback(() => {
    setIsDarkTheme((prevState) => !prevState);
  }, []);

  const submitEdit = useCallback(
    async (data: { id: string; title: string }) => {
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
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyle />
      <SCContainer>
        <SCTitle>
          ToDo <span>List</span>
        </SCTitle>

        <SCHeaderTodo>
          <IoChevronDown
            size={36}
            color={"#ccc"}
            style={{ paddingTop: "10px", flexBasis: "48px" }}
            onClick={() => {
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

        <SCListTODO>
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
        </SCListTODO>

        <SCFooterTodo>
          <div id="count">{`${countLeftTodo()} ${
            countLeftTodo() > 1 ? "Itens pendentes" : "Item pendente"
          }`}</div>
          <div id="botoes">
            <div>
              <Link id={props.filter === "ALL" ? "active" : ""} to="/">
                All
              </Link>
            </div>
            <div>
              <Link id={props.filter === "ACTIVE" ? "active" : ""} to="/active">
                Active
              </Link>
            </div>
            <div>
              <Link
                id={props.filter === "COMPLETED" ? "active" : ""}
                to="/completed"
              >
                Completed
              </Link>
            </div>
          </div>
          <div>
            <Link
              to="#"
              onClick={() => {
                controlEditMode(ACTION_EDIT_MODE.Undone);
              }}
            >
              Clear Completed
            </Link>
          </div>
        </SCFooterTodo>
        <SCFooterTodo>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "12px", marginRight: "5px" }}>
              {`Modo ${isDarkTheme === true ? "escuro" : "claro"}`}
            </span>
            <Switch
              width={36}
              height={18}
              onChange={handleDarkTheme}
              checked={isDarkTheme}
            />
          </div>
        </SCFooterTodo>
      </SCContainer>
    </ThemeProvider>
  );
};

export default App;
