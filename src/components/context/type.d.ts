interface ITodo {
  id: string,
  title: string,
  isDone: boolean
}

type ContextType = {
  todos: Itodo[]
  saveTodo: (todo: Itodo) => void
  updateTodo: (id: number) => void
}
