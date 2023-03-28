import { BaseEntity } from "../../config/base.entity";
import { ROLES } from "../../constants";
import { IUser } from "../interfaces/user.interface";
import { Entity } from "typeorm";
import { Column } from "typeorm/decorator/columns/Column";
import { Exclude } from "class-transformer";

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Exclude()
    @Column()
    password: string;

    @Column({ type: 'enum', enum: ROLES })
    role: ROLES;
}