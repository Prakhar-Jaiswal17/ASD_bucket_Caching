const express = require('express')
const routes = require('./routes/routes')
const app = express()

app.use(express.json())
app.use('/products', routes)


app.listen(3000,()=>{
    console.log('Server Started...');
})