const Wallet = require('../model/wallet');

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
   addWallet: (req,res,next)=>{
       const newWallet =new Wallet(req.body);
       newWallet.save((err,wallet)=>{
            res.status(200).json(wallet);
       });
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