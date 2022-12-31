const express= require('express');
const bodyParser = require('body-parser');

const promotionRouter = express.Router();
promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
 })
.get((req,res,next)=>{
    res.end('Will send all the promotions to you!');
})
.post((req,res,next)=>{
    res.end('Will add the promotion: '+req.body.name+' with details: '+req.body.description);
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operation not supported on /promotion');
})
//dangerous authentication needed
.delete((req,res,next)=>{
    res.end('deleting all the  promotions');
});


//with parameters

promotionRouter.route('/:promotionId')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
 })
.get((req,res,next)=>{
    res.end('Will send all the promotions/:'+ req.params.promotionId  +' to you!');
})
.post((req,res,next)=>{
    res.statusCode=403;
    res.end('POST operation not supported on /promotions ');
})
.put((req,res,next)=>{
    res.write('Updating the promotion: '+req.params.promotionId+'\n');
    res.end('will Update the pomotions: '+req.body.name+' with details '+ req.body.description);
})
//dangerous authentication needed
.delete((req,res,next)=>{
    res.end('deleting promotion:'+req.params.promotionId);
});

module.exports= promotionRouter;