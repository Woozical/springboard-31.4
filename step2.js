const fs = require('fs');
const axios = require('axios');

function cat(path){
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err){
            console.log('ERROR:', err);
            process.exit(1);
        }
        console.log(data);
    });
}

function webCat(url){
    axios.get(url)
    .then( (response) => {
        console.log(response.data);
    })
    .catch( (err) => {
        const errMsg = err.response ? `${err.response.status} ${err.response.statusText}` : `${err.errno} ${err.code}`
        console.log('ERROR:', errMsg);
        process.exit(1);
    })
}

function execute(){
    const input = process.argv[2];
    if (input.includes('http://') || input.includes('https://'))
        webCat(input);
    else
        cat(input);
}

execute();