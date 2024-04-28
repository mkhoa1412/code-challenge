// src/controllers/todoList.ts

import { Request, Response, query } from 'express';
import { TodoListService } from '../services/todo-list';

export class TodoListController {
  private todoListService = new TodoListService();

  getAllTodoLists = async (req: Request, res: Response) => {
    try {
      const where = req.query
      const todoLists = await this.todoListService.getAllTodoLists(where);
      res.json(todoLists);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  getTodoListById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const todoList = await this.todoListService.getTodoListById(Number(id));
      res.json(todoList);
    } catch (error) {
      res.status(404).json(error);
    }
  };

  createTodoList = async (req: Request, res: Response) => {
    const data = req.body;
    try {
      const todoList = await this.todoListService.createTodoList(data);
      res.status(201).json(todoList);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  updateTodoList = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const todoList = await this.todoListService.updateTodoList(Number(id), data);
      res.json(todoList);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  deleteTodoList = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await this.todoListService.deleteTodoList(Number(id));
      res.status(200).json({ message: 'Todo list deleted' });
    } catch (error) {
      console.log({error})
      res.status(400).json(error);
    }
  };
}
