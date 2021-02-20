import { Address } from '../../../../../modules/adresses/infra/typeorm/models/address.model'
import { Loan } from '../../../../../modules/loans/infra/typeorm/models/loan.model'
import { Phone } from '../../../../../modules/phones/infra/typeorm/models/phone.model'
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm'

@Entity('clients', { schema: 'nexoos_db' })
class Client {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ length: 50 })
  companyName: string

  @Column({ length: 20, unique: true })
  cnpj: string

  @CreateDateColumn({ type: 'timestamp' })
  created?: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated?: Date

  @VersionColumn({ default: false })
  version?: number

  @OneToMany(() => Phone, (phone: Phone) => phone.client)
  phones?: Phone[]

  @OneToMany(() => Address, (address: Address) => address.client)
  addresses?: Address[]

  @OneToMany(() => Loan, (loan: Loan) => loan.client)
  loans?: Loan[]
}

export { Client }
