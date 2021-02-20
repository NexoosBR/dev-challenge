import { Entity, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { CompanyModel } from './company.model'

@Entity('company_telephone')

export class CompanyTelephoneModel {
    @PrimaryGeneratedColumn('uuid')
    companyTelephoneId?: string

    @Column('varchar', { length: 36 })
    companyId: string

    @ManyToOne(() => CompanyModel, company => company.companyId, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinColumn({ name: 'companyId', referencedColumnName: 'companyId' })
    company?: CompanyModel

    @Column('varchar', { length: 14, nullable: true })
    telephone: string

    @CreateDateColumn({
      type: 'timestamp'
    })
    created?: Date

    @UpdateDateColumn({
      type: 'timestamp',
      default: null
    })
    updated?: Date

    @VersionColumn({ default: 0 })
    version?: number
}
