const Transaction = require('../model/transaction');
const Wallet = require('../model/wallet');

module.exports ={
    fetchAll: async (req,res,next)=>{
        try{
            transaction = await Transaction.find();
            res.status(200).json(transaction);

        }catch(err){
            next(err);
        }
    },
    addTransaction: async(req,res,next)=>{
     const newTransaction = new Transaction(req.body);
     const {walletId} = req.params;
     const wallet = await Wallet.findById(walletId);
     
     wallet.transactions.push(newTransaction);
     newTransaction.wallet = wallet;

     wallet.save();
     newTransaction.save((err,transaction)=>{
         res.status(200).json(transaction);
     });   
    }
}