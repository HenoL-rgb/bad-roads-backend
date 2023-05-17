import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Like } from './likes.model';

@Injectable()
export class LikesService {

  constructor(@InjectModel(Like) private likeRepository: typeof Like){}

  create = async (createLikeDto: CreateLikeDto) => {
    try {
      const res = await this.likeRepository.create({
        ...createLikeDto
      });
      return res;
    } catch (e) {
      console.log(e);
    }
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
