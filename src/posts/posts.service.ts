import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SearchEngine } from 'src/search/search.engine';
import { DbService } from 'src/db/db.service';
import { CreateTFIDFDto } from './dto/create-tfidf.dto';
import { SearchResult } from 'src/search/search.result';

@Injectable()
export class PostsService {
  constructor(private db : DbService){}

  async create(createPostDto: CreatePostDto, createTFIDFDto: CreateTFIDFDto) {
  
   let wordsTF: Map<string, number> = SearchEngine.TF(createPostDto.content)

   let score: number[] = []
   
   let idf = await this.db.iDF.findMany()
  
    wordsTF.forEach((tf, word) => {

      idf.map(w => {
          if(w.word === word){
            score.push(tf * w.idf)
          }
      })
    })

    await this.db.tFIDF.create({
      data: {
        postId: createTFIDFDto.postId,
        vector: score
      }
    })

    return await this.db.posts.create({
      data: createPostDto
    });
  }

  async findAll() {
    return await this.db.posts.findMany()
  }

  async findOne(id: number) { 
    return await this.db.posts.findUnique({
      where: {
        id: String(id)
      }
    });
  }
  async search(query: string){
   
    let mapTfquery: Map<string, number> = SearchEngine.TF(query)

    let idf= await this.db.iDF.findMany()
    
    let TfIdfquery: number[] = []

     mapTfquery.forEach((tf, word) => {

      idf.map(w => {
          if(w.word === word){
            TfIdfquery.push(tf * w.idf)
          }
      })
    })

    let tfIdf = await this.db.tFIDF.findMany()

    let scores: Map<string, number> = new Map<string, number>()

    tfIdf.forEach( nums => {

      let numbers = nums.vector.map(n => Number(n))
      
      let score = SearchEngine.cosineSimilarity(numbers,TfIdfquery)

      scores.set(nums.id,score)
    })

    let result: SearchResult[] = []
    
    scores.forEach((score, postId) => {
      result.push(new SearchResult(postId,"",score))
    })

    return result.sort((a, b) => a.score + b.score)
    
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.db.posts.update({
      where: {
        id: String(id)
      },
      data: updatePostDto
    });
  }

  async remove(id: number) {
   return await this.db.posts.delete({
      where:{
        id: String(id)
      }
    });
  }
}
