import { Entity, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { CompanyModel } from './company.model'

@Entity('company_address')

export class CompanyAddressModel {
    @PrimaryGeneratedColumn('uuid')
    companyAddressId?: string

    @Column('varchar', { length: 36 })
    companyId: string

    @ManyToOne(() => CompanyModel, company => company.companyId, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinColumn({ name: 'companyId', referencedColumnName: 'companyId' })
    company?: CompanyModel

    @Column('varchar', { length: 50 })
    address: string

    @Column('int', { width: 11 })
    number: number

    @Column('varchar', { length: 60, nullable: true })
    complement?: string

    @Column('varchar', { length: 9 })
    cep: string

    @Column('varchar', { length: 50 })
    neighborhood: string

    @Column('varchar', { length: 100 })
    city: string

    @Column('varchar', { length: 2 })
    state: string

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
