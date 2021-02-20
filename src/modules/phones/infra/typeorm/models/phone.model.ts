import { Client } from '../../../../../modules/clients/infra/typeorm/models/client.model'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm'

@Entity('phones', { schema: 'nexoos_db' })
class Phone {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ length: 20 })
  phoneNumber: string

  @ManyToOne(() => Client, (client: Client) => client.phones, {
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

export { Phone }
