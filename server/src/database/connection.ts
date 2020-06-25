import knex from 'knex';
import path from 'path';

const connection = knex ({
    client: 'sqlite3',
    connection: {
        // path.resolve tem como função unir caminhos
        // __dirname é uma variável global que vai retornar o diretório do arquivo que estamos executando 
        filename: path.resolve(__dirname,'database.sqlite'),
    },
    useNullAsDefault: true
})

export default connection;
