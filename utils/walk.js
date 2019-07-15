const fs = require('fs');
const path = require('path');

const executedOn = [];
const walk = function(dir, done) {
    let results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        let i = 0;
        (function next() {
            let file = list[i++];
            if (!file) {
                return done(null, results);
            }
            let fileName = path.basename(file);
            file = dir + '/' + file;
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory() && !executedOn.includes(fileName)) {
                    walk(file, function(err, res) {
                        results = results.concat(res);
                        executedOn.push(fileName);
                        next();
                    });
                } else {
                    results.push(file);
                    executedOn.push(fileName);
                    next();
                }
            });
        })();
    });
};


module.exports = walk;
