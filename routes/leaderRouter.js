const express= require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
 })
.get((req,res,next)=>{
    res.end('Will send all the leaders to you!');
})
.post((req,res,next)=>{
    res.end('Will add the leader: '+req.body.name+' with details: '+req.body.description);
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operation not supported on /leaders');
})
//dangerous authentication needed
.delete((req,res,next)=>{
    res.end('deleting all the leaders');
});


//with parameters

leaderRouter.route('/:leaderId')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
 })
.get((req,res,next)=>{
    res.end('Will send all the leaders/:'+ req.params.leaderId  +' to you!');
})
.post((req,res,next)=>{
    res.statusCode=403;
    res.end('POST operation not supported on /leaders ');
})
.put((req,res,next)=>{
    res.write('Updating the leader: '+req.params.leaderId+'\n');
    res.end('will Update the leader: '+req.body.name+' with details '+ req.body.description);
})
//dangerous authentication needed
.delete((req,res,next)=>{
    res.end('deleting leader:'+req.params.leaderId);
});

module.exports= leaderRouter;