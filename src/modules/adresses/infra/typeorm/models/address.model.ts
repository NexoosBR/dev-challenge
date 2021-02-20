import { Client } from '../../../../../modules/clients/infra/typeorm/models/client.model'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm'

@Entity('addresses', { schema: 'nexoos_db' })
class Address {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ length: 10 })
  zipCode: string

  @Column({ length: 100 })
  address: string

  @Column()
  addressNumber: number

  @Column({ length: 50 })
  complement?: string

  @Column({ length: 50 })
  district: string

  @Column({ length: 20 })
  city: string

  @Column({ length: 30 })
  state: string

  @ManyToOne(() => Client, (client: Client) => client.addresses, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn({ name: 'clientId' })
  client: string

  @CreateDateColumn({ type: 'timestamp' })
  created?: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated?: Date

  @VersionColumn({ default: 0 })
  version?: number
}

export { Address }
