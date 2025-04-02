import React, {useEffect} from 'react'
import TodoForm from './components/todoForm.jsx'
import {useTodoStore} from "./store/useTodoStore.js";
import TodoElement from "./components/TodoElement.jsx";

const App = () => {
    const {fetchAllTodos, todos} = useTodoStore();

    useEffect(() => {
        fetchAllTodos()
    }, [])
    return (
        <div className="bg-gradient-to-b from-indigo-900 to-zinc-900 h-screen">
            <div className="container mx-auto  flex flex-col items-center justify-center gap-y-5 p-5 md:p-10 lg:p-20">
                <TodoForm/>
                <div className="w-full space-y-5">
                    {todos.map((todo) => (
                        <TodoElement key={todo.id} title={todo.title} id={todo.id}/>
                    ))}
                </div>
            </div>

        </div>
    )
}
export default App
