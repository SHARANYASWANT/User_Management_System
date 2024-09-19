import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    password: string;

    @Column({unique:true})
    email: string;

    @Column('simple-array')
    roles:[string];
}