import express from "express"
import prisma from "./lib/prisma.js";
const router = express.Router();

router.get("/", async(req,res)=>{
    try{
        const book = await prisma.book.findMany()
        if(!book){
            res.status(404).json({message: 'Not Found Books'})
        }
        res.json(book)
    }catch(err){
        res.status(500).json({message: `internal server error`, err})
    }
});

router.get('/:id', async(req,res)=>{
    try{
        const { id } = req.params
        const book = await prisma.book.findUnique({
            where: {
                id: Number(id)
            }
        })
        if(!book){
            res.status(404).json({message: 'Not Found book'})
        }
        res.json(book)
    }catch(err){
        res.status(500).json({message: `internal server error`, err})
    }
})

router.post("/", async(req,res)=>{
    try{
        const { authorId, name } = req.body
        const book = await prisma.book.create({
            data: {
                authorId,
                name
            }
        })
        if(!book){
            res.status(404).json({message: 'Not Found book'})
        }
        res.json({message: `book Created success`, book})
    }catch(err){
        res.status(500).json({message: `internal server error`, err})
    }
})
router.put("/:id", async(req,res)=>{
    try{
        const { authorId, name } = req.body
        const { id } = req.params
        const book = await prisma.book.update({
            data: {
                authorId,
                name
            },
            where: {
                id: Number(id)
            }
        })
        if(!book){
            res.status(404).json({message: 'Not Found book'})
        }
        res.json({message: `book Updated success`, book})
    }catch(err){
        res.status(500).json({message: `internal server error`, err})
    }
})

router.delete("/:id", async(req,res)=>{
    try{
        const { id } = req.params
        const book = await prisma.book.delete({
            where: {
                id: Number(id)
            }
        })
        if(!book){
            res.status(404).json({message: 'Not Found book'})
        }
        res.json({message: `book deleted success`, book})
    }catch(err){
        res.status(500).json({message: `internal server error`, err})
    }
})

export default router