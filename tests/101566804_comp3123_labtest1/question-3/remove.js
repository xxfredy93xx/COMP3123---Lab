const fs = require('fs');

const path = require('path');

const logsPath = path.join(process.cwd(), 'Logs');

if (fs.existsSync(logsPath)) {

    const files = fs.readdirSync(logsPath);

    for (let file of files) {
        
        console.log('delete files...' + file);
        
        fs.unlinkSync(path.join(logsPath, file));
    }

    fs.rmdirSync(logsPath);
}