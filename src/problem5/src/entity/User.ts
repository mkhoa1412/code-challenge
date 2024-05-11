import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: '0' })
  phoneNumber: string;

  @Column({ type: 'timestamp', nullable: true })
  last_updated: Date;

  @Column({ type: 'timestamp' })
  timestamp: Date;
}
