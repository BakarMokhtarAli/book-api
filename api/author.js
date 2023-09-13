import express from "express"
import prisma from "./lib/prisma.js"
const router = express.Router()

router.get('/', async(req,res)=>{
    try{
        const author = await prisma.author.findMany()
        if(!author){
            res.status(404).json({message: 'Not Found authors'})
        }
        res.json(author)
    }catch(err){
        res.status(500).json({message: `internal server error`, err})
    }
})
router.get('/:id', async(req,res)=>{
    try{
        const { id } = req.params
        const author = await prisma.author.findUnique({
            where: {
                id: Number(id)
            }
        })
        if(!author){
            res.status(404).json({message: 'Not Found author'})
        }
        res.json(author)
    }catch(err){
        res.status(500).json({message: `internal server error`, err})
    }
})

router.post("/", async(req,res)=>{
    try{
        const { name, email } = req.body
        const author = await prisma.author.create({
            data: {
                name,
                email
            }
        })
        if(!author){
            res.status(404).json({message: 'Not Found author'})
        }
        res.json({message: `Author Created success`, author})
    }catch(err){
        res.status(500).json({message: `internal server error`, err})
    }
})
router.put("/:id", async(req,res)=>{
    try{
        const { name, email } = req.body
        const { id } = req.params
        const author = await prisma.author.update({
            data: {
                name,
                email
            },
            where: {
                id: Number(id)
            }
        })
        if(!author){
            res.status(404).json({message: 'Not Found author'})
        }
        res.json({message: `Author Updated success`, author})
    }catch(err){
        res.status(500).json({message: `internal server error`, err})
    }
})

router.delete("/:id", async(req,res)=>{
    try{
        const { id } = req.params
        const author = await prisma.author.delete({
            where: {
                id: Number(id)
            }
        })
        if(!author){
            res.status(404).json({message: 'Not Found author'})
        }
        res.json({message: `Author deleted success`, author})
        console.log("author", author)
    }catch(err){
        res.status(500).json({message: `internal server error`, err})
    }
})

export default router

