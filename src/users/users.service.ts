import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private rolesService: RolesService,
      ) {}
    
      async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.rolesService.getRoleByValue('USER');
        await user.$set('roles', [role.id]);
        user.roles = [role]
        return user;
      }
    
      async getAllUsers() {
        const users = await this.userRepository.findAll({ include: { all: true } });
        return users;
      }
    
      async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include:[
          {
            model: Role,
            attributes: ['value'],
            through: {
              attributes: []
            }
          },
          {
            association: 'likes',
            attributes: ['id'],
            through: {
              attributes: []
            }
          },
          {
            association: 'dislikes',
            attributes: ['id'],
            through: {
              attributes: []
            }
          },
        ]})
        console.log(user);
        return user;
      }
    
      async addRole(roleDto: AddRoleDto) {
        const user = await this.userRepository.findByPk(roleDto.userId);
        const role = await this.rolesService.getRoleByValue(roleDto.value);
        if(user && role) {
            await user.$add('role', role.id);
            return roleDto;
        }
    
        throw new HttpException('Not found', HttpStatus.NOT_FOUND)
      }

      async getUserById(id: number) {
        const user = await this.userRepository.findOne({where: {id}, include: [
          {
            model: Role,
            attributes: ['value'],
            through: {
              attributes: []
            }
          },
          {
            association: 'likes',
            attributes: ['id'],
            through: {
              attributes: []
            }
          },
          {
            association: 'dislikes',
            attributes: ['id'],
            through: {
              attributes: []
            }
          },
        ]})
        
        console.log(user);
        
        return user;
      }
    
      async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if(!user) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        }
        user.banned = true;
        user.banReason = dto.banReason;
        user.save();
        return user;
      }
}
