import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { PostEntity } from './posts.entity';
import { Address } from '../common/users.interface'

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  username: string;

  @Column('text')
  email: string;

  @Column('integer')
  age: number;

  @Column({ type: 'text', nullable: true })
  info?: string;

  @Column('json')
  address: Address;

  @OneToMany(() => PostEntity, post => post.user)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  posts: PostEntity[];
}