#!/usr/bin/env node

// deps
const { green, red } = require('chalk');
const path = require('path');
const walk = require('./utils/walk');
const log = console.log;
const currentDir = process.cwd();
const fs = require('fs');

// Greet
log(green('Welcome to Donation Foo'));

async function run() {

    // fetch all package json files
    const packagePaths = await new Promise(resolve => walk(currentDir, function(err, results) {
        if (err) throw err;
        resolve(results.filter( r => path.basename(r) === 'package.json' ));
    }));

    // read each file
    packagePaths.forEach(path => fs.readFile(path, 'utf8', function (err, data) { log(data)  }))
}

run();
