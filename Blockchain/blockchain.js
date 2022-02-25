const moment = require('moment')
const isUsable = require("../helpers/functions")

class Blockchain{

	constructor(){
		this.blockchain = []
		this.blockchain.push({proof: true, prevHash: '0'})
	}

	postBlock = (data) => {
		if(isUsable(data)){
			const block = {
				index: this.blockchain.length,
				timestamp: moment(),
				proof: data.proof,
				prevHash: data.prevHash
			}
			this.blockchain.push(block)
			return block
		}
	}
	
	getLastBlock = () => {
		return this.blockchain[this.blockchain.length]
	}
}

const AlphaBlockChain = new Blockchain()

module.exports = AlphaBlockChain