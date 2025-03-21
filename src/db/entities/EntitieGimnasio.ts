import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
} from "typeorm";
import { EOutlet } from "./EntitieOutlet";
import { EOwner } from "./EntitieOwner";
import { EPlan } from "./EntitiePlan";

@Entity("gimnasio")
export class EGimnasio {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id?: number;

  @Column({ type: "varchar", length: 255 })
  name?: String;

  @Column({ type: "varchar", length: 255 })
  url_logo?: String;

  @OneToMany(() => EOutlet, (outlet) => outlet.id_gimnasio)
  outlets?: EOutlet[];

  @OneToMany(() => EPlan, (plan) => plan.id_gimnasio)
  plans?: EPlan[];

  @OneToOne(() => EOwner, { nullable: true })
  @JoinColumn({ name: "id_owner" })
  owner?: EOwner;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
