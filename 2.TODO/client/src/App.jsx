import React, {useEffect} from 'react'
import TodoForm from './components/todoForm.jsx'
import {useTodoStore} from "./store/useTodoStore.js";
import TodoElement from "./components/TodoElement.jsx";

const App = () => {
    const {fetchAllTodos, todos} = useTodoStore();

    useEffect(() => {
        fetchAllTodos()
    }, [fetchAllTodos])
    return (
        <div className="bg-gradient-to-b from-indigo-900 to-zinc-900 h-screen">
            <div className="container mx-auto  flex flex-col items-center justify-center gap-y-5 p-5 md:p-10 lg:p-12">
                <TodoForm/>
                {todos.length === 0 ? <p className="bg-indigo-300 p-2 md:p-4 lg:p-6 rounded-md text-2xl">Dodaj swoje pierwsze zadanie</p> : (
                    <div className="bg-indigo-300 p-2 md:p-4 rounded-md  w-full">
                        <div className=" space-y-5  ">
                            {todos.map((todo) => (
                                <TodoElement key={todo._id} title={todo.title} id={todo._id} completed={todo.completed}/>
                            ))}
                        </div>
                    </div>)}

            </div>

        </div>
    )
}
export default App
