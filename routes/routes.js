const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/', productController.getAll)
router.get('/:id', productController.getById)

router.post('/', productController.post)

router.delete('/:id', productController.remove)

router.put('/:id', productController.put)

router.patch('/:id', productController.patch)

module.exports = router
