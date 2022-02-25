var AlphaBlockChain = require('../Blockchain/blockchain')

exports.getBlockchain = (req, res, nex) => {
	res.json(AlphaBlockChain.blockchain)
}

exports.postBlockchain = (req, res, nex) => {
	res.json(AlphaBlockChain.postBlock(req.body.block))
}