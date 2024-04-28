import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum TODO_LIST_TYPE {
  PRIVATE = 'private',
  SHARED = 'shared',
  PUBLIC = 'public',
}

@Entity('todo_list')
export class TodoList {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column({type: 'text', enum: TODO_LIST_TYPE})
  type: TODO_LIST_TYPE
}