let mongoose = require('mongoose');
let categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ""
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
},{ 
    timestamps: true
});
module.exports = mongoose.model('Category', categorySchema);