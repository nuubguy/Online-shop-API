const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type:String, required: true},
    email:{type:String, required: true},
    wallets:[{
        type:Schema.Types.ObjectId,
        ref:'Wallet'
    }]
});

const User = mongoose.model('User',userSchema);
module.exports = User;