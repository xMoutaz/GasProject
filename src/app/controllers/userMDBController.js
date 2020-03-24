// Router
const express = require('express');
var router = express.Router();

const UserMDB  = require('../shared/models/Mongodb/userMDB');

// => localhost:3000/users
// Getting all users 
router.get('/', async (req,res) => {
   try {
       const users = await UserMDB.find(); 
        res.status(200).send(users);        
    } catch(error){
        res.status(500).json({error: error})
    }
});
// SUBMIT A POST
router.post('/', async (req, res) => {
    const user = new UserMDB({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        _id: req.body._id
    });
    try{
    const savedUser = await user.save();
            res.status(201).json(savedUser);
            console.log(savedUser);
            
    }catch(error) {
            console.log(error);
            res.status(500).json({error: error})
    }
});

// Getting a specific user
router.get('/:userId', async (req, res) => {
    try {const user = await UserMDB.findById(req.params.userId);
        console.log(req.params.userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// UPDATE userInfo
router.patch('/:userId', async (req,res) => {
    try{
        const updatedUser = await UserMDB.updateOne(
            {_id: req.params.userId}, 
            {$set : {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone}});
            res.status(200).json(updatedUser);
    }catch(error) {
        res.status(500).json({error: error})
    }
})

// DELETE Userinfo
router.delete('/:userId', async (req,res) => {
    try{
        const deletedUser = await UserMDB.remove({_id: req.params.userId});
        res.status(200).json(deletedUser);
    }
    catch(error){
        res.status(500).json({error: error})
    }
});

// Exporting router
module.exports = router;
