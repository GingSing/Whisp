var cluster = require('cluster');
var cpuCount = require('os').cpus().length;

if(cluster.isMaster){
    
    for(var i = 0; i < cpuCount; i++){
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    });
}else{
    require('./server');
}