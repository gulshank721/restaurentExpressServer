const { Int32 } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// require('mongoose-currency').loadType(mongoose); // mongoose-currency adds an external schema type like currency
// const Currency = mongoose.Types.Currency;        // to suport currency type field.(like price in this case)

// mongoose.Promise = global.Promise;


const dishSchema = new Schema({
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
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: String,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default:false      
    },
    // comments:[commentSchema]
}, {
    timestamps: true
});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;