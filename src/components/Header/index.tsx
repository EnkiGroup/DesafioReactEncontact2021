import { useState } from 'react'
import { BsPlusCircle } from 'react-icons/bs'
import { Container, Content } from './styles'
import { useTasks } from '../../hooks/useTasks'

export function Header(){

    const [showInput, setShowInput] = useState(false);
    const [title, setTitle] = useState('')
    const {tasks, setTasks} = useTasks();

    function handleShowInput(): void{
        setShowInput(!showInput)
    }

    function handleSaveTask(key: string){
        if(!(key === 'Enter')){
            return 
        }

        const newTask = {
            id: String(new Date().getTime()), 
            title, 
            isDone: false
        }

        setTasks([newTask, ...tasks])
        setTitle('')
    }

    return (
        <Container>
            <Content>
                <h2>Todo list</h2>
                <button
                    onClick={handleShowInput}
                >
                    <BsPlusCircle />
                    New Task
                </button>
            </Content>

            {showInput && (
                <input 
                    autoFocus
                    type="text"
                    onChange={event => setTitle(event.target.value)} 
                    onKeyDown={(e) => handleSaveTask(e.key)}
                    placeholder="new task"
                    value={title}
                />
            )}
        </Container>
    )
}