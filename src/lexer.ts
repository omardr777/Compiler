export enum TokenType {
    EOF = -1,
    NEWLINE = 0,
    NUMBER = 1,
    IDENT = 2,
    STRING = 3,

    LABEL = 101,
    GOTO = 102,
    PRINT = 104,
    LET = 105,
    IF = 106,
    THEN = 107,
    ENDIF = 108,
    WHILE = 109,
    REPEAT = 110,
    ENDWHILE = 111,

    EQ = 201,  
	PLUS = 202,
	MINUS = 203,
	ASTERISK = 204,
	SLASH = 205,
	EQEQ = 206,
	NOTEQ = 207,
	LT = 208,
	LTEQ = 209,
	GT = 210,
	GTEQ = 211,
}



interface Token {
    text:string;
    type:TokenType | undefined;
}

export default class Lexer {

    private source:string ;
    public curChar:string;
    private curPos:number;


    constructor (source:string){
        this.source = source;
        this.curChar = '';
        this.curPos = -1;
        this.nextChar()
    }
    
    public nextChar = () => {
        this.curPos += 1;
        if (this.curPos >= this.source.length){
            this.curChar = '\0';
        }else {
            this.curChar = this.source[this.curPos];
        }
    }

    public peek = () => {
        if(this.curPos + 1 > this.source.length){
            return '\0';
        }else{
            return this.source[this.curPos + 1]
        }
    }

    public abort = (message:string) => {
        console.error('Lexing error. ', message);
        process.exit(1);
    }

    public skipWhiteSpace = () => {
        while(this.curChar === ' ' || this.curChar === '\t' || this.curChar === '\r'){
            console.log(this.curChar)
            this.nextChar();
        }
    }

    public skipComment = () => {}

    public getToken = () => {
        let token:Token = { 
            text:this.curChar,
            type:undefined
        };
        this.skipWhiteSpace();
        switch(this.curChar){
            case '+':
                token.type = TokenType.PLUS;
                break;
            case '-':
                token.type = TokenType.MINUS;
                break;
            case '*':
                token.type = TokenType.ASTERISK;
                break;
            case '/':
                token.type = TokenType.SLASH;
                break;
            case '\n':
                token.type = TokenType.NEWLINE;
                break;
            case '\0':
                token.text = '';
                token.type = TokenType.EOF;
                break;
            default:
                this.abort('Unknown token: ' + this.curChar)
        }
        this.nextChar();
        return token;
    }



}