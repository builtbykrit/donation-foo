const { green } = require('chalk');
const { table } = require('table');
const log = console.log;

const outputTable = function(data) {
    let config,
        withHeaders,
        output;

    withHeaders = [
        ['AUTHOR', 'COUNT', 'PACKAGES', 'POSSIBLE PATREON ACCOUNT'],
        ...data.map((row, i) => {

            // remove duplicate packages
            const packages =  [...new Set(row.packages)].slice(0,5).join(', ');

            if (i === 0 && row.author) return [green(`${row.author.name} - ${row.author.email}`), green(row.count), green(packages), green(row.author.patreon)];
            if (row.author) return [`${row.author.name} - ${row.author.email}`, row.count, packages, row.author.patreon];
            return [];
        })
    ];

    config = {
        columns: {
            0: {
                alignment: 'left',
                width: 50
            },
            1: {
                alignment: 'center',
                width: 10
            },
            2: {
                alignment: 'left',
                width: 75
            },
            3: {
                alignment: 'left',
                width: 50
            }
        }
    };
    output = table(withHeaders, config);
    log(output);
};


module.exports = outputTable;
