const express = require('express')
const router = express.Router()

const blockchainController = require('../controllers/blockchain')

router.get('/', blockchainController.getBlockchain)

module.exports = router