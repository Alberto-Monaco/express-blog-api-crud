const express = require('express')
const router = express.Router()
const postsControllers = require('../controllers/postsControllers.js')

router.get('/:slug', postsControllers.show)
router.get('/', postsControllers.index)
router.post('/', postsControllers.store)
router.put('/:slug', postsControllers.update)

module.exports = router
