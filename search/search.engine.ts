import { Book } from "./book"
import { SearchResult } from "./search.result"

export class SearchEngine{
    
    static search(query: string, books: Book[] ): SearchResult[]{
        
        
        
        return []
    }
    
    static load(books: Book[]){
       
        for(let book of books){
            const text = book.content.split(" ") // words
            const textCount = text.length

            let map = new Map<string, Map<string,number>>()
            
            for(let word of text){

                map.get(word) === undefined 
                
                ?  map.set(word,new Map<string, number>().set(book.title, 1))
                :  map.get(word).set(book.title, map.get(word).get(book.title) + 1 )                                
                //words x document x times
            }

        }
    }
}