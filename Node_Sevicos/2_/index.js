var abc = 0;
var CronJob = require('cron').CronJob;
var job = new CronJob('* * * * * *', function() {
    console.log('Health OK');

    if(abc==3){
        console.log('stoped');
        //task.stop(); delete task;
        job.stop();
    }

    abc +=1
    console.log('abc: '+abc)

}, null, true, 'America/Los_Angeles');

job.start();