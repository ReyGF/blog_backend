export class Levenshtein{

    
    static levenshteinDistance(word1: string, word2: string): number {
    
        const m = word1.length;
        const n = word2.length;
        
        const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
        
        for (let i = 0; i <= m; i++) {
            dp[i][0] = i;
        }
        
        for (let j = 0; j <= n; j++) {
            dp[0][j] = j;
        }
        
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                const costo = word1[i - 1] === word2[j - 1] ? 0 : 1;
                dp[i][j] = Math.min(
                    
                    dp[i - 1][j] + 1, // Eliminar
                    
                    dp[i][j - 1] + 1, // Insertar
                    
                    dp[i - 1][j - 1] + costo // Reemplazar
                );
                
                
                if (i > 1 && j > 1 && word1[i - 1] === word2[j - 2] && word1[i - 2] === word2[j - 1]) {
                    dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1);
                }
            } 
        }
        return dp[m][n];
        
    }
    static getSuggestions(word: string, map: string[]): string[] {
        const suggestions: string[] = [];
        for (const mapWord of map) {
            const distance = this.levenshteinDistance(word, mapWord);
            if (distance <= 4) { 
                suggestions.push(mapWord);
            }
        }
        return suggestions;
    }
}