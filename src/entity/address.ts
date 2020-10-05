import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hausnummer } from "./hausnummer";
import { ProjectPrice } from "./project-price";

@Entity()
export class Address {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  strasse: string;

  @Column({ type: 'varchar', nullable: false, length: 5 })
  postleitzahl: string;

  @Column({ type: 'varchar', nullable: false })
  stadt: string;

  @ManyToMany(type => Hausnummer, { cascade: true })
  @JoinTable()
  hausnummern: Hausnummer[];

  @OneToOne(type => ProjectPrice)
  @JoinColumn()
  projectPrice: ProjectPrice;

}