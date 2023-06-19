import { ApiProperty } from '@nestjs/swagger/dist';
import { BelongsTo, BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Route } from 'src/routes/routes.model';
import { User } from 'src/users/users.model';

interface ObstacleCreationAttrs {
  icon: string;
  description: string;
}

@Table({ tableName: 'obstacles', createdAt: false, updatedAt: false })
export class Obstacle extends Model<Obstacle, ObstacleCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Other', description: 'icon name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  icon: string;

  @ApiProperty({ example: 'description', description: 'obstacle`s description' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @HasMany(() => Route)
  routes: Route[]
}
