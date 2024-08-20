import { Book } from "./book"
import { TF_IDF } from "./tf_idf"
import { SearchResult } from "./search.result"

export class SearchEngine{
    
    static search(query: string, books: Book[] ): SearchResult[]{
        
        let TFIDF_IDF: TF_IDF = this.load(books)

        let result: SearchResult[] = this.vectorModel(query, TFIDF_IDF.TFIDF, TFIDF_IDF.IDF)

        return result
    }
    static TF(content: string): Map<string, number>
    {
        const text = content.split("")

        let contentTf = new Map<string, number>()

        for(let word of text){
            let num = contentTf.get(word)

            if(num === undefined){
                contentTf.set(word, 1/content.length) 
            }
            else{
                contentTf.set(word,( contentTf.get(word) || 0 ) + 1/text.length)
            }
        }

        return contentTf
    }
    
    static load(books: Book[]): TF_IDF{
       
        let TF = new Map<string, Map<Book,number>>() //words x document x times
        let IDF = new Map<string, number>() //word x idf
        let TFIDF = new Map<Book, number[]>() //dcoumnet x tf_idf vector
        
        for(let book of books){
            
            const text = book.content.split(" ") // words    
            
            for(let word of text){
                
                let map = TF.get(word)
                
                if(map === undefined){
                    TF.set(word,new Map<Book, number>().set(book, 1/text.length)) 
                }
                else{
                    map.set(book, (map.get(book) || 0) + 1/text.length )
                }
            }
        }
        
        TF.forEach((map, word) => { 
            IDF.set(word,Math.log(books.length / map.size))
            map.forEach((tf, book)=> {
                TFIDF.set(book,[...TFIDF.get(book) || [], tf * Math.log(books.length / map.size)])
            })  
        })
        return new TF_IDF(TFIDF, IDF)
    }

    static vectorModel(query: string, TFIDF: Map<Book, number[]> , IDF:Map<string, number>): SearchResult[]{
    
        if(query === undefined)
            throw new Error("query can't be null")
    
        let vectorQuery: number[] = []
        let result : SearchResult[] = []
    
        let mapQuery = new Map<string, number>()
    
        for(let word of query.split(" ")){
            mapQuery.set(word,(mapQuery.get(word) || 0) + 1)
        }
        
        let moreImportatnWord = query.split(" ")[0]
        let max = 0;
        
        mapQuery.forEach((num, word) => {
            let curr = vectorQuery.push((num/query.length) * (IDF.get(word) || 0))
            
            if(curr > max) {
                max = curr
                moreImportatnWord = word
            }
        })
    
        TFIDF.forEach((vector, book)=>{
            let score: number = this.cosineSimilarity(vector, vectorQuery)
    
            let tilte: string = book.title
            
            let snippet: string = ""
            
            for(const line of book.content.split("\n")){
                console.log(moreImportatnWord)
                if(line.includes(moreImportatnWord))
                    snippet = line;
            }
    
            result.push(new SearchResult(tilte, snippet,score))
    
            if(result.length > 4)
               return result.sort((a,b)=> a.score - b.score)
    
        })
        
        return result.sort((a,b)=> a.score + b.score)
    
    }

    static cosineSimilarity(arr1: number[], arr2: number[]): number {
        
        let dotProduct: number = 0;
        for (let i = 0; i < arr1.length; i++) {
          dotProduct += (arr1[i] * arr2[i]) || 0;
        }
       
      
        let magnitude1: number = 0;
        for (let i = 0; i < arr1.length; i++) {
          magnitude1 += arr1[i] * arr1[i];
        }
        magnitude1 = Math.sqrt(magnitude1);
       
      
        let magnitude2: number = 0;
        for (let i = 0; i < arr2.length; i++) {
          magnitude2 += arr2[i] * arr2[i];
        }
        magnitude2 = Math.sqrt(magnitude2);
    
        return dotProduct / (magnitude1 * magnitude2);
      }
}