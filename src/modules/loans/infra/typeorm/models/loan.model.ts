import { Client } from '../../../../../modules/clients/infra/typeorm/models/client.model'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm'

@Entity('loans', { schema: 'nexoos_db' })
class Loan {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ length: 50 })
  creditRequestValue: string

  @Column({ length: 20, default: 'pending' })
  status: string

  @Column()
  installments: number

  // month
  @Column('decimal', { precision: 2, scale: 1 })
  interestRate: number

  @Column({ length: 50 })
  loanValue: string

  @CreateDateColumn({ type: 'timestamp' })
  created?: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated?: Date

  @VersionColumn({ default: false })
  version?: number

  @ManyToOne(() => Client, (client: Client) => client.loans, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn({ name: 'clientId' })
  client: string
}

export { Loan }
