var AlphaBlockChain = require('../Blockchain/blockchain')

exports.getBlockchain = (req, res, nex) => {
	res.json(AlphaBlockChain.blockchain)
}

exports.postBlockchain = (req, res, nex) => {
	const lastBlock = AlphaBlockChain.getLastBlock()
	console.log({lastBlock})
	const proof = AlphaBlockChain.generateProofOfWork(lastBlock.proof)
	res.json(AlphaBlockChain.postBlock(proof, req.body.block))
}