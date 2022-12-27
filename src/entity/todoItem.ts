import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class todoItem {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  activity_group_id: string;

  @Column()
  title: string;

  @Column({
    default: '1',
  })
  is_active: string;

  @Column({
    default: 'very-high',
  })
  priority: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({
    nullable: true,
  })
  deleted_at: Date;
}
