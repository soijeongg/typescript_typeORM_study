import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { User } from './index';

@Entity()
export class AccessToken {
  @PrimaryColumn()
  tokenId: number;

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
    tokenId: number,
    jti: string,
    createdAt: Date,
    isRevoked: boolean,
    expirationDate: Date,
  ) {
    this.tokenId = tokenId;
    this.jti = jti;
    this.createdAt = createdAt;
    this.isRevoked = isRevoked;
    this.expirationDate = expirationDate;
  }
}
