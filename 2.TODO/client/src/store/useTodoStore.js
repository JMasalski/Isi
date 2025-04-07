import {create} from "zustand";
import axiosInstance from "../lib/axiosInstance.js";

export const useTodoStore = create ((set) => ({
    todos: [],
    loading: false,

    addTodo: async (title) =>{
        try{
            set ({loading: true});
            const res = await axiosInstance.post('/todos', {title});
            const newTodo = res.data.todo;
            set(state=> ({todos: [...state.todos, newTodo]}));
        }catch(err){
            console.log(err.message);
        }finally {
            set({loading: false});
        }
    },
    fetchAllTodos: async () => {
        try {
            set({ loading: true });
            const res = await axiosInstance.get("/todos");
            set({ todos: res.data.todos });
        } catch (err) {
            console.log(err.message);
        } finally {
            set({ loading: false });
        }
    },
    deleteTodo: async (id) =>{
        try{
            const res = await axiosInstance.delete(`/todos/${id}`)
            set({todos: res.data.todos})
        }catch(err){
            console.log(err.message);
        }
    },
    toggleTodo: async (id, completed) => {
        try {
            const res = await axiosInstance.put(`/todos/${id}`, { completed });
            const UpdatedNewTodo = res.data.updatedTodo; // lub `res.data`, zależy od backendu
            set(state => ({
                todos: state.todos.map(todo =>
                    todo._id === id ? UpdatedNewTodo : todo
                )
            }));
        } catch (err) {
            console.error(err.message);
        }
    }
}))