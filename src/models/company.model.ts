import { Entity, Column, CreateDateColumn, UpdateDateColumn, VersionColumn, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity('company')
@Index('UNIQUE', ['cnpj'], { unique: true })

export class CompanyModel {
    @PrimaryGeneratedColumn('uuid')
    companyId?: string

    @Column('varchar', { length: 100 })
    companyName: string

    @Column('varchar', { length: 14 })
    cnpj: string

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
