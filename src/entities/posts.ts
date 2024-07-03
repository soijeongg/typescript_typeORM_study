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
  postId: number;

  @Column()
  postName: string;

  @Column()
  postContent: string;

  @Column()
  view: number;

  @ManyToOne(() => User, (User) => User.Posts)
  User!: User;

  @OneToMany(() => Comment, (Comment) => Comment.Posts)
  Comments!: Comment[];

  @ManyToOne(() => subCategories, (subCategories) => subCategories.Posts)
  subCategories!: subCategories;

  constructor(postId:number,postName:string, postContent:string, view:number, comments:string){
    this.postId = postId;
    this.postName = postName;
    this.postContent = postContent;
    this.view = view;
  }
}
