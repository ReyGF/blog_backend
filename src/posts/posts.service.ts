import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SearchEngine } from 'src/search/search.engine';
//import { DbService } from 'src/db/db.service';

@Injectable()
export class PostsService {
  constructor(/*private db : DbService*/){}

  create(createPostDto: CreatePostDto) {
    return ''

   /* 
   let wordsTF: Map<string, number> = SearchEngine.TF(createPostDto.content)

   let score: number[] = []
   
   let idf = this.db.idf.findMany()
  
    wordsTF.forEach((tf, word) => {

      idf.map(w => {
          if(w.word === word){
            score.push(tf * w.idf)
          }
      })


      
    })*/

   /* return db.post.create({
      data: createPostDto
      score: number[]
    });*/
  }

  async findAll() {
    return ''
   // return this.db.post.findMany()
  }

  async findOne(id: number) { 
    return ''
    /*return this.db.findUnique({
      where: {
        id: Number(id)
      }
    });*/
  }
  async search(query: string){
    /*
    let mapTfquery: Map<string, number> = SearchEngine.TF(query)

    let idf = this.db.idf.findMany()
    
    let TfIdfquery: number[] = []

     mapTfquery.forEach((tf, word) => {

      idf.map(w => {
          if(w.word === word){
            TfIdfquery.push(tf * w.idf)
          }
      })

    let tfIdf = this.db.tfidf.findMany()

    let result = tfIdf.map( nums => {

            return vectorialModel(nums, tfIdfquery)
    })
    */ 
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return ''
   /* return this.db.post.update({
      where: {
        id: Number(id)
      },
      data: updatePostDto
    });*/
  }

  async remove(id: number) {
    return ''
   /* return this.db.post.delete({
      where:{
        id: Number(id)
      }
    });*/
  }
}
