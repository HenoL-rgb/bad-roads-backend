import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from './images.model';
import * as uuid from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImagesService {
    constructor(@InjectModel(Image) private imageRepository: typeof Image) {

    }

    async create(file: any): Promise<string> {
         const fileName = uuid.v4() + '.jpg';
         const filePath = path.resolve(__dirname, '..', 'static');
         if(!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, {recursive: true});
         }
         fs.writeFileSync(path.join(filePath, fileName), file.buffer);
         return fileName;
    }
}
