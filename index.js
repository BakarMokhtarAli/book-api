import express from "express"

import server from "./api/server.js";

server.listen(8000,()=>{
    console.log("Server listerning on port 8000")
})
