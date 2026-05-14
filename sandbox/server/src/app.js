import express from "express"
import morgan from "morgan"
import { createPod } from "../kubernetes/pod.js" 
import { createService } from "../kubernetes/service.js"
import {v4 as uuid} from "uuid"

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"))

app.get("/api/sandbox",(req,res)=>{
   res.json({
      status:"ok"
   })
})

app.post("/api/sandbox/start",async(req,res)=>{

    const sandboxId=uuid()
    await Promise.all([
        createPod(sandboxId),
        createService(sandboxId)
    ])
    return res.status(201).json({
        message: 'Sandbox environment created successfully',
        sandboxId,
        previewUrl: `http://${sandboxId}.preview.localhost`
    })
})
console.log("POST ROUTE LOADED")

app.post("/api/sandbox/vansh",(req,res)=>{
    console.log("POST API HIT")

    return res.json({
        message:"working"
    })
})

app.post("/hello",(req,res)=>{
   res.json({
      message:"POST working"
   })
})

export default app