import {
  Entity,
  Column,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EGimnasio } from "./EntitieGimnasio";

@Entity("routine")
export class ERoutine {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id?: number;

  @Column({ type: "varchar", length: 255 })
  tipo?: string;

  @Column({ type: "varchar", length: 255 })
  url_rutina?: string;

  @ManyToOne(() => EGimnasio, (gimnasio) => gimnasio.routines, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_gimnasio" })
  gimnasio?: EGimnasio;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
