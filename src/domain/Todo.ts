import api from "./services/api";

export type ITodo = {
  id: string;
  title: string;
  isDone: boolean;
};

export const getAllTodos = async (): Promise<ITodo[]> => {
  try {
    const todos = await api.get("/EnkiGroup/DesafioReactEncontact2021/todos");
    return todos.data;
  } catch (error) {
    return [];
  }
};

export const getAllActive = async (): Promise<ITodo[]> => {
  try {
    const todos = await api.get("/EnkiGroup/DesafioReactEncontact2021/todos");

    // eslint-disable-next-line array-callback-return
    let filtered: ITodo[] = todos.data.filter((element: ITodo) => {
      if (!element.isDone) return element;
    });
    return filtered;
  } catch (error) {
    return [];
  }
};

export const getAllComplete = async (): Promise<ITodo[]> => {
  try {
    const todos = await api.get("/EnkiGroup/DesafioReactEncontact2021/todos");
    // eslint-disable-next-line array-callback-return
    let filtered: ITodo[] = todos.data.filter((element: ITodo) => {
      if (element.isDone) return element;
    });
    return filtered;
  } catch (error) {
    return [];
  }
};

export const setUpdateTodo = async (
  value: Partial<ITodo>
): Promise<Boolean> => {
  try {
    const newTodo = await api.put(
      `/EnkiGroup/DesafioReactEncontact2021/todos/update/${value.id}`,
      {
        ...value,
      }
    );
    return newTodo.status === 404 ? true : false;
  } catch (error) {
    return true;
  }
};

export const setNewTodo = async (
  value: Partial<ITodo>
): Promise<ITodo | undefined> => {
  try {
    const newTodo = await api.post(
      "/EnkiGroup/DesafioReactEncontact2021/todos",
      {
        ...value,
      }
    );
    return newTodo.status === 201 ? newTodo.data : undefined;
  } catch (error) {
    return undefined;
  }
};

export const deleteItemTodo = async (value: ITodo): Promise<Boolean> => {
  try {
    const deletedTodo = await api.delete(
      "/EnkiGroup/DesafioReactEncontact2021/todos",
      {
        data: {
          ...value,
        },
      }
    );
    // Retornando true com 404 pois não consigo deletar.
    return deletedTodo.status === 404 ? true : false;
  } catch (error) {
    // Retornando true com 404 pois não consigo deletar.
    return true;
  }
};

export const updateStatusItemTodo = async (value: ITodo): Promise<Boolean> => {
  try {
    const editedTodo = await api.put(
      `/EnkiGroup/DesafioReactEncontact2021/todos/update/${value.id}`,
      {
        isDone: !value.isDone,
      }
    );
    // Retornando true com 404 pois não consigo editar.
    return editedTodo.status === 404 ? true : false;
  } catch (error) {
    // Retornando true com 404 pois não consigo editar.
    return true;
  }
};
