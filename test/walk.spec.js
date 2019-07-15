const assert = require('assert');
const walk = require('../src/utils/walk');

describe('walk', () => {
    it('walks over single file and all children', (done) => {
        walk('./test_dir', (_, results) => {
            assert.equal(results.length, 10);
            done();
        })
    })

    it('walks over deeply nested children', (done) => {
        walk('./test_dir_deep', (_, results) => {
            assert.equal(results.length, 20);
            done();
        })
    })
});