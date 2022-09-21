import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('t_user')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({
    length: 100,
  })
  userName: string;

  @Column({
    length: 11,
  })
  userPhone: string;

  @Column({
    length: 64,
  })
  userEmail: string;

  @Column({
    length: 100,
  })
  userAddress?: string;

  @Column({
    length: 128,
  })
  userPwd: string;

  @CreateDateColumn()
  createTime?: string;
  @UpdateDateColumn()
  updateTime?: string;
}
