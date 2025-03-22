import {
  Entity,
  Column,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EUser } from "./EntitieUser";

@Entity("attendance")
export class EAttendance {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id?: number;

  @Column({ type: "time" })
  entrada?: string;

  @Column({ type: "time" })
  salida?: string;

  @Column({ type: "date" })
  fecha?: Date;

  @Column({ type: "varchar", length: 255 })
  estatus?: string;

  @ManyToOne(() => EUser, (user) => user.attendances, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_user" })
  user?: EUser;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
