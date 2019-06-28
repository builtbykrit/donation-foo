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
    const packagefiles = await Promise.all(packagePaths
        .map(path => new Promise(resolve => fs.readFile(path, 'utf8', (err, data) => resolve(data)))))

    // resolve table data
    const tableData = packagefiles.reduce((a, b) => {
        const { author } = JSON.parse(b);
        // lets contribute to people
        if (!author) return;

        // if author is there then increment else push
        debugger;
        const index = a.findIndex((package, index) => package.author === author);
        if (index !== -1) {
            a[index].count++
        } else {
            a.push({ author, count: 1 });
        }

        return a;
    }, [])
        .sort((a, b) => {
            if(a.count < b.count) { return -1; }
            if(a.count > b.count) { return 1; }
            return 0;
        });

    log(tableData)
}

run();
