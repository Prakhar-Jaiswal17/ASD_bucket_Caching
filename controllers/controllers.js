const services = require('../services/services')

async function getAll(req,res){
    try{
        const route = req.url
        
        const products = await services.getAllProducts(route)
        
        res.json(products)
    }catch(err){
        res.status(500).send('Error')
        console.log(err);
    }
}

async function getById(req,res) {
    try{
        const id = Number(req.params.id)
        const product = await services.getProduct(id, req.url)
        if(!product){
            res.status(404).json({Error: 'Product not Found'})
            return
        }
        res.json(product)
    }catch(err){
        res.status(500).send('Error')
        console.log(err);
    }
}

async function postItem(req,res){
    try{
        const item = await services.addProduct(req.body)
        res.status(201).json(item)
    }catch(err){
        res.status(500).send('Error')
        console.log(err);
    }
}

async function deleteItem(req,res) {
    try{
        const id = Number(req.params.id)
        const product = await services.removeItem(id)
        if(!product){
            res.status(404).json({Error: 'Product not found'})
            return
        }
        res.json(product)
    }catch(err){
        res.status(500).send('Error')
        console.log(err);
    }
}

async function put(req,res) {
    try{
        const id = Number(req.params.id)
        const updatedProduct = await services.putItem(id,req.body)
        if(!updatedProduct){
            res.status(404).json({Error: 'Product not found'})
            return
        }
        res.json(updatedProduct)
    }catch(err){
        res.status(500).send('Error')
        console.log(err);
    }
}

async function patch(req,res) {
    try{
        const id = Number(req.params.id)
        const updatedProduct = await services.updateProduct(id, req.body)
        if(!updatedProduct){
            res.status(404).json({Error: 'Product not found'})
            return
        }
        res.json(updatedProduct)
    }catch(err){
        res.status(500).send('Error')
        console.log(err);
    }
}

module.exports = {getAll, getById, postItem, deleteItem, put, patch}