// src/services/todoList.ts

import { AppDataSource } from '../dbs/sqlite';
import { TodoList } from '../entities';

export class TodoListService {
  private todoListRepository = AppDataSource.getRepository(TodoList);

  async getAllTodoLists(): Promise<TodoList[]> {
    return this.todoListRepository.find();
  }

  async getTodoListById(id: number): Promise<TodoList | null> {
    return this.todoListRepository.findOneBy({ id });
  }

  async createTodoList(name: string): Promise<TodoList> {
    const todoList = new TodoList();
    todoList.name = name;
    return this.todoListRepository.save(todoList);
  }

  async updateTodoList(id: number, name: string): Promise<TodoList | null> {
    const todoList = await this.getTodoListById(id);
    if (!todoList) return null;
    todoList.name = name;
    return this.todoListRepository.save(todoList);
  }

  async deleteTodoList(id: number): Promise<void> {
    const todoList = await this.getTodoListById(id);
    if (!todoList) return null;
    await this.todoListRepository.remove(todoList);
  }
}
