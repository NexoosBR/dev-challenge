import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import Requester from './Requester';

@Entity('requesters_phones')
class RequesterPhone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  phone: string;

  @Column()
  requesterId: string;

  @ManyToOne(() => Requester, requester => requester.phones, {
    cascade: ['insert', 'update'],
  })
  requester: Requester;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default RequesterPhone;
