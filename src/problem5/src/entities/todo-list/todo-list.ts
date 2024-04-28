import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('todo_list')
export class TodoList {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name?: string;

}