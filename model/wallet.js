const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletSchema = new Schema({
    name: {type:String, required: true},
    transactions:[{
        type:Schema.Types.ObjectId,
        ref:'Transaction'
    }]
});

const Wallet = mongoose.model('Wallet',walletSchema);
module.exports = Wallet;