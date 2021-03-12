export class utils{

   constructor(){}
    
    public static stringLike(param: string): any{
        let flags = [
            "help | '?'", 
            "new"
        ];

        let recomendation = flags.find(x => x.includes(param));

        if(recomendation == undefined)
            return false
        return recomendation
    }
}

export default utils;

