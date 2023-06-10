import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './users.entity';

@Entity('Post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreation: Date;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  text: string;

  @Column({ type: 'integer', nullable: false })
  userId: number;

  @ManyToOne(() => UserEntity, user => user.posts)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}