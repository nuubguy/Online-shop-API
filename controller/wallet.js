const Wallet = require('../model/wallet');
const User = require('../model/users');

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

       user.wallets.push(newWallet);
       newWallet.user = user;

       newWallet.save();
       user.save((err,updatedUser)=>{
        res.status(200).json(updatedUser);
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