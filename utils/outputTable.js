const { green, red } = require('chalk');
const { table } = require('table');
const log = console.log;

const outputTable = function(data) {
    let config,
        withHeaders,
        output;

    withHeaders = [
        ['AUTHOR', 'COUNT', 'PACKAGES', 'DONATE HERE'],
        ...data.map((row, i) => {
            if (i === 0) return [red(row.author), red(row.count), red(row.packages.join(', ')), ''];
            return [row.author, row.count, row.packages.join(', '), '']
        })
    ];

    config = {
        columns: {
            0: {
                alignment: 'left',
                width: 20
            },
            1: {
                alignment: 'center',
                width: 10
            },
            2: {
                alignment: 'left',
                width: 30
            },
            3: {
                alignment: 'right',
                width: 30
            }
        }
    };
    debugger;
    output = table(withHeaders, config);
    log(output);
};


module.exports = outputTable;
