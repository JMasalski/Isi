import React from 'react'
import {Trash2} from "lucide-react";
import {useTodoStore} from "../store/useTodoStore.js";
const TodoElement = ({title, id,completed}) => {
    const {deleteTodo, toggleTodo} = useTodoStore();
    const handleCheckboxChange = () => {
        toggleTodo(id,!completed)
    }
    return (
        <div className="p-2 md:p-4 bg-gradient-to-b from-sky-300 to-sky-700 rounded-xl text-white w-full h-12 flex items-center justify-between">
            <p className={`font-bold text-lg text-black ${completed ? 'line-through' : ''}`}>
                {title}
            </p>
            <div className="flex items-center gap-x-5">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={handleCheckboxChange}
                    className="w-5 h-5 md:size-6 lg:size-7 accent-indigo-500 rounded-full border-gray-300 focus:ring-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800"
                />
                <button
                    onClick={() => deleteTodo(id)}
                    className="bg-red-500 rounded-md p-1 hover:bg-red-600 transition duration-150"
                >
                    <Trash2 />
                </button>
            </div>
        </div>
    )
}
export default TodoElement
