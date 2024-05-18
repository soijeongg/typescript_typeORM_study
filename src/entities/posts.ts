import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user';
import { Comment } from './comment';
import { subCategories } from './subCategories';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  postId!: number;

  @Column()
  postName!: string;

  @Column()
  postContent!: string;

  @Column()
  view!: number;

  @ManyToOne(() => User, (User) => User.Posts)
  User!: User;

  @OneToMany(() => Comment, (Comment) => Comment.Posts)
  Comment!: Comment;

  @ManyToOne(() => subCategories, (subCategories) => subCategories.Posts)
  subCategories!: subCategories;

  //한개의  포스트는 여러개의 댓글을 가질 수 있고 여러개의 댓글은 하나의 포스트를 가질 수 있다
}
