export class Word {
    public key?: string;
    public id?: string;
    // public word?: {
    //     en: string,
    //     ar: string
    // }
    public word: string;
    public trans: string;

     [language: string]: any;         
}