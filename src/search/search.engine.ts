import { Book } from "./book"
import { SearchResult } from "./search.result"

export class SearchEngine{
    
    static search(query: string, books: Book[] ): SearchResult[]{
        
        
        
        return []
    }
    
    static load(books: Book[]){
       
        let TF = new Map<string, Map<Book,number>>() //words x document x times
        let IDF = new Map<string, number>() // word x idf
        let TFIDF = new Map<Book, number[]>()//  dcoumnet x tf_idf vector
        
        for(let book of books){
            
            const text = book.content.split(" ") // words
            const textCount = text.length
            
            
            for(let word of text){
                
                let map = TF.get(word)
                
                map === undefined ? TF.set(word,new Map<Book, number>().set(book, 1/textCount)) 
                : map.set(book, (map.get(book) || 0) + 1/textCount )
            }
        }
        
        TF.forEach((map, word) => { 
            IDF.set(word,Math.log(books.length / map.size))
            map.forEach((tf, book)=> {
                TFIDF.set(book,[...TFIDF.get(book) || [], tf * Math.log(books.length / map.size)])
            })  
        })
        return [TFIDF, IDF]
    }
}