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
        try{
            user = await User.findById(req.params.userId);

            if(user === null){
                res.status(404).json({message:"user not found"});
            }
            const wallets = user.wallets;
            console.log(wallets);
            
            let currentTransaction=[];

            for(var x=0;x<wallets.length;x++){
                transaction =await Transaction.find({wallet:wallets[x]});
                currentTransaction = currentTransaction.concat(transaction);
            }

            res.status(200).json(currentTransaction);

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