import { Router } from "express";

import {Todo} from '../models/todo';

let todos:Todo[] = []

const router=Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({todos:todos})
})

router.post('/todo',(req,res,next)=>{
    const newTodo:Todo={
        id:new Date().toISOString(),
        text: req.body.text
    }
    todos.push(newTodo)
    res.status(200).json({message:'added successfully', todos:todos})
})

router.delete("/delete/:id", (req, res, next) => {
    const gettodo = todos.find((todoItem) => todoItem.id === req.params.id);
    todos = todos.filter((todoItem) => todoItem.id !== req.params.id);
    if (gettodo === undefined) {
      return res.status(404).json({ message: "item not found" });
    }
    return res.status(200).json({ message: "deleted successfull", todos: todos });
  });

router.put("/edit/:id", (req, res, next) => {
    const todoIndex = todos.findIndex(
      (todoItem) => todoItem.id === req.params.id
    );
    if (todoIndex >= 0) {
      todos[todoIndex] = {
        id: todos[todoIndex].id,
        text: req.body.text,
      };
      return res
        .status(200)
        .json({ message: "edited successfully", todos: todos });
    }
    return res.status(404).json({ message: "item not found" });
  });

export default router;