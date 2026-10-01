const {getAllProducts, getProductById, createProduct, deleteProduct, replaceProduct, updateProduct} = require('../services/services')
const {getCache, clearCache} = require('../middleware/cache')

async function getAll(req, res) {
    try {
        const cache = getCache()
        const route = '/products'
        if (cache[route]) {
            if (Date.now() - cache[route].time < 60000) {
                res.setHeader('X-Cache', 'HIT')
                res.json(cache[route].data)
                return
            }
        }
        const productData = await getAllProducts()
        cache[route] = {
            data: productData,
            time: Date.now()
        }
        res.setHeader('X-Cache', 'MISS')
        res.json(cache[route].data)
    } catch (err) {
        res.status(500).send('Error')
        console.log(err);
    }
}

async function getById(req, res) {
    try {
        const cache = getCache()
        const id = Number(req.params.id)
        const route = `/products/${id}`
        if (cache[route]) {
            if (Date.now() - cache[route].time < 60000) {
                res.setHeader('X-Cache', 'HIT')
                res.json(cache[route].data)
                return
            }
        }
        const item = await getProductById(id)
        if (!item) {
            res.status(404).json({ Error: 'Product not Found' })
            return
        }
        else {
            cache[route] = {
                data: item,
                time: Date.now()
            }
        }
        res.setHeader('X-Cache', 'MISS')
        res.json(cache[route].data)
    } catch (err) {
        res.status(500).send('Error')
        console.log(err);
    }
}

async function post(req, res) {
    try {
        const obj = await createProduct(req.body)
        clearCache()
        res.status(201).json(obj)
    } catch (err) {
        res.status(500).send('Error')
        console.log(err);
    }
}

async function remove(req, res) {
    try {
        const id = Number(req.params.id)
        const product = await deleteProduct(id)
        if (!product) {
            res.status(404).json({ Error: 'Product not found' })
            return
        }
        clearCache()
        res.json(product)
    } catch (err) {
        res.status(500).send('Error')
        console.log(err);
    }
}

async function put(req, res) {
    try {
        const id = Number(req.params.id)
        const updatedProduct = await replaceProduct(id, req.body)
        if (!updatedProduct) {
            res.status(404).json({ Error: 'Product not found' })
            return
        }
        clearCache()
        res.json(updatedProduct)
    } catch (err) {
        res.status(500).send('Error')
        console.log(err);
    }
}

async function patch(req, res) {
    try {
        const id = Number(req.params.id)
        const updatedProduct = await updateProduct(id, req.body)
        if (!updatedProduct) {
            res.status(404).json({ Error: 'Product not found' })
            return
        }
        clearCache()
        res.json(updatedProduct)
    } catch (err) {
        res.status(500).send('Error')
        console.log(err);
    }
}

module.exports = { getAll, getById, post, remove, put, patch }
