var express = require('express');
var router = express.Router();
let categorySchema = require('../schemas/category');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    let category = await categorySchema.find({});
  res.send(category);
});

router.post('/', async function(req, res, next) {
    try {
        let body = req.body;
        let newCategory = categorySchema({
            name:body.name,
            description:body.description
        });
        await newCategory.save()
        res.status(200).send({
            success:true,
            data:newCategory
        });
    } catch (error) {
        res.status(404).send({
            success:false,
            message:error.message
        })
    }
});

router.get('/:id', async function(req, res, next) {
    try {
        let category = await categorySchema.findById(req.params.id);
        res.send({
            success:true,
            data:category
        });
    } catch (error) {
        res.status(404).send({
            success:false,
            message:error.message
        })
    }
});

router.put('/:id', async function(req, res, next) {
    try {
        let body = req.body;
        let updatedObj = {}
        if(body.name){
            updatedObj.name = body.name
        }
        if(body.description){
            updatedObj.description = body.description
        }
        let updatedCategory = await categorySchema.findByIdAndUpdate(req.params.id, updatedObj, {new:true});
        res.send({
            success:true,
            data:updatedCategory
        });
    } catch (error) {
        res.status(404).send({
            success:false,
            message:error.message
        })
    }
});

router.delete('/:id', async function(req, res, next) {
    try {
        let deletedCategory = await categorySchema.findByIdAndUpdate(req.params.id,{
            isDeleted:true
        },{new:true});
        res.send({
            success:true,
            data:deletedCategory
        });
    } catch (error) {
        res.status(404).send({
            success:false,
            message:error.message
        })
    }
});
module.exports = router;