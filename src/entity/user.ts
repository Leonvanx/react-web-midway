import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('t_user')
export class User {
  @PrimaryGeneratedColumn({
    name: 'user_id',
  })
  userId?: number;

  @Column({
    length: 100,
    name: 'user_name',
  })
  userName: string;

  @Column({
    length: 11,
    name: 'user_phone',
  })
  userPhone: string;

  @Column({
    length: 64,
    name: 'user_email',
  })
  userEmail: string;

  @Column({
    length: 100,
    name: 'user_address',
  })
  userAddress?: string;

  @Column({
    length: 128,
    name: 'user_pwd',
  })
  userPwd: string;

  @CreateDateColumn({
    name: 'create_time',
  })
  createTime?: string;

  @UpdateDateColumn({
    name: 'update_time',
  })
  updateTime?: string;
}
