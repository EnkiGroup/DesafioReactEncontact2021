import { useTasks } from '../../hooks/useTasks';
import { Container, Content } from './styles'
import { AiOutlineDelete } from 'react-icons/ai'
import { useState } from 'react';

export function TodosList () {
    const { tasks, setTasks, getActiveTasks, getCompletedTasks } = useTasks()

    const [showAll, setShowAll] = useState(true)
    const [showActive, setShowActive] = useState(false)
    const [showCompleted, setShowCompleted] = useState(false)
    
    function handleDoneTask(id: string){
        const newTasks = tasks.map(task => {
            if(task.id === id){
                return {
                    ...task,
                    isDone: !task.isDone
                }
            }
            return task
        }) 

        setTasks(newTasks)
        
    }

    function handleDeleteTask(id: string) {
        const newTasks = tasks.filter(task => task.id !== id) 
        setTasks(newTasks)
    }   
    
    function handleShowAll(){
        setShowActive(false)
        setShowCompleted(false)
        setShowAll(true)
    }
    
    function handleShowActive(){
        setShowAll(false)
        setShowCompleted(false)
        setShowActive(true)
    }
    
    function handleShowCompleted(){
        setShowAll(false)
        setShowActive(false)
        setShowCompleted(true)
    }
    
    return (
        <Container>
            <Content>
                <ul>
                {showAll && tasks.map(task => {
                    return (
                        <li key={task.id} className={task.isDone? 'line': ''}>

                                <input 
                                    type="checkbox" 
                                    checked={task.isDone} 
                                    onChange={() => handleDoneTask(task.id)}
                                />
                                {task.title}

                                <AiOutlineDelete 
                                    onClick={() => handleDeleteTask(task.id)}
                                    className="delete"
                                />
                        </li>
                    )
                })}

                {showActive && getActiveTasks().map(task => {
                    return (
                        <li key={task.id} className={task.isDone? 'line': ''}>
                            <input 
                                type="checkbox" 
                                checked={task.isDone} 
                                onChange={() => handleDoneTask(task.id)}
                            />

                            {task.title}

                            <AiOutlineDelete 
                                onClick={() => handleDeleteTask(task.id)}
                                className="delete"
                            />
                        </li>
                    )
                })}

                {showCompleted && getCompletedTasks().map(task => {
                    return (
                        <li key={task.id} className={task.isDone? 'line': ''}>
                            <input 
                                type="checkbox" 
                                checked={task.isDone} 
                                onChange={() => handleDoneTask(task.id)}
                            />

                            {task.title}

                            <AiOutlineDelete 
                                onClick={() => handleDeleteTask(task.id)}
                                className="delete"
                            />
                        </li>
                    )
                })}
                </ul>


                <div className="buttons">
                    <button onClick={() => handleShowAll()}>All</button>
                    <button onClick={() => handleShowActive()}>Active</button>
                    <button onClick={() => handleShowCompleted()}>Completed</button>
                </div>
            </Content>
        </Container>
    )
}