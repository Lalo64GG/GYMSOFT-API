import {
  Entity,
  Column,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EOutlet } from "./EntitieOutlet";
import { EPlan } from "./EntitiePlan";
import { EAttendance } from "./EntitieAttendance";
import { EHistoryRenewal } from "./EntitieHistoryRenewal";

@Entity("users")
export class EUser {
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

  @Column({ type: "varchar", length: 255 })
  phone?: string;

  @Column({ type: "varchar", length: 255 })
  input_token?: string;

  @Column({ type: "varchar", length: 60 })
  sex?: string;

  @Column({ type: "int" })
  edad?: number;

  @Column({ type: "varchar", length: 255 })
  photo?: string;

  @Column({ type: "boolean", default: false })
  membership_status?: boolean;

  @ManyToOne(() => EOutlet, (outlet) => outlet.users, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "id_outlet" })
  outlet?: EOutlet;

  @ManyToOne(() => EPlan, (planes) => planes.user, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_plan" })
  plan?: EPlan;

  @OneToMany(() => EAttendance, (attendance) => attendance.user, {
    onDelete: "CASCADE",
  })
  attendances?: EAttendance[];

  @OneToMany(() => EHistoryRenewal, (history_renewal) => history_renewal.user, {
    onDelete: "CASCADE",
  })
  history_renewal?: EHistoryRenewal[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
