import { Entity, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm'
import { StatusLoan } from '../services/utils/enum'
import { CompanyModel } from './company.model'
import { CreditRequestModel } from './credit-request.model'

@Entity('loan')

export class LoanModel {
    @PrimaryGeneratedColumn('uuid')
    loanId?: string

    @Column('varchar', { length: 36 })
    creditRequestId: string

    @OneToOne(() => CreditRequestModel, creditRequest => creditRequest.creditRequestId, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinColumn({ name: 'creditRequestId', referencedColumnName: 'creditRequestId' })
    creditRequest?: CompanyModel

    @Column('float', { precision: 16, scale: 2 })
    finalValue: number

    @Column('float', { precision: 8, scale: 2 })
    interestRate: number

    @Column('int', { width: 3 })
    numberOfInstallments: number

    @Column('float', { precision: 16, scale: 2 })
    installmentValue: number

    @Column('varchar', { length: 30 })
    status: StatusLoan

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
