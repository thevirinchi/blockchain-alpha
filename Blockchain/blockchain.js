const moment = require('moment')
const isUsable = require("../helpers/functions")
const crypto = require('crypto')

class Blockchain{

	constructor(){
		this.blockchain = []
		this.blockchain.push({proof: 0, prevHash: '0'})
	}

	postBlock = (proof, prevHash) => {
		if(isUsable(proof) && isUsable(prevHash)){
			const block = {
				index: this.blockchain.length,
				timestamp: moment(),
				proof: proof,
				prevHash: prevHash
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

	generateBlockHash = (block) => {
		return crypto.createHash('sha256').update(JSON.stringify(block)).digest('base64')
	}

	isValid = () => {
		let prevBlock = this.blockchain[0]
		let blockIndex = 1
		while (blockIndex<this.blockchain.length){
			console.log("verifying")
			let block = this.blockchain[blockIndex]
			console.log({block, prevBlock})
			console.log("Expected previous has= "+this.generateBlockHash(prevBlock) )
			if(block.prevHash !== this.generateBlockHash(prevBlock)) return false
			const validHash = crypto.createHash('sha256').update(((block.proof)**2 - (prevBlock.proof)**2).toString()).digest('base64').substring(0,3) !== "000"
			console.log({validHash})
			if(validHash) return false
			prevBlock = block
			blockIndex+=1
		}
		return true
	}
}

const AlphaBlockChain = new Blockchain()

module.exports = AlphaBlockChain