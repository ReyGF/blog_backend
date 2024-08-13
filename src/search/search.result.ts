export class SearchResult
{
    tilte: string
    snippet: string
    score: number
    
    constructor(title: string,snippet: string,score: number){

        this.tilte = title
        this.snippet = snippet
        this.score = score

    }
}