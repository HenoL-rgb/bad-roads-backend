import { ApiProperty } from '@nestjs/swagger/dist';
import { BelongsTo, BelongsToMany, ForeignKey, HasMany } from 'sequelize-typescript';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Dislike } from 'src/dislikes/dislikes.model';
import { Like } from 'src/likes/likes.model';
import { Route } from 'src/routes/routes.model';
import { User } from 'src/users/users.model';

interface ImageCreationAttrs {
  path: string;
  routeId: number;
}

@Table({ tableName: 'images' })
export class Image extends Model<Image, ImageCreationAttrs> {

  @Column({ type: DataType.TEXT, allowNull: false })
  path: string;

  @ForeignKey(() => Route)
  @Column({ type: DataType.INTEGER })
  routeId: number;

  @BelongsTo(() => Route, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  route: Route;

}
