const patreonClient = require('./patreonClient');

const appendPatreon = async function(row) {
    return await new Promise((resolve, reject) => patreonClient.get('', {
        params: {
            query: row.author.name,
        }
    })
        .then(({ data: { hits } }) => {
            if (hits) row.author.patreon = hits[0] && hits[0].url;
            resolve(row)
        })
        .catch(err => reject(err))
    )
};

module.exports = appendPatreon;
