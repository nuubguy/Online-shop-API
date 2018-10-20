const User = require('../model/users');

module.exports={
    fetchAll : async (req,res,next)=>{
    try{
    let users = await User.find().select('_id name email wallets');
    if(users.length==0){
       return res.status(404).json({message:"there is no data"});     
    }
    return res.status(200).json(users);
    }catch(err){
        next(err);
        }               
    }
    ,
    addUser:(req,res,next)=>{
        const newUser = new User(req.body);
        newUser.save((err,user)=>{
            res.status(200).json(newUser);     
        });
    },
    fetchByName: async (req,res,next)=>{
        const userId = req.params.name;
        try{
            let user = await User.find({ name: userId });
            res.status(200).json(user)
        }catch(err){
            next(err);
        }
    },
    updateUser: async(req,res,next)=>{
        const {userId} = req.params;
        const newUser = req.body;
        const result = await User.findByIdAndUpdate(userId, newUser);

        res.status(200).json(result);
    }
}