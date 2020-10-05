import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProjectPrice {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float', nullable: false })
  grundpreis: number;

  @Column({ type: 'float', nullable: false })
  arbeitspreis: number;

  @Column({ type: 'float', nullable: false })
  grundpreisGv: number;

  @Column({ type: 'float', nullable: false })
  arbeitspreisGv: number;

}