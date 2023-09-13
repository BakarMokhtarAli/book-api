import express from "express";
import prisma from "./lib/prisma.js";

const router = express.Router();

router.get("/", async(req,res)=>{
    try{
        const store = await prisma.store.findMany()
        if(!store){
            res.status(404).json({message: 'Not Found Books'})
        }
        res.json(store)
    }catch(err){
        res.status(500).json({message: `internal server error`, err})
    }
});

router.get('/:id', async(req,res)=>{
    try{
        const { id } = req.params
        const store = await prisma.store.findUnique({
            where: {
                id: Number(id)
            }
        })
        if(!store){
            res.status(404).json({message: 'Not Found store'})
        }
        res.json(store)
    }catch(err){
        res.status(500).json({message: `internal server error`, err})
    }
})

router.post("/", async(req,res)=>{
    try{
        const { bookId, name, location } = req.body
        const store = await prisma.store.create({
            data: {
                bookId,
                name,
                location
            }
        })
        if(!store){
            res.status(404).json({message: 'Not Found store'})
        }
        res.json({message: `store Created success`, store})
    }catch(err){
        res.status(500).json({message: `internal server error`, err})
    }
})
router.put("/:id", async(req,res)=>{
    try{
        const { bookId, name, location } = req.body
        const { id } = req.params
        const store = await prisma.store.update({
            data: {
                bookId,
                name,
                location
            },
            where: {
                id: Number(id)
            }
        })
        if(!store){
            res.status(404).json({message: 'Not Found store'})
        }
        res.json({message: `store Updated success`, store})
    }catch(err){
        res.status(500).json({message: `internal server error`, err})
    }
})

router.delete("/:id", async(req,res)=>{
    try{
        const { id } = req.params
        const store = await prisma.store.delete({
            where: {
                id: Number(id)
            }
        })
        if(!store){
            res.status(404).json({message: 'Not Found store'})
        }
        res.json({message: `Author deleted success`, store})
    }catch(err){
        res.status(500).json({message: `internal server error`, err})
    }
})

export default router