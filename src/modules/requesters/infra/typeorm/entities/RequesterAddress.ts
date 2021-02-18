import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import Requester from './Requester';

@Entity('requesters_addresses')
class RequesterAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  requesterId: string;

  @ManyToOne(() => Requester, requester => requester.addresses, {
    cascade: ['insert', 'update'],
  })
  requester: Requester;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default RequesterAddress;
