import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SearchEngine } from 'src/search/search.engine';
//import { DbService } from 'src/db/db.service';

class Db{
  post : any
  idf: any
  count: any

  constructor(post: any, idf: any, count: any){
    this.post = post
    this.idf = idf
    this.count = count
  }
}

@Injectable()
export class PostsService {
  constructor(/*private db : DbService*/){}

  create(createPostDto: CreatePostDto) {

    let wordsTF: Map<string, number> = SearchEngine.TF(createPostDto.content)
    let db = new Db("este es un post","esta es una tabla idf",3)
    
    wordsTF.forEach((tf, word) =>{

      let idf = db.idf.get(word)
      
      db.post.tfidf.add(tf * Math.log(db.count / idf))
    })
    return 'This action adds a new post';
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
