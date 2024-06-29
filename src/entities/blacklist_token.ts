import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class BlacklistedToken {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  token: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamp')
  expiresAt: Date;

  constructor( token: string, createdAt: Date, expiresAt: Date) {
    this.createdAt = createdAt;
    this.token = token;
    this.expiresAt = expiresAt;
  }
}
