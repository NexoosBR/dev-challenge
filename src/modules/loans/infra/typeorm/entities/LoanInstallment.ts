import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm';
import Loan from './Loan';

@Entity('loan_installments')
class LoanInstallment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  value: number;

  @Column()
  paid: boolean;

  @Column()
  expirationDate: Date;

  @Column()
  paidAt: Date;

  @Column()
  loanId: string;

  @ManyToOne(() => Loan, loan => loan.loanInstallments, {
    cascade: ['insert', 'update'],
  })
  loan: Loan;
}

export default LoanInstallment;
