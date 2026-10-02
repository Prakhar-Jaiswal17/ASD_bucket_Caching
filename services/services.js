const {clearCache, addCache} = require('../middleware/cache')
const {readData, editData} = require('../database/retrieveDB')

function addDelay(){
    return new Promise((res,_)=>{
        setTimeout(res,1000)
    })
}

async function getAllProducts(key){
    await addDelay()
    const productData = await readData()
    addCache(key,productData)
    return productData
}

async function getProduct(id, key) {
    await addDelay()
    const productData = await readData()
    const item = productData.find(x=>x.id===id)
    if(item) 
        addCache(key,item)
    return item
}

async function addProduct(data) {
    const productData = await readData()
    const id = productData.length===0? 1:(productData[productData.length-1].id)+1
    const obj = {id: id,...data}
    productData.push(obj)
    await editData(productData)
    clearCache()
    return obj
}

async function removeItem(id) {
    const productData = await readData()
    const idx = productData.findIndex(x=>x.id===id)
    const product = productData[idx]
    if(idx!==-1){
        productData.splice(idx,1)
        await editData(productData)
        clearCache()
    }
    return product
}

async function putItem(id,data) {
    const productData = await readData()
    const idx = productData.findIndex(x=>x.id===id)
    let updatedProduct;
    if(idx!==-1){
        updatedProduct = {id:id, ...data}
        productData.splice(idx,1,updatedProduct)
        await editData(productData)
        clearCache()
    }
    return updatedProduct
}

async function updateProduct(id,data) {
    const productData = await readData()
    const idx = productData.findIndex(x=>x.id===id)
    let updatedProduct;
    if(idx!==-1){
        updatedProduct = {...productData[idx], ...data}
        productData.splice(idx,1,updatedProduct)
        await editData(productData)
        clearCache()
    }
    return updatedProduct
}

module.exports = {getAllProducts, getProduct, addProduct, removeItem, putItem, updateProduct}