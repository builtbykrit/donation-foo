const exec = require('child_process').exec;

before((done) => {
    exec('sh ./test/generate_test_dir.sh',
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
            exec('sh ./test/generate_deeply_nested_dir.sh',
                (error, stdout, stderr) => {
                    console.log(stdout);
                    console.log(stderr);
                    if (error !== null) {
                        console.log(`exec error: ${error}`);
                    }
                    done();
                }
            )
        })
})