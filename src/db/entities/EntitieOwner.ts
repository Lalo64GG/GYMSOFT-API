import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { EOutlet } from "./EntitieOutlet";

@Entity("owners")

export class EOwner {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id?: number;

  @Column({ type: "varchar", length: 255 })
  name?: string;

  @Column({ type: "varchar", length: 255 })
  last_name?: string;

  @Column({ type: "varchar", length: 255 })
  email?: string;

  @Column({ type: "varchar", length: 255 })
  password?: string;

  @OneToMany(() => EOutlet, (outlet) => outlet.id_owner)
  outlets?: EOutlet[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at?: Date;

  @Column({ type: "timestamp", nullable: true })
  updated_at?: Date;
}