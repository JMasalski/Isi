import {create} from "zustand";
import axiosInstance from "../lib/axiosInstance.js";

export const useTodoStore = create ((set) => ({
    todos: [],
    loading: false,

    addTodo: async (title) =>{
        try{
            set ({loading: true});
            const res = await axiosInstance.post('/todos', {title});
            const newTodo = res.data;
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
            set({ todos: res.data.todos });  // Ustawienie danych w Zustand!
            console.log(res.data);
        } catch (err) {
            console.log(err.message);
        } finally {
            set({ loading: false });
        }
    }
}))