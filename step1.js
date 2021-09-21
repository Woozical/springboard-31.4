const fs = require('fs');

function cat(path){
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err){
            console.log('ERROR:', err);
            process.exit(1);
        }
        console.log(data);
    });
}

function execute(){
    const filePath = process.argv[2];
    cat(filePath);
}

execute();