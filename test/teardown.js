const exec = require('child_process').exec;

after((done) => {
    exec('sh ./test/teardown.sh',
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
            done()
        })
})