const moment = require('moment')
const isUsable = require("../helpers/functions")
const crypto = require('crypto')

class Blockchain{

	constructor(){
		this.blockchain = []
		this.blockchain.push({proof: 0, prevHash: '0'})
	}

	postBlock = (proof, data) => {
		if(isUsable(data)){
			const block = {
				index: this.blockchain.length,
				timestamp: moment(),
				proof: proof,
				prevHash: data.prevHash
			}
			this.blockchain.push(block)
			return block
		}
	}
	
	getLastBlock = () => {
		return this.blockchain[this.blockchain.length-1]
	}

	generateProofOfWork = (prevProof) => {
		let newProof = 1
		let proofVerified = false
		while (!proofVerified){
			const newhash = crypto.createHash('sha256').update((newProof**2 - prevProof**2).toString()).digest('base64')
			if(newhash.substring(0,3)==="000") proofVerified = true
			else newProof+=1
		}
		return newProof
	}
}

const AlphaBlockChain = new Blockchain()

module.exports = AlphaBlockChain