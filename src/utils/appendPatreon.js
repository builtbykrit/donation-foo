const patreonClient = require('./patreonClient');

const appendPatreon = async function(authors) {
    return await new Promise((resolve, reject) => patreonClient.post('', {
        authors,
    })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err))
    )
};

module.exports = appendPatreon;
