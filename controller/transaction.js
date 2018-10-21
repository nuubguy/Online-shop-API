const Transaction = require('../model/transaction');
const Wallet = require('../model/wallet');
const User = require('../model/users');

module.exports ={
    fetchAll: async (req,res,next)=>{
        try{
            transaction = await Transaction.find();
            res.status(200).json(transaction);
        }catch(err){
            next(err);
        }
    },
    fetchByUserId:async(req,res,next)=>{
        const {userId} = req.params;
        try{
            user = await User.findById(userId);

            if(user === null){
                res.status(404).json({message:"user not found"});
            }
            const wallets = user.wallets;
            
            let transactions = wallets.map(async walletId=>{
                transaction =await Transaction.find({wallet:walletId});
                return transaction;
            });

            res.status(200).json(transactions);

        }catch(err){
            next(err);
        }
    },
    addTransaction: async(req,res,next)=>{
     const newTransaction = new Transaction(req.body);
     const {walletId} = req.params;
     const wallet = await Wallet.findById(walletId);

     if(wallet===null){
         return res.status(404).json({
             message:"wallet not found"
         })
     }

     updateWallet = (newTransaction.Type!=="Debit") ? wallet.balance+=newTransaction.Amount : wallet.balance-=newTransaction.Amount  

     if(updateWallet<0){
         return res.status(400).json({
             message:"insufficient amount"
         });
     }
     
     wallet.transactions.push(newTransaction);
     newTransaction.wallet = wallet;

     wallet.save();
     newTransaction.save((err,transaction)=>{
         res.status(200).json(transaction);
     });   
    }
}