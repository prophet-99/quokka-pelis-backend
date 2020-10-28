const fs = require('fs');
const { join } = require('path');

const loadSqlQueries = (dirPath) => {
    const files =  fs.readdirSync(dirPath);
    const sqlFiles = files.filter( (f) => f.endsWith('.sql') );
    const queries = {};
    for(const sqlFile of sqlFiles){
        const query = fs.readFileSync( join(dirPath, sqlFile), { encoding: 'UTF-8' } );
        queries[sqlFile.replace('.sql', '')] = query;
    }
    return queries;
};

module.exports = { loadSqlQueries };