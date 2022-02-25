require('dotenv').config()

const { networkInterfaces } = require('os')
const express = require('express')
const moment = require('moment')
const http = require('http')
const https = require('https')
const cors = require('cors')
const app = express()

const nets = networkInterfaces()
const SERVER_MODE = process.env.SERVER_MODE
let LAN_ADDRESS = null
const PORT_NUMBER = process.env.PORT_NUMBER
for (const name of Object.keys(nets))
	for (const net of nets[name])
		if (net.family === 'IPv4' && !net.internal)
			LAN_ADDRESS = net.address

const logger = (req, res, nex) => {
	console.log({
		timestamp: moment().format('DD/MM/YYYY HH:mm:ss'),
		url: req.originalUrl,
		headers: req.headers,
		body: req.body,
		params: req.params,
		query: req.query
	})
	nex()
}

app.use(cors())
app.use(express.json({verify:function(req,res,buf){req.rawBody=buf}}))
app.use(express.urlencoded())
app.use(logger)

const blockChainRouter = require('./routes/blockchain')

app.use('/api/blockchain', blockChainRouter)

console.log("Starting server in "+SERVER_MODE+" mode.")
switch(SERVER_MODE){
	case 'DEV':
		app.listen(PORT_NUMBER, () => console.log("Server starting at port: "+PORT_NUMBER))
		break
	case 'TEST':
		const lanServer = http.createServer(app)
		lanServer.listen(PORT_NUMBER, LAN_ADDRESS, () => { console.log("Server starting at: "+LAN_ADDRESS+":"+PORT_NUMBER) })
		break
	case 'PROD':
		const options = {
			key: fs.readFileSync(__dirname + '/ssl/server.key'),
			cert: fs.readFileSync(__dirname + '/ssl/server.crt'),
			ca: fs.readFileSync(__dirname + '/ssl/ca_bundle.crt')
		}
		const server = https.createServer(options, app)
		server.listen(PORT_NUMBER, () => console.log("Server starting at port: "+PORT_NUMBER))
		break
	default: app.listen(8080)
}