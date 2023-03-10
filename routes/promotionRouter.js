const express= require('express');
const bodyParser = require('body-parser');

const authenticate = require('../authenticate');

const Promotions = require('../models/promotions');
const cors = require('./cors');

const promotionRouter = express.Router();
promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next)=>{
    // res.end('Will send all the promotions to you!');
    Promotions.find(req.query)
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));

})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    // res.end('Will add the promotion: '+req.body.name+' with details: '+req.body.description);
    Promotions.create(req.body)
    .then((promotion)=>{
        console.log('Promotion Created ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operation not supported on /promotion');
})
//dangerous authentication needed
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    // res.end('deleting all the  promotions');
    Promotions.remove({})  // this is mongoose function removing Dishes collection from mongodb
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));  
});


//with parameters(id)

promotionRouter.route('/:promotionId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
// .all((req,res,next)=>{
//     res.statusCode=200;
//     res.setHeader('Content-Type','text/plain');
//     next();
//  })
.get(cors.cors, (req,res,next)=>{
    // res.end('Will send all the promotions/:'+ req.params.promotionId  +' to you!');
    Promotions.findById(req.params.promotionId)
    .then((promotion)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    res.statusCode=403;
    res.end('POST operation not supported on /promotions ');
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    // res.write('Updating the promotion: '+req.params.promotionId+'\n');
    // res.end('will Update the pomotions: '+req.body.name+' with details '+ req.body.description);
    Promotions.findByIdAndUpdate(req.params.promotionId,{
        $set: req.body
    }, { new: true }) // this line is for returning updated dish as json
    .then((promotion)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
//dangerous authentication needed
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    // res.end('deleting promotion:'+req.params.promotionId);
    Promotions.findByIdAndRemove(req.params.promotionId)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports= promotionRouter;