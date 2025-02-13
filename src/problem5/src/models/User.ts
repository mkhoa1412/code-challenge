import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { Exclude } from 'class-transformer';
import bcrypt from "bcrypt";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text", unique: true })
  email!: string;

  @Exclude() 
  @Column({ type: "text", select: false })
  password!: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
