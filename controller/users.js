const User = require('../model/users');

module.exports={
    fetchAll : async (req,res,next)=>{
    try{
    let users = await User.find().select('_id name email');
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
    fetchById: async (req,res,next)=>{
        const userId = req.params.userId;
        try{
            let user = await User.findById(userId);
            res.status(200).json(user)
        }catch(err){
            next(err);
        }
    },
    fetchByName: async (req,res,next)=>{
        const userId = req.params.name;
        try{
            let user = await User.find({ _id: userId });
            res.status(200).json(user)
        }catch(err){
            next(err);
        }
    }
}