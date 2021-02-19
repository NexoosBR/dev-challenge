import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import LoanInstallment from './LoanInstallment';
import LoanRequest from './LoanRequest';

@Entity('loans')
class Loan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  value: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  totalValue: number;

  @Column()
  term: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
  })
  interestRate: number;

  @Column()
  expirationDay: number;

  @Column()
  loanRequestId: string;

  @OneToOne(() => LoanRequest, loanRequest => loanRequest.id)
  loanRequest: LoanRequest;

  @OneToMany(() => LoanInstallment, loanInstallment => loanInstallment.loan, {
    cascade: ['insert', 'update'],
  })
  loanInstallments: LoanInstallment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Loan;
