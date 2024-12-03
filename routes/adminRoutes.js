const express = require('express')
const router = express.Router()

router.get("/users",(req,res)=>{
    res.send("all users")
})
router.put("/offers/:id",(req,res)=>{
    id = req.params.id
    res.send(`update a user ${id}`)
})
router.delete("/users/:id",(req,res)=>{
    id = req.params.id
    res.send(`deleted a user ${id}`)
})



module.exports = router