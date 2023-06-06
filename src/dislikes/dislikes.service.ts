import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDislikeDto } from './dto/create-dislike.dto';
import { UpdateDislikeDto } from './dto/update-dislike.dto';
import { Dislike } from './dislikes.model';
import { Like } from 'src/likes/likes.model';

@Injectable()
export class DislikesService {
  constructor(@InjectModel(Dislike) private dislikeRepository: typeof Dislike, @InjectModel(Like) private likeRepository: typeof Like) {}

  create = async (createDislikeDto: CreateDislikeDto) => {
    try {
      const isExist = await this.dislikeRepository.findOne({
        where: {
          userId: createDislikeDto.userId,
          routeId: createDislikeDto.routeId,
        },
      });

      if (isExist) {
        const res = await this.dislikeRepository.destroy({
          where: {
            userId: createDislikeDto.userId,
            routeId: createDislikeDto.routeId,
          },
        });
        
        return res;
      }

      const isLiked = await this.likeRepository.findOne({
        where: {
          userId: createDislikeDto.userId,
          routeId: createDislikeDto.routeId,
        },
      })

      if(isLiked) {
        const res = await this.likeRepository.destroy({
          where: {
            userId: createDislikeDto.userId,
            routeId: createDislikeDto.routeId,
          },
        });
      }

      const res = await this.dislikeRepository.create({
        ...createDislikeDto,
      });
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  findByUserId(id: number) {
    const userDislikes = this.dislikeRepository.findAll({
      where: {
        userId: id,
      },
    });

    return userDislikes;
  }

  findAll() {
    return `This action returns all likes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number, updateDislikeDto: UpdateDislikeDto) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
