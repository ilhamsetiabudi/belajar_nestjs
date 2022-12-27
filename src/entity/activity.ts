import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  email: string;

  @Column()
  title: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({
    nullable: true,
  })
  deleted_at: Date;
}
