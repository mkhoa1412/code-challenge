import express, { Router } from 'express';
import { TodoListController } from '../controllers';

const router: Router = express.Router();
const todoListController: TodoListController = new TodoListController();
const basePath: string = '/todo-lists';
/**
 * @openapi
 * tags:
 *   name: Todo List
 *   description: Operations related to managing Todo Lists.
 * components:
 *   schemas:
 *     TodoList:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         type:
 *           type: enum
 *           enum: [public, private, shared]
 *       required:
 *           - name
 *           - type
 *
 * paths:
 *   /todo-lists:
 *     get:
 *       summary: Get all todo lists
 *       description: Get all todo lists
 *       tags: [Todo List]
 *       parameters:
 *         - in: query
 *           name: type
 *           description: Filter taqwfst42odo lists by type
 *           schema:
 *             type: string
 *             enum: [public, private, shared]  
 *       responses:
 *         200:
 *           description: Successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/TodoList'
 *         500:
 *           description: Internal server error
 *     post:
 *       summary: Create todo list
 *       description: Create todo list
 *       tags: [Todo List]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoList'
 *       responses:
 *         201:
 *           description: Successful
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/TodoList'
 *         400:
 *           description: Bad request
 *
 *   /todo-lists/{id}:
 *     get:
 *       summary: Get todo list by id
 *       description: Get todo list by id
 *       tags: [Todo List]
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the todo list
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: Successful
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/TodoList'
 *         404:
 *           description: Not found
 *     patch:
 *       summary: Update todo list
 *       description: Update todo list
 *       tags: [Todo List]
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the todo list
 *           required: true
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoList'
 *       responses:
 *         200:
 *           description: Successful
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/TodoList'
 *         400:
 *           description: Bad request
 *         404:
 *           description: Not found
 *     delete:
 *       summary: Delete todo list
 *       description: Delete todo list
 *       tags: [Todo List]
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the todo list
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: Successful
 *         400:
 *           description: Bad request
 */


router.get(basePath, todoListController.getAllTodoLists);
router.get(`${basePath}/:id`, todoListController.getTodoListById);
router.post(basePath, todoListController.createTodoList);
router.patch(`${basePath}/:id`, todoListController.updateTodoList);
router.delete(`${basePath}/:id`, todoListController.deleteTodoList);

export default router;
