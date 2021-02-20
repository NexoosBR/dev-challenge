import { Entity, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { StatusInstallment } from '../services/utils/enum'
import { LoanModel } from './loan.model'

@Entity('installment')

export class InstallmentModel {
    @PrimaryGeneratedColumn('uuid')
    installmentId?: string

    @Column('varchar', { length: 36 })
    loanId: string

    @ManyToOne(() => LoanModel, loan => loan.loanId, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinColumn({ name: 'loanId', referencedColumnName: 'loanId' })
    loan?: LoanModel

    @Column({ type: 'date' })
    dueDate: Date

    @Column({ type: 'date', nullable: true })
    payday?: Date | null

    @Column('varchar', { length: 30 })
    status: StatusInstallment

    @CreateDateColumn({
      type: 'timestamp'
    })
    created?: Date

    @UpdateDateColumn({
      type: 'timestamp'
    })
    updated?: Date

    @VersionColumn({ default: 0 })
    version?: number
}
