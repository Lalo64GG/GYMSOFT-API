import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("users")

// TODO: Faltan datos por agregar a la entidad
export class EUser{
@PrimaryColumn({type: "bigint"})
    id?: number;

    @Column({type: "varchar", length: 255})
    name?: string;

    @Column({type: "varchar", length: 255})
    last_name?: string;

    @Column({type: "varchar", length: 255})
    phone?: string;

    @Column({type: "varchar", length: 255})
    input_token?: string;
    
    @Column({type: "varchar", length: 60})
    sex?: String

    @Column({type: "varchar", length: 255})
    photo?: string;
    
    @Column({type:"boolean", default: false})
    membership_status?: boolean;

    @Column({type: "bigint", foreignKeyConstraintName: "id"})
    id_sucursal?: number;

    @Column({type: "bigint", foreignKeyConstraintName: "id"})
    id_actualPlan?: number;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at?: Date;
    
    @Column({type: "timestamp", nullable: true})
    updated_at?: Date;
}