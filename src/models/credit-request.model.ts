import { Entity, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { StatusCreditRequest } from '../services/utils/enum'
import { CompanyModel } from './company.model'

@Entity('credit_request')

export class CreditRequestModel {
    @PrimaryGeneratedColumn('uuid')
    creditRequestId?: string

    @Column('varchar', { length: 36 })
    companyId: string

    @ManyToOne(() => CompanyModel, company => company.companyId, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinColumn({ name: 'companyId', referencedColumnName: 'companyId' })
    company?: CompanyModel

    @Column('float', { precision: 8, scale: 2 })
    value: number

    @Column('varchar', { length: 30 })
    status: StatusCreditRequest

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
