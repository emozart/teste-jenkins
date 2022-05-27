import { AutoIncrement, BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Photo extends Model<Photo> {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Column('text')
  description: string;

  @Column
  filename: string;

  @Column('int')
  views: number;

  @Column
  isPublished: boolean;

  @BelongsTo(() => User)
  user: User

  @ForeignKey(() => User)
  @Column
  userId: number;

}