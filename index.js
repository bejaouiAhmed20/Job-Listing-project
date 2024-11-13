const express = require('express')
const body_parser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const companyRoutes = require('./routes/companyRoutes')


const PORT = 5000

const app = express()
app.set('view engine','ejs')


app.use('/user',userRoutes)
app.use('/company',companyRoutes)

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
})