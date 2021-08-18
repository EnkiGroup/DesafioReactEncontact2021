import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { api } from '../service/api'

type TasksProps = {
    id: string
    title: string
    isDone: boolean
}

type TasksProviderProps = {
    children: ReactNode
}

interface TasksContextProps {
    tasks: TasksProps[]
    setTasks: (tasks: TasksProps[]) => void
    getActiveTasks: () => TasksProps[]
    getCompletedTasks: () => TasksProps[]
}

const TasksContext = createContext({} as TasksContextProps)

export function TasksProvider({ children }: TasksProviderProps){  

    const [tasks, setTasks] = useState<TasksProps[]>([])

    useEffect(() => {
        const getTasks = async () => {
        const { data } = await api.get('todos')
            setTasks(data.todos)
        }

        getTasks()
    }, [])

    function getActiveTasks(){
        return tasks.filter(task => task.isDone === false)
    }

    function getCompletedTasks(){
        return tasks.filter(task => task.isDone === true)
    }

    return (
        <TasksContext.Provider value={{
            tasks,
            setTasks,
            getActiveTasks,
            getCompletedTasks,
        }}>
            {children}
        </TasksContext.Provider>
    )
}

export function useTasks(){
    const context = useContext(TasksContext)

    return context
}