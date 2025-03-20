import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn,
} from "typeorm";
import { EGimnasio } from "./EntitieGimnasio";

@Entity("plans")
export class EPlan {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id?: number;

    @Column({ type: "varchar", length: 255 })
    name?: String;

    @Column({ type: "float" })
    cost?: number;

    @Column({ type: "date" })
    date?: Date;

    @ManyToOne(() => EGimnasio, (gimnasio) => gimnasio.plans, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "id_gimnasio" })
    id_gimnasio?: EGimnasio;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;
}
