const express= require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
 })
.get((req,res,next)=>{
    res.end('Will send all the dishes to you!');
})
.post((req,res,next)=>{
    res.end('Will add the dish: '+req.body.name+' with details: '+req.body.description);
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operation not supported on /dishes');
})
//dangerous authentication needed
.delete((req,res,next)=>{
    res.end('deleting all the dishes');
});


//with parameters

dishRouter.route('/:dishId')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
 })
.get((req,res,next)=>{
    res.end('Will send all the dishes/:'+ req.params.dishId  +' to you!');
})
.post((req,res,next)=>{
    res.statusCode=403;
    res.end('POST operation not supported on /dishes ');
})
.put((req,res,next)=>{
    res.write('Updating the dish: '+req.params.dishId+'\n');
    res.end('will Update the dish: '+req.body.name+' with details '+ req.body.description);
})
//dangerous authentication needed
.delete((req,res,next)=>{
    res.end('deleting dish:'+req.params.dishId);
});

module.exports= dishRouter;