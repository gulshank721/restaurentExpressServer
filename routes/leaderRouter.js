const express= require('express');
const bodyParser = require('body-parser');

const authenticate = require('../authenticate');

const Leaders = require('../models/leaders');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get((req,res,next)=>{
    // res.end('Will send all the leaders to you!');
    Leaders.find({})
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));

})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    // res.end('Will add the leader: '+req.body.name+' with details: '+req.body.description);
    Leaders.create(req.body)
    .then((leader)=>{
        console.log('Leader Created ', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operation not supported on /leader');
})
//dangerous authentication needed
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    // res.end('deleting all the  leaders');
    Leaders.remove({})  // this is mongoose function removing leaders collection from mongodb
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));  
});


//with parameters(id)

leaderRouter.route('/:leaderId')
// .all((req,res,next)=>{
//     res.statusCode=200;
//     res.setHeader('Content-Type','text/plain');
//     next();
//  })
.get((req,res,next)=>{
    // res.end('Will send all the leaders/:'+ req.params.leadersId  +' to you!');
    Leaders.findById(req.params.leaderId)
    .then((leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    res.statusCode=403;
    res.end('POST operation not supported on /leaderId ');
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    // res.write('Updating the leader: '+req.params.leaderId+'\n');
    // res.end('will Update the leaders: '+req.body.name+' with details '+ req.body.description);
    Leaders.findByIdAndUpdate(req.params.leaderId,{
        $set: req.body
    }, { new: true }) // this line is for returning updated dish as json
    .then((leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
//dangerous authentication needed
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next)=>{
    // res.end('deleting leader:'+req.params.leaderId);
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports= leaderRouter;