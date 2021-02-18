import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import RequesterAddress from './RequesterAddress';
import RequesterPhone from './RequesterPhone';

@Entity('requesters')
class Requester {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  companyName: string;

  @Column()
  cnpj: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => RequesterAddress,
    requesterAddress => requesterAddress.requester,
    {
      cascade: ['insert', 'update'],
    },
  )
  addresses: RequesterAddress[];

  @OneToMany(() => RequesterPhone, requesterPhone => requesterPhone.requester, {
    cascade: ['insert', 'update'],
  })
  phones: RequesterPhone[];
}

export default Requester;
