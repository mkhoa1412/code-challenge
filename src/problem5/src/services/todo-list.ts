// src/services/todoList.ts

import { FindOptionsWhere } from 'typeorm';
import { AppDataSource } from '../dbs/sqlite';
import { TODO_LIST_TYPE, TodoList } from '../entities';

export class TodoListService {
  private todoListRepository = AppDataSource.getRepository(TodoList);

  async getAllTodoLists(where?: FindOptionsWhere<TodoList>): Promise<TodoList[]> {
    console.log({first: where})
    return this.todoListRepository.find({
      where
    });
  }

  async getTodoListById(id: number): Promise<TodoList | null> {
    return this.todoListRepository.findOneBy({ id });
  }

  async createTodoList(data: Partial<TodoList>): Promise<TodoList> {
    return this.todoListRepository.save(data);
  }

  async updateTodoList(id: number, data?: Partial<TodoList>): Promise<TodoList | null> {
    const todoList = await this.getTodoListById(id);
    if (!todoList) return null;
    Object.assign(todoList, data);
    return this.todoListRepository.save(todoList);
  }

  async deleteTodoList(id: number): Promise<void> {
    const todoList = await this.getTodoListById(id);
    if (!todoList) return null;
    await this.todoListRepository.remove(todoList);
  }
}
