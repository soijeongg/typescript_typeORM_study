import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './index';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  tokenId!: number;

  @Column()
  jti: string;
  @Column()
  createdAt: Date;

  @Column()
  expirationDate: Date;

  @Column()
  isRevoked: boolean;

  @ManyToOne(() => User, (User) => User.accessTokens)
  user!: User;

  constructor(
    jti: string,
    createdAt: Date,
    isRevoked: boolean,
    expirationDate: Date,
  ) {
    this.jti = jti;
    this.createdAt = createdAt;
    this.isRevoked = isRevoked;
    this.expirationDate = expirationDate;
  }
}
