import { ApiProperty } from '@nestjs/swagger/dist';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Route } from 'src/routes/routes.model';
import { User } from 'src/users/users.model';

interface LikeCreationAttrs {
  userId: number;
  routeId: number;
}

@Table({ tableName: 'likes' })
export class Like extends Model<Like, LikeCreationAttrs> {

  @ApiProperty({ example: 1, description: 'route id' })
  @ForeignKey(() => Route)
  @Column({ type: DataType.NUMBER, primaryKey: true })
  routeId: number;

  @ApiProperty({ example: 2, description: 'user id' })
  @ForeignKey(() => User)
  @Column({ type: DataType.NUMBER, primaryKey: true })
  userId: number;
}
