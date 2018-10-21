const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    Description:{type:String,default:" "},
    Date: {type:Date, default:Date.now},
    Amount:{type:Number,required:true},
    Type:{type:String},
    wallet:{
        type:Schema.Types.ObjectId,
        ref:"Wallet",
    }

});

const Transaction = mongoose.model('Transaction',transactionSchema);
module.exports = Transaction;