import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  UpdateDateColumn,
} from "typeorm";
import { EGimnasio } from "./EntitieGimnasio";
import { EUser } from "./EntitieUser";
import { EOwner } from "./EntitieOwner";

@Entity("outlet")
export class EOutlet {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id?: number;

  @Column({ type: "varchar", length: 255 })
  name?: string;

  @Column({ type: "varchar", length: 255 })
  address?: string;

  @ManyToOne(() => EOwner, (owner) => owner.outlets, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_owner" })
  id_owner?: EOwner;

  @ManyToOne(() => EGimnasio, (gimnasio) => gimnasio.outlets, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_gimnasio" })
  id_gimnasio?: EGimnasio;

  //@ManyToMany(() => EUser, (user) => )

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
