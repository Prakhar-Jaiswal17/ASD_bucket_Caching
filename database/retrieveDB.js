const fs = require('fs/promises')
const path = require('path')

const filePath = path.join(__dirname, 'db.json')

async function readData() {
    let data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
}

async function editData(data){
    data = JSON.stringify(data)
    await fs.writeFile(filePath, data, 'utf-8')
}


module.exports = {readData, editData}