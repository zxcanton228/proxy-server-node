import dotenv from "dotenv"
import express from "express"
import httpProxy from "http-proxy"

dotenv.config()

const app = express()
const proxy = httpProxy.createProxyServer({})

const port = process.env.PORT,
	protocol = process.env.PROTOCOL,
	domain = process.env.DOMAIN,
	serverUrl = process.env.SERVER_URL

if (!port || !protocol || !domain || !serverUrl)
	throw new Error(
		"Port or Protocol or Domain or Server URL not found from .env"
	)

app.use((req, res) => {
	proxy.web(req, res, { target: serverUrl })
})

// proxy.on("error", (err, req, res) => {
// 	res.writeHead(500, {
// 		"Content-Type": "text/plain",
// 	})
// 	res.end("Something went wrong.")
// })

app.listen(port, () => {
	console.log(`🚀 Proxy server is running on port ${port}`)
})
