#!/usr/bin/env node

// deps
const { green } = require('chalk');
const path = require('path');
const walk = require('./utils/walk');
const outputTable = require('./utils/outputTable');
const appendPatreon = require('./utils/appendPatreon');
const log = console.log;
const currentDir = process.cwd();
const fs = require('fs');

// Greet
log('\x1Bc');
log(green('Welcome to Gracias!'));

async function run() {

    // fetch all package json files
    const packagePaths = await new Promise(resolve => walk(currentDir, function(err, results) {
        if (err) throw err;
        resolve(results.filter( r => path.basename(r) === 'package.json' ));
    }));

    // read each file
    const packagefiles = await Promise.all(packagePaths
        .map(path => new Promise(resolve => fs.readFile(path, 'utf8', (err, data) => resolve(data)))));

    // resolve table data
    const tableData = packagefiles.reduce((payload, b) => {
        const { author, name } = JSON.parse(b);

        // lets contribute to people
        if (!author) return payload;
        // if author is there then increment else push
        const index = payload.findIndex(package_ => {
            if (typeof author === 'string') return package_.author.name === author;
            return package_.author.name === author.name
        });
        if (index !== -1) {
            payload[index].count++;
            payload[index].packages.push(name);
        } else {
            payload.push({
                author: { name: author.name ? author.name : author, email: author.email || '' },
                count: 1,
                packages: [name]
            });
        }
        return payload;
    }, [])
        .sort((a, b) => {
            if(a.count < b.count) { return 1; }
            if(a.count > b.count) { return -1; }
            return 0;
        });

    // limit to top ten
    const topTen = tableData.slice(0, 10);
    const authorsAndPatreonAccounts = await appendPatreon(topTen.map(a => a.author.name));
    topTen.forEach(r => {
        const patreonUrl = authorsAndPatreonAccounts.find(a => a.name === r.author.name).url || null;
        if (patreonUrl) r.author.patreon = patreonUrl;
    })
    outputTable(topTen);
}

run();
