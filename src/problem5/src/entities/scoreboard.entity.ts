import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";

import { User } from "./user.entity";

@Entity("scoreboards")
export class Scoreboard {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Index("index_fk_scoreboard_user")
  userId: string;

  @Column()
  score: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, { onDelete: "CASCADE", eager: true })
  @JoinColumn({ name: "userId" })
  user: Relation<User>;
}
