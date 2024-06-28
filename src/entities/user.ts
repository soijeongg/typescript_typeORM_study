import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment, Posts, AccessToken, RefreshToken } from './index';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @OneToMany(() => Comment, (Comment) => Comment.user)
  comments!: Comment[];

  @OneToMany(() => Posts, (Posts) => Posts.User)
  Posts!: Posts[];

  @OneToMany(() => AccessToken, (AccessToken) => AccessToken.user)
  accessTokens!: AccessToken[];

  @OneToMany(() => RefreshToken, (RefreshToken) => RefreshToken.user)
  RefeshTkoens!: RefreshToken[];
}
//한개의  유저는 여러개의 포스트를 작성할 수 있고 여러게의 포스트는 한명의 유저를 가질 수 있다
//한개의 유저는 여러개의 댓글을 작성할 수 있고 여러 댓글을 한 유저를 가진다
