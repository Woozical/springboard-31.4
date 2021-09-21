const fs = require('fs');
const axios = require('axios');

function cat(path){
    let data
    try{
        data = fs.readFileSync(path, 'utf8');
        return data;
    } catch (err) {
        console.log('ERROR:', err.message);
        process.exit(1);
    }
}

function webCat(url){
    return new Promise( (resolve, reject) => {
        axios.get(url)
        .then( (response) => {
            resolve (response.data);
        })
        .catch( (err) => {
            console.log('ERROR:', err.message);
            process.exit(1);
        })  
    })
}

function write(fileName, data){
    try{
        fs.writeFileSync(fileName, data, 'utf8');
    } catch (err) {
        console.log('ERROR:', err.message);
        process.exit(1);
    }
}

async function execute(){
    if (process.argv[2] === '--out'){
        // Write
        const fileName = process.argv[3];
        const src = process.argv[4];
        const data = (src.includes('http://') || src.includes('https://')) ? await webCat(src) : cat(src);
        write(fileName, data, 'utf8');
    } else {
        // Read
        for (let i = 2; i < process.argv.length; i++){
            const input = process.argv[i];
            const output = (input.includes('http://') || input.includes('https://')) ? await webCat(input) : cat(input);
            console.log(output);
        }
    }
}

execute();