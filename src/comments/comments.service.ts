import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class CommentsService {

  constructor(private db: DbService) {}

  async create(createCommentDto: CreateCommentDto) {
    
    return this.db.comments.create({
      data: createCommentDto
    }); 
  }

  async findAll() {
 
   return this.db.comments.findMany();
  }

  async findOne(id: number) {
    
    return this.db.comments.findUnique({
      where: {
        id: String(id)
      }
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
  
    return this.db.posts.update({
      where: {
        id: String(id)
      },
      data: updateCommentDto
    });
  }

  async remove(id: number) {
    
    return this.db.posts.delete({
      where:{
        id: String(id)
      }
    })
  }
}
