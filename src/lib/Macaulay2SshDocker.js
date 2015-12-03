GLOBAL.OPTIONS = require('./default.js').get_config({
    server_config: {
        port: 8002,
        MATH_PROGRAM: 'Macaulay2',
        MATH_PROGRAM_COMMAND: 'export WWWBROWSER=/usr/bin/open; export PATH=/usr/bin:$PATH; M2 --print-width 100',
        CONTAINERS: './sshDockerContainers.js'
    },
	per_container_resources: {
	    cpuShares: 2,
	    memory: 512
	},
        hostConfig: {
            minContainerAge: 10,
            maxContainerNumber: 40,
	}
});

var Macaulay2Server = require('./index.js').MathServer();
Macaulay2Server.listen();
