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
            if (i === 0 && row.author) return [green(`${row.author.name} - ${row.author.email}`), green(row.count), green(row.packages.join(', ')), green(row.author.patreon)];
            if (row.author) return [`${row.author.name} - ${row.author.email}`, row.count, row.packages.join(', '), row.author.patreon]
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
                width: 100
            },
            3: {
                alignment: 'left',
                width: 50
            }
        }
    };
    debugger;
    output = table(withHeaders, config);
    log(output);
};


module.exports = outputTable;
