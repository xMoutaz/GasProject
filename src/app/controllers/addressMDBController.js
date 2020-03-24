// Router
const express = require('express');
var router = express.Router();

const addressMdb  = require('../shared/models/Mongodb/addressMdb');

// => localhost:3000/address
// Getting all address 
router.get('/', async (req,res) => {
   try {
       const addresses = await addressMdb.find(); 
        res.send(addresses);        
    } catch(error){
        res.status(500).json({error: error})
    }
});

// SUBMIT A POST
router.post('/', async (req, res) => {
    const address = new addressMdb({
        zip: req.body.zip,
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        _id: req.body._id
    });
    try{
    const savedAddress = await address.save();
            res.status(201).json(savedAddress);
            console.log(savedAddress);
            }catch(error) {
            console.log({error});
            res.status(500).json({error: error})
        }
});

// Getting a specific user
router.get('/:addressId', async (req, res) => {
    try {const address = await addressMdb.findById(req.params.addressId);
        console.log(req.param.addressId);
        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// UPDATE userInfo
router.patch('/:addressId', async (req,res) => {
    try{
        const updateAddress = await addressMdb.updateOne(
            {_id: req.params.addressId}, 
            {$set : {
                zip: req.body.zip,
                addressLine1: req.body.addressLine1,
                addressLine2: req.body.addressLine2,
                longitude: req.body.longitude,
                latitude: req.body.latitude }
            });
            res.json(updateAddress);
    }catch(error) {
        res.status(500).json({error: error})
    }
})

// DELETE Userinfo
router.delete('/:addressId', async (req,res) => {
    try{
        const deletedAddress = await UserMDB.remove({_id: req.params.addressId});
        res.json(deletedAddress);
    }
    catch(error){
        res.status(500).json({error: error})
    }
});

// Exporting router
module.exports = router;
