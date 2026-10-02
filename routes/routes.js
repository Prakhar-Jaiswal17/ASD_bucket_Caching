const express = require('express')
const {checkCache} = require('../middleware/cache')
const controllers = require('../controllers/controllers')
const router = express.Router()

router.get('/', checkCache, controllers.getAll)
router.get('/:id', checkCache, controllers.getById)


router.post('/', controllers.postItem)

router.delete('/:id', controllers.deleteItem)

router.put('/:id', controllers.put)


router.patch('/:id', controllers.patch)

module.exports = router