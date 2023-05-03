import { ApiProperty } from '@nestjs/swagger/dist';
import { BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';

interface Point {
    lat: number;
    lon: number;
}

interface RouteCreationAttrs {
  route: string;
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
}
