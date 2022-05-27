import { AutoIncrement, Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Photo } from './photo.model';

@Table
export class User extends Model<User> {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  // @HasMany(() => Photo)
  // photos: Photo[];
}