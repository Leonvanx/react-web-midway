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
  userPhone?: string;

  @Column({
    length: 64,
    name: 'user_email',
  })
  userEmail: string;

  @Column({
    length: 128,
    name: 'user_pwd',
  })
  userPwd: string;

  @Column({
    length: 100,
    name: 'user_address',
  })
  userAddress?: string;

  @CreateDateColumn({
    type: 'datetime',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  create_time?: Date;

  @UpdateDateColumn({
    type: 'datetime',
    precision: 3,
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  update_time?: Date;
}
