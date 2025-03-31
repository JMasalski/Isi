import {Todo} from "../models/todo.model";

export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json({success: true, todos})
    } catch (error) {
        console.log("Error in getAllTodos", error);
        res.status(500).json({message: error.message});
    }
}
export const createTodo = async (req, res) => {
    const {title} = req.body;
    try {
        const todo = await Todo.create({
            title,

        })
        res.status(201).json({success: true, todo})
    } catch (error) {
        console.log("Error in createTodo", error);
        res.status(500).json({message: error.message});
    }
}
export const updateTodo = async (req, res) => {
    const {...data} = req.body;
    const {id} = req.params.id;
    try {
        const updatedTodo = await Todo.findOneAndUpdate({
            _id: id
        }, {...data}, {new: true});
        if (!updatedTodo) {
            return res.status(400).json({message: "Todo not found"})
        }
        return res.status(200).json({success:true, updatedTodo})
    } catch
        (error) {
        console.log("Error in updateTodo", error);
        res.status(500).json({message: error.message});
    }

}
export const deleteTodo = async (req, res) => {
    const {id} = req.params.id;
    try{
        const deletedTodo = await Todo.findOneAndDelete({
            _id: id
        });
        if (!deletedTodo) {
            return res.status(400).json({message: "Todo not found"})
        }
        return res.status(200).json({success:true, deletedTodo})
    }catch(err){
        console.log("Error in deleteTodo", error);
        res.status(500).json({message: error.message});
    }
}
