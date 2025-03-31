import {Router} from 'express'
import {getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo} from '../controllers/todo.controller.js';
const todoRoutes = Router();

todoRoutes.get('/',getAllTodos);
todoRoutes.post('/',createTodo);
todoRoutes.put('/:id',updateTodo);
todoRoutes.delete('/:id',deleteTodo);


export default todoRoutes;