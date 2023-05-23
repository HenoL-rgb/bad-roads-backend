import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Dislike } from 'src/dislikes/dislikes.model';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Like } from './likes.model';

@Injectable()
export class LikesService {
  constructor(@InjectModel(Like) private likeRepository: typeof Like, @InjectModel(Dislike) private dislikeRepository: typeof Dislike) {}

  create = async (createLikeDto: CreateLikeDto) => {
    try {
      const isExist = await this.likeRepository.findOne({
        where: {
          userId: createLikeDto.userId,
          routeId: createLikeDto.routeId,
        },
      });
      if (isExist) {
        const res = await this.likeRepository.destroy({
          where: {
            userId: createLikeDto.userId,
            routeId: createLikeDto.routeId,
          },
        });
        
        return res;
      }

      const isDisliked = await this.dislikeRepository.findOne({
        where: {
          userId: createLikeDto.userId,
          routeId: createLikeDto.routeId,
        },
      });
      if (isDisliked) {
        const res = await this.dislikeRepository.destroy({
          where: {
            userId: createLikeDto.userId,
            routeId: createLikeDto.routeId,
          },
        });
        
        return res;
      }

      const res = await this.likeRepository.create({
        ...createLikeDto,
      });
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  findByUserId(id: number) {
    const userLikes = this.likeRepository.findAll({
      where: {
        userId: id,
      },
    });

    return userLikes;
  }

  findAll() {
    return `This action returns all likes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number, updateLikeDto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
