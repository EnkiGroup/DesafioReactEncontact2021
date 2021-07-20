import React, { useCallback, useEffect ,useState} from "react";
import { Form } from '@unform/web';
import Input from './components/input';

import { deleteItemTodo, getAllTodos, ITodo, setNewTodo, updateStatusItemTodo } from "./domain/Todo";

export default function App() {

  const [todos,setTodos] = useState<ITodo[]>([]);

  useEffect(()=>{
    (async()=>{
      const todos = await getAllTodos() ;
      if (todos.length === 0 ) return ;
      setTodos(todos);
    })();
  },[]);

  const deleteItem = useCallback(
    async (value:ITodo) => {
        const resp = await deleteItemTodo(value);
        if(!resp) return;


        let filtered = todos.filter(function(item){ 
          return item !== value
        });

        setTodos(filtered);
    },
    [todos],
  );

  const updateStatus = useCallback(
    async (value:ITodo) => {
        const resp = await updateStatusItemTodo(value);
        if(!resp) return;

        let newArray = [...todos];

        const running = newArray.map((element:ITodo,i)=>{
          if(element === value){
            element.isDone = !value.isDone ;
            return element;
          }else{
            return element;
          }          
        })

        await Promise.all(running) ;

        setTodos(newArray);
    },
    [todos],
  )

  const submitForm = useCallback(
    async (data:{title:string},{ reset }) => {
      const newTodo = await setNewTodo({title:data.title,isDone:false})  ;
      if(newTodo){
        setTodos((prevState)=>([newTodo,...prevState]))
      }

      reset();
    },
    [],
  ); 

  return (
    <section>
      <h1>Todos</h1>

      <Form onSubmit={submitForm}>
        <Input name="title" type="text"  />
      </Form>

        {todos.length === 0 && (<p>Listagem vazia</p>)}
      
        <ul>
        {todos.length > 0 &&         
          todos.map((element:ITodo)=>(
            <li key={element.id}>{element.title} - {String(element.isDone)} <p onClick={()=>{deleteItem(element)}}>delete</p> <p onClick={()=>{updateStatus(element)}}>alterar</p> </li>
          ))         
        }
        </ul>
      
    </section>
  );
}
