import Requester from '@modules/requesters/infra/typeorm/entities/Requester';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import LoanRequestStatus from './LoanRequestStatus';

@Entity('loan_requests')
class LoanRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  value: number;

  @Column()
  requesterId: string;

  @Column()
  loanRequestStatusId: string;

  @ManyToOne(() => Requester, requester => requester.id)
  requester: Requester;

  @ManyToOne(() => LoanRequestStatus, loanRequestStatus => loanRequestStatus.id)
  loanRequestStatus: LoanRequestStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default LoanRequest;
