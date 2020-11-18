import { Column, Entity, Generated, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class RefreshToken {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column({ type: 'datetime' })
  expDate: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

}