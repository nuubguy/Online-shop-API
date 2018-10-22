const Wallet = require('../model/wallet');
const User = require('../model/users');
const Transaction = require('../model/transaction');

module.exports = {
   fetchAll: async (req,res,next)=>{
       try{
        let wallets= await Wallet.find();
        if(wallets.length===0){
            return res.status(400).json({
                message:"there is no wallet"
            })
        }
        return res.status(200).json(wallets);
       }catch(err){
           next(err);
       }
   },
   
   
   addWallet: async (req,res,next)=>{
       const newWallet = new Wallet(req.body);
       user = await User.findById(req.params.userId);

       if(user ===null){
           return res.status(404).json({
               message:"invalid user-id"
           })
       }

       user.wallets.push(newWallet);
       newWallet.user = user;

       newWallet.save();
       user.save((err,updatedUser)=>{
        res.status(200).json(updatedUser);
       });
   },
   transfer:async (req,res,next)=>{
       const{walletId,walletIdReceiver} =req.params;
       const balance = req.body.amount;
       
       let walletSender = await Wallet.findById(walletId);
       let walletReceiver = await Wallet.findById(walletIdReceiver);

       if(walletSender.balance-balance<0){
           return res.status(400).json({message:"inssuficient balance"})
       }

       walletSender.balance-= balance;
       walletReceiver.balance+=balance;

       const senderTransaction = new Transaction({
           Description:"transfer"+balance+"to "+walletReceiver.user,
           Amount:balance,
           type:"Debit",
           wallet:walletId
       });

       const receiverTransaction = new Transaction({
        Description:"receive "+balance+"from "+walletReceiver.user,
        Amount:balance,
        type:"Credit",
        wallet:walletIdReceiver
    });

    walletSender.transactions.push(senderTransaction);
    walletReceiver.transactions.push(receiverTransaction);
    await walletSender.save();
    await walletReceiver.save();
    await senderTransaction.save();
    await receiverTransaction.save();
    return res.status(200).json(walletSender,walletReceiver);

       
    },
   deleteWallet: async (req,res,next)=>{
       const{walletId} = req.params;
       try{
        await Wallet.findByIdAndDelete(walletId);
        res.status(200).json({
            message:"wallet has been deleted",
            description:{
                type:"GET",
                url:"http://localhost:3001/wallet/"
            }
            });
       }catch(err){
           next(err);
       }
       
   }
   
   
}