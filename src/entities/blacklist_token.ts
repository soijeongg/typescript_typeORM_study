import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class BlacklistedToken {
  @PrimaryColumn()
  id: number;

  @Column()
  token: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamp')
  expiresAt: Date;

  constructor(id:number, token:string, createdAt:Date, expiresAt:Date) {
    this.id = id;
    this.createdAt = createdAt;
    this.token = token;
    this.expiresAt = expiresAt;
  }
}
