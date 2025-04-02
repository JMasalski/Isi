import {useState} from 'react'
import {Plus, LoaderCircle} from 'lucide-react'
import {useTodoStore} from "../store/useTodoStore.js";


const TodoForm = () => {
    const [title, setTitle] = useState("");
    const {addTodo, loading} = useTodoStore();
    const handleSubmit = async (e) => {
        e.preventDefault();
        addTodo(title);
    };

    return (
        <form
            className="flex gap-x-5 md:w-1/2"
            onSubmit={handleSubmit}>
            <input type="text"
                   placeholder="Add a new task"
                   className="bg-gray-800 text-white p-2 rounded-md w-full focus-within:outline-2 focus-within:outline-indigo-700"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
            />

            <button type="submit"
                    disabled={loading}
                    className="bg-indigo-500 text-white p-2 cursor-pointer rounded-md active:inset-shadow-sm active:inset-shadow-indigo-700">
                {loading ? <LoaderCircle className="animate-spin"/> : <Plus/>}
            </button>
        </form>
    )
}
export default TodoForm
