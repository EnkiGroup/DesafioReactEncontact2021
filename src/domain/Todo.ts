import api from "./services/api"

export type ITodo = {
    id:string,
    title:string,
    isDone:Boolean
}

export const getAllTodos = async():Promise<ITodo[]>=>{
    try {
        const todos = await api.get('/EnkiGroup/DesafioReactEncontact2021/todos');        
        return todos.data;
    } catch (error) {
       return [] 
    }
}

export const setNewTodo = async(value:Partial<ITodo>):Promise<ITodo|undefined> =>{
    try {
        const newTodo = await api.post('/EnkiGroup/DesafioReactEncontact2021/todos',{
            ...value
        });    
           
        return newTodo.status === 201 ? newTodo.data : undefined; 
    } catch (error) {
        return undefined;
    }
}

export const deleteItemTodo = async(value:ITodo): Promise<Boolean> => {
    try {
        const deletedTodo = await api.delete('/EnkiGroup/DesafioReactEncontact2021/todos',{
           data:{
               ...value
           } 
        })

        console.log(deletedTodo);

        return deletedTodo.status === 404 ? true : false ;
    } catch (error) {
        return false ;
    }

}