import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { EGimnasio } from "./EntitieGimnasio";
import { EUser } from "./EntitieUser";
import { EHistoryRenewal } from "./EntitieHistoryRenewal";

@Entity("plans")
export class EPlan {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id?: number;

  @Column({ type: "varchar", length: 255 })
  name?: String;

  @Column({ type: "float" })
  cost?: number;

  @Column({ type: "varchar" })
  date_duration?: string;

  @ManyToOne(() => EGimnasio, (gimnasio) => gimnasio.plans, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_gimnasio" })
  id_gimnasio?: EGimnasio;

  @OneToMany(() => EUser, (user) => user.plan)
  user?: EUser;

  @OneToMany(() => EHistoryRenewal, (history_renewal) => history_renewal.plan, {
    onDelete: "CASCADE",
  })
  history_renewal?: EHistoryRenewal[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
