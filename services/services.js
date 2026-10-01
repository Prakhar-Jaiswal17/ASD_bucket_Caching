const {readData, editData} = require('../database/retrieve')

function addDelay() {
    return new Promise((res, rej) => {
        setTimeout(res, 1000)
    })
}

async function getAllProducts() {
    await addDelay()
    const productData = await readData()
    return productData
}

async function getProductById(id) {
    await addDelay()
    const productData = await readData()
    const item = productData.find(x => x.id === id)
    return item
}

async function createProduct(body) {
    const productData = await readData()
    const obj = { id: productData.length + 1, ...body }
    productData.push(obj)
    await editData(productData)
    return obj
}

async function deleteProduct(id) {
    const productData = await readData()
    const idx = productData.findIndex(x => x.id === id)
    if (idx === -1) {
        return null
    }
    const product = productData[idx]
    productData.splice(idx, 1)
    await editData(productData)
    return product
}

async function replaceProduct(id, body) {
    const productData = await readData()
    const idx = productData.findIndex(x => x.id === id)
    if (idx === -1) {
        return null
    }
    const updatedProduct = { id: id, ...body }
    productData.splice(idx, 1, updatedProduct)
    await editData(productData)
    return updatedProduct
}

async function updateProduct(id, body) {
    const productData = await readData()
    const idx = productData.findIndex(x => x.id === id)
    if (idx === -1) {
        return null
    }
    const updatedProduct = { ...productData[idx], ...body }
    productData.splice(idx, 1, updatedProduct)
    await editData(productData)
    return updatedProduct
}

module.exports = {getAllProducts, getProductById, createProduct, deleteProduct, replaceProduct, updateProduct}
