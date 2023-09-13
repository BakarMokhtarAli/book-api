import express from "express"
import authorRouter from "./author.js"
import bookRouter from "./book.js"
import storeRouter from "./bookStore.js"
const server = express()

server.use(express.json())

server.use("/api/authors", authorRouter)
server.use("/api/books", bookRouter)
server.use("/api/store", storeRouter)


export default server