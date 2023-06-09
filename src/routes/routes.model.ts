import { ApiProperty } from '@nestjs/swagger/dist';
import { BelongsTo, BelongsToMany, ForeignKey, HasMany } from 'sequelize-typescript';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Dislike } from 'src/dislikes/dislikes.model';
import { Image } from 'src/images/images.model';
import { Like } from 'src/likes/likes.model';
import { User } from 'src/users/users.model';

interface RouteCreationAttrs {
  route: string;
  icon: string;
  userId: number;
}

@Table({ tableName: 'routes' })
export class Route extends Model<Route, RouteCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  route: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  icon: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isApproved: boolean;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  author: User;

  @BelongsToMany(() => User, {
    through: () => Like
  })
  likedUsers: User[];

  @BelongsToMany(() => User, {
    through: () => Dislike
  })
  dislikedUsers: User[];
  
}
