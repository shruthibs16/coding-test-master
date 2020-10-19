const express = require('express');
const Joi = require('@hapi/joi');

const pet = require('../models/pets');
const { validateBody } = require('../middlewares/route');

const router = express.Router();

router.post(
  '/',
  validateBody(Joi.object().keys({
    name: Joi.string().required().description('name of pet'),
    age: Joi.number().integer().required().description('age of pet'),
    colour: Joi.string().default('color of the pet'),
  }),
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {
      const petData = new pet(req.body);
      await petData.save();
      res.status(201).json(petData);
    } catch (e) {
        return res.status(500).send({"error":err});
    }
  }
);

router.get(
    '/',
    async (req, res, next) => {
        try {
            let petData = await pet.find({})
            console.log("data..",petData)
            if(petData.length == 0){
                return res.status(404).json({"err":"no petData avilable "});
            }
                return res.status(200).json(petData);
            } catch (e) {
                return res.status(500).send({"error":err});
        }
    }
)

router.delete(
    '/:petname',
    async (req, res, next) => {
        try {
            let petData = await pet.findOneAndDelete({name:req.params.petname})
            console.log("data..",petData)
            if(!petData){
                return res.status(404).json({"err":"no petData avilable "});
            }
                return res.status(200).send({"msg":" petData deleted successfully"})
            } catch (e) {
                return res.status(500).send({"error":err});
        }
    }
)  

module.exports = router;