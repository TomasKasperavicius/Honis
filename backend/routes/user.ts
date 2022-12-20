import express, {Router, Request, Response} from 'express';
import {User} from '../Schemas/user';

export const router : Router = express.Router()

router.post('/signup', async (req : Request, res :Response)=>{
    try {
        const {email,username}  = req.body;
        if (email === undefined || username === undefined) {
            throw new Error("Email or username missing.")
        }
        const result = await User.find({$or:[email,username]});
        if (result.length != 0) {
            res.status(400).send({message:"User already exists."})
        }
        await User.insertMany(req.body)
        res.status(200).send({message:"success"})
    } catch (error) {
        res.status(500).send({message:error})
    }
})
router.get('/all', async (_ : Request, res :Response)=>{
    try {
        const result = await User.find({});
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send({message:error})
    }
})
router.route('/:id')
.get(async (req : Request, res :Response)=>{
    try {
        const result = await User.findById(req.params.id).exec();
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send({message:error})
    }
})
.put(async (req : Request, res :Response)=>{
    try {
        await User.updateOne({ _id:req.params.id},req.body)
        res.status(200).send({message:"success"})
    } catch (error) {
        res.status(500).send({message:error})
    }
})
.delete(async (req : Request, res :Response)=>{
    try {
        await User.deleteOne({ _id:req.params.id})
        res.status(200).send({message:"success"})
    } catch (error) {
        res.status(500).send({message:error})
    }
})