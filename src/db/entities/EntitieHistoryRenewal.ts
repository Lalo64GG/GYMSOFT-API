import {
  Entity,
  Column,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EUser } from "./EntitieUser";
import { EPlan } from "./EntitiePlan";

@Entity("history_renewal")
export class EHistoryRenewal {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id?: number;

  @Column({ type: "date" })
  fecha_renovacion?: Date;

  @ManyToOne(() => EUser, (user) => user.history_renewal, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_user" })
  user?: EUser;

  @ManyToOne(() => EPlan, (plan) => plan.history_renewal, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_plan" })
  plan?: EPlan;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
