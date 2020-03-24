// Router
const express = require('express');
var router = express.Router();
var traverse = require('traverse');

var _ = require('lodash');
const translationMDB  = require('../shared/models/Mongodb/TranslationsMdb');

// => localhost:3000/translations
// Getting all translations 

var filter_language = function(language, obj) {
// to make it in a way that is accepted from ngx-translate
    var temp = _.chain(obj)
    .keyBy('_id')
    .mapValues('word.'+language)
    .value();
    return temp;
  };

// http://localhost:3000/translations/ngx-translate/en
    router.get('/ngx-translate/:language', async(req, res) => {
    try {
        const translation = await translationMDB.find();  
        let temp =filter_language(req.params.language, translation);      
            res.status(200).send(temp);          
        } catch(error){
            res.status(500).json({error: error})
        }
    })

// Get all Translations language 'ar, 'en', 'fr'
    router.get('/TranslationsLanguage', async (req, res) => {
        try{
            const translation = await translationMDB.findOne();
            const result = Object.keys(translation.word)
            res.status(200).json(result)
        }catch(error) {
            res.status(500).json({error: error})
        }
    });

  // getting total records for data table 
    router.get('/dataTable/totalRecords', async(req, res) => {
    try {
        await translationMDB.countDocuments({},function( err, count){
        res.status(200).json(count);
        });
    } catch (error){
        res.status(500).json({error: error})
    }
    });

  // http://localhost:3000/translations/dataTble/en?pg=2&&pgS=5
  // Getting dataTable records on a specific page
    router.get('/dataTble/:language', async(req, res) => {
    try {
        let pgN = +req.query.pg;
        let pgS= +req.query.pgS;
        let startingPoint = pgN * pgS;
        language  = req.params.language;
        _word = 'word.'+language;
        
        const translation = await translationMDB.aggregate([ 
                { $skip : startingPoint }, 
                { $limit: pgS },
                { $project: {
                    _id: 0,
                    'id': '$_id',
                'trans': '$'+`${_word}` }
                }
            
        ]); 
            res.status(200).json(translation);    
        } catch(error){
            res.status(500).json({error: error})
        }
    })


// Getting a specific Translation
    router.get('/:translationId', async (req, res) => {
        try {const translation = await translationMDB.findById(req.params.translationId);
            res.status(200).json(translation);
        } catch (error) {
            res.status(500).json({error: error})
        }
    })

// Get all translations in the same schema
router.get('/', async (req,res) => {
   try {
       const translation = await translationMDB.find(); 
        res.status(200).send(translation);        
    } catch(error){
        res.status(500).json({error: error})
    }
});

// adding new word with all languages you have. word.en word.fr ...
router.post('/addNewWord/', async (req, res) => {
    language = req.body.language;
    _word = 'word.'+language;
    
    const translation = new translationMDB({
        _id:  req.body.id,
        word: req.body.word
    });
    try{
    const savedTranslations = await translation.save();
            res.status(201).json(savedTranslations);
            }catch(error) {
                res.status(500).json({error: error})
        }
});


// Adding New Language to all records
// http://localhost:3000/translations/AddLanguage/:language??translationId=ARABIC
router.patch('/AddLanguage', async (req,res) => {    
    try{             
        language  = req.body.language;
        _word = 'word.'+language;
        const updatedTranslation = await translationMDB.updateMany(
            {}, {$set: { [_word]  : '' } }
        );
        // .aggregate([{ $addFields: { [_word]  : '' } }]);
        res.status(200).json(updatedTranslation);

    }catch(error) {
        res.status(500).json({error: error})
    }
});

// Update Translations
router.patch('/EditTranslation/:language/', async (req,res) => {
    // http://localhost:3000/translations/EditTranslation/en?translationId=ARABIC
    try{  
        language  = req.params.language;
        _word = 'word.'+language;        
        const updatedTranslation = await translationMDB.updateOne(
            {_id: req.body.id}, 
            {$set : { [_word] : req.body.trans }});
            res.status(200).json(updatedTranslation);

    }catch(error) {
        res.status(500).json({error: error})
    }
})
// {"language": "855lang"}
// Delete a translation field from all records
router.patch('/DeletetranslationField', async (req, res)=> {
    try{
        language  = req.body.language;
        _word = 'word.'+language;
    
        const updateTrnsaltion = await translationMDB.updateMany(
            {}, {$unset: {[_word] : ''}}, {multi: true} );
            res.status(200).json(updateTrnsaltion)
    }catch(error) {
        res.status(500).json({error: error})
    }
});

// UPDATE translation
router.patch('/:translationId', async (req,res) => {
    try{
        const updatedTranslation = await translationMDB.updateOne(
            {_id: req.params.translationId}, 
            {$set : {
                word:{
                en: req.body.en,
                ar: req.body.ar
                }
             }
            });
            res.status(200).json(updatedTranslation);
    }catch(error) {
        res.status(500).json({error: error})
    }
})


// DELETE Userinfo
router.delete('/:translationId', async (req,res) => {
    try{
        const deletedTranslation = await translationMDB.remove({_id: req.params.translationId});
        res.status(200).json(deletedTranslation);
    }
    catch(error){
        res.status(500).json({error: error})
    }
});


// Exporting router
module.exports = router;
