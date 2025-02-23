import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { EOutlet } from "./EntitieOutlet";
import { EOwner } from "./EntitieOwner";

@Entity("gimnasio")
export class EGimnasio {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id?: number;

  @Column({ type: "varchar", length: 255 })
  name?: string;

  @OneToMany(() => EOutlet, (outlet) => outlet.id_gimnasio)
  outlets?: EOutlet[];

  @OneToOne(() => EOwner, { nullable: true })
  @JoinColumn({ name: "id_owner" })
  owner?: EOwner;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at?: Date;

  @Column({ type: "timestamp", nullable: true })
  updated_at?: Date;
}
