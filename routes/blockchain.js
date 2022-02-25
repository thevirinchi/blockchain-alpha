const express = require('express')
const router = express.Router()

const blockchainController = require('../controllers/blockchain')

router.get('/', blockchainController.getBlockchain)
router.post('/', blockchainController.postBlockchain)
router.get('/verify', blockchainController.verifyBlockchain)

module.exports = router