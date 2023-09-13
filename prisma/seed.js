import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function seed(){

    try{
        await prisma.author.deleteMany()
        await prisma.book.deleteMany()
        await prisma.store.deleteMany()

        await prisma.author.create({
            data: {
                name: "Abuukar Mokhtar Ali",
                email: "Abuukar@gmail.com"
            }
        });
        await prisma.author.create({
            data: {
                name: "Mohamed Mokhtar Ali",
                email: "mohamed@gmail.com"
            }
        });
        await prisma.author.create({
            data: {
                name: "omar Mokhtar Ali",
                email: "omar@gmail.com"
            }
        });

        await prisma.book.create({
            data: {
                authorId: 1,
                name: "React ultimade Book"
            }
        });
        await prisma.book.create({
            data: {
                authorId: 2,
                name: "Node ultimade Book"
            }
        });
        await prisma.book.create({
            data: {
                authorId: 3,
                name: "javaScript ultimade Book"
            }
        });

        await prisma.store.create({
            data: {
                bookId: 1,
                name: "store one",
                location: "Bakaaro"
            }
        });
        await prisma.store.create({
            data: {
                bookId: 2,
                name: "store two",
                location: "South Africa"
            }
        });
        await prisma.store.create({
            data: {
                bookId: 3,
                name: "store three",
                location: "Heliwaa"
            }
        });

    }catch(err){
        console.log(err)
        process.exit(1)
    }finally {
        await prisma.$disconnect()
    }

}

seed()