import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Change {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  collection: string;

  @Column('jsonb')
  data: any;

  @Column()
  version: number;
}
