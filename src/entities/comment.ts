import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  NumericType,
  ManyToOne,
} from 'typeorm';
import { User } from './user';
import { Posts } from './posts';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  commentId!: number;

  @Column()
  content!: string;

  @ManyToOne(() => User, (user) => user.comments)
  user!: User;

  @ManyToOne(() => Posts, (Posts) => Posts.Comment)
  Posts!: Posts;
}
