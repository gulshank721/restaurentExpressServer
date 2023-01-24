const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// require('mongoose-currency').loadType(mongoose); // mongoose-currency adds an external schema type like currency
// const Currency = mongoose.Types.Currency;        // to suport currency type field.(like price in this case)
// {
//     "name": "Peter Pan",
//     "image": "images/alberto.png",
//     "designation": "Chief Epicurious Officer",
//     "abbr": "CEO",
//     "description": "Our CEO, Peter, . . .",
//     "featured": false
// }


var leaderSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    abbr :{
        type: String,
        required: true
    },
    designation:{
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default:false      
    },
   
}, {
    timestamps: true
});

var Leaders = mongoose.model('Leader', leaderSchema);

module.exports = Leaders;