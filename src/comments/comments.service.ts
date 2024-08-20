import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  async create(createCommentDto: CreateCommentDto) {
    return ''
  /*  return this.db.cooments.create({
      data: createCommentDto
    });*/
  }

  async findAll() {
    return ''
   // return this.db.cooments.findMany();
  }

  async findOne(id: number) {
    return ''
   /* return this.db.findUnique({
      where: {
        id: Number(id)
      }
    });*/
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return ''
   /* return this.db.post.update({
      where: {
        id: Number(id)
      },
      data: updateCommentDto
    });*/
  }

  async remove(id: number) {
    return ''
   /* return this.db.post.delete({
      where:{
        id: Number(id)
      }
    })*/
  }
}
