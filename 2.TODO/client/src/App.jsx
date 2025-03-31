import React from 'react'
import TodoForm from './components/todoForm.jsx'
const App = () => {
    return (
        <div className="bg-gradient-to-b from-indigo-900 to-zinc-900 h-screen">
            <div className="container mx-auto border border-orange-700 flex flex-col items-center justify-center p-5 md:p-10 lg:p-20">
            <TodoForm/>
            </div>
        </div>
    )
}
export default App
