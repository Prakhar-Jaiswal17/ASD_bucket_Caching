const fs = require('fs/promises')
const path = require('path')
const express = require('express')
const app = express()

const filePath = path.join(__dirname, 'db.json')

let cache={}
// {
//     request:{
//         data:"",
//         time:''
//     }
// }

function addDelay() {
    // setTimeout(next, 5000)
    return new Promise((res,rej)=>{
        setTimeout(res,1000)
    })
}

async function readData() {
    let data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
}

async function editData(data){
    data = JSON.stringify(data)
    await fs.writeFile(filePath, data, 'utf-8')
}


//ROUTES


//GET
app.get('/products',async (req,res)=>{
    try{
        const route = '/products'
        if(cache[route]){
            if(Date.now()-cache[route].time<60000){
                res.setHeader('X-Cache', 'HIT')
                res.json(cache[route].data)
                return
            }
        }
        await addDelay()
        const productData = await readData()
        cache[route]={
            data: productData,
            time: Date.now()
        }
        res.setHeader('X-Cache', 'MISS')
        res.json(cache[route].data)
    }catch(err){
        res.status(500).send('Error')
        console.log(err);
    }
})


app.get('/products/:id',async (req,res)=>{
    try{
        const id = Number(req.params.id)
        const route = `/products/${id}`
        if(cache[route]){
            if(Date.now()-cache[route].time<60000){
                res.setHeader('X-Cache', 'HIT')
                res.json(cache[route].data)
                return
            }
        }
        await addDelay()
        const productData = await readData()
        const item = productData.find(x=>x.id===id)
        console.log(item);
        if(!item){
            res.status(404).json({Error: 'Product not Found'})
            return
        }
        else{
            cache[route]={
                data: item,
                time: Date.now()
            }
        }
        res.setHeader('X-Cache', 'MISS')
        res.json(cache[route].data)
    }catch(err){
        res.status(500).send('Error')
        console.log(err);
    }
})


//POST
app.use(express.json())
app.post('/products', async(req,res)=>{
    try{
        const productData = await readData()
        const obj = {id: productData.length+1,...req.body}
        productData.push(obj)
        await editData(productData)
        cache={}
        res.status(201).json(obj)
    }catch(err){
        res.status(500).send('Error')
        console.log(err);
    }
})

//DELETE
app.delete('/products/:id', async(req,res)=>{
    try{
        const id = Number(req.params.id)
        const productData = await readData()
        const idx = productData.findIndex(x=>x.id===id)
        if(idx===-1){
            res.status(404).json({Error: 'Product not found'})
            return
        }
        const product = productData[idx]
        productData.splice(idx,1)
        await editData(productData)
        cache={}
        res.json(product)
    }catch(err){
        res.status(500).send('Error')
        console.log(err);
    }
})

//PUT
app.put('/products/:id', async(req,res)=>{
    try{
        const id = Number(req.params.id)
        const productData = await readData()
        const idx = productData.findIndex(x=>x.id===id)
        if(idx===-1){
            res.status(404).json({Error: 'Product not found'})
            return
        }
        const updatedProduct = {id:id, ...req.body}
        productData.splice(idx,1,updatedProduct)
        await editData(productData)
        cache={}
        res.json(updatedProduct)
    }catch(err){
        res.status(500).send('Error')
        console.log(err);
    }
})

//PATCH
app.patch('/products/:id', async(req,res)=>{
    try{
        const id = Number(req.params.id)
        const productData = await readData()
        const idx = productData.findIndex(x=>x.id===id)
        if(idx===-1){
            res.status(404).json({Error: 'Product not found'})
            return
        }
        const updatedProduct = {...productData[idx], ...req.body}
        productData.splice(idx,1,updatedProduct)
        await editData(productData)
        cache={}
        res.json(updatedProduct)
    }catch(err){
        res.status(500).send('Error')
        console.log(err);
    }
})



app.listen(3000,()=>{
    console.log('Server Started...');
})