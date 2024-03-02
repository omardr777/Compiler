import Lexer, {TokenType} from './lexer';


const source = '+- */';

const lexer = new Lexer(source);
let token = lexer.getToken();
console.log(token,'token')
while (token.type !== TokenType.EOF) {
    console.log(token.type)
    token = lexer.getToken()
}
console.log('end')