import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as dayjs from 'dayjs';

const dateTransformer = {
  from: (value: Date | number) => {
    return dayjs(typeof value === 'number' ? value : value.getTime()).format('YYYY-MM-DD HH:mm:ss');
  },
  to: () => new Date(),
};
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
    name: 'create_time',
    precision: 3,
    transformer: dateTransformer,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  createTime?: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'update_time',
    precision: 3,
    transformer: dateTransformer,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  updateTime?: Date;
}
