import express, {Router, Request, Response} from 'express';
import {Product} from '../Schemas/product';

export const router : Router = express.Router()

router.get('/all',  async (_ : Request, res :Response)=>{
    try {
        const result = await Product.find({});
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send({message:error})
    }
})
router.route('/:id')
.get(async (req : Request, res :Response)=>{
    try {
        const result = await Product.findById(req.params.id).exec();
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send({message:error})
    }
})
.post(async (req : Request, res :Response)=>{
    try {
        await Product.insertMany(req.body)
        res.status(200).send({message:"success"})
    } catch (error) {
        res.status(500).send({message:error})
    }
})
.put(async (req : Request, res :Response)=>{
    try {
        await Product.updateOne({ _id:req.params.id},req.body)
        res.status(200).send({message:"success"})
    } catch (error) {
        res.status(500).send({message:error})
    }
})
.delete(async (req : Request, res :Response)=>{
    try {
        await Product.deleteOne({ _id:req.params.id})
        res.status(200).send({message:"success"})
    } catch (error) {
        res.status(500).send({message:error})
    }
})