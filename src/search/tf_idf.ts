import { Book } from "./book"

export class TF_IDF {
    TFIDF: Map<Book, number[]>
    IDF:Map<string, number>

    constructor(TFIDF: Map<Book, number[]>,IDF:Map<string, number>){
        this.TFIDF = TFIDF
        this.IDF = IDF
    }
}