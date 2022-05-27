import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class LoginUser extends Model<LoginUser>
{
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column
    userName: string;

    @Column
    password: string;

    @Column({ defaultValue: true })
    isActive: boolean;

    @Column
    userId: number;
}