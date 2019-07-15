const { table } = require('table');
const log = console.log;

const outputTable = function(data) {
    let config,
        withHeaders,
        output;

    withHeaders = [
        ['AUTHOR', 'COUNT', 'PACKAGES', 'POSSIBLE PATREON ACCOUNT'],
        ...data.map(row => {

            // remove duplicate packages
            const packages =  row.packages.join(', ')

            return [`${row.author.name} - ${row.author.email}`, row.count, packages, row.author.patreon];
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
