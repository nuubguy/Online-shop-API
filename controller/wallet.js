const Wallet = require('../model/wallet');
const User = require('../model/users');
const mongoose = require('mongoose');

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
    //    const {userId}= req.params;
    //    const newCar = new Car(req.body);
       user = await User.findById(req.params.userId);

       res.status(200).json(user);
       
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