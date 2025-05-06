import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/user.entity';

@Entity()
export class InvestmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  amount: number;

  @Column('date')
  startDate: Date;

  @Column('date')
  endDate: Date;

  @Column('decimal')
  interestRate: number;

  @ManyToOne(() => User, user => user.investments)
  owner: User;
}
