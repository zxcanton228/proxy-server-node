import dotenv from "dotenv"
import express from "express"
import fs from "fs"
import httpProxy from "http-proxy"
import https from "https"

// Конфигурация
dotenv.config()
const app = express()
const proxy = httpProxy.createProxyServer({})

// Окружение
const port = process.env.PORT,
	protocol = process.env.PROTOCOL,
	domain = process.env.DOMAIN,
	serverUrl = process.env.SERVER_URL

if (!port || !protocol || !domain || !serverUrl)
	throw new Error(
		"Port or Protocol or Domain or Server URL not found from .env"
	)

// Настройка HTTPS
const options = {
	key: fs.readFileSync("/etc/letsencrypt/live/192.168.1.33/privkey.pem"),
	cert: fs.readFileSync("/etc/letsencrypt/live/192.168.1.33/fullchain.pem"),
}

// Запуск proxy
app.use((req, res) => {
	proxy.web(req, res, { target: serverUrl })
})

// Ошибка
proxy.on("error", (err, req, res) => {
	// res.write(500, {
	// 	"Content-Type": "text/plain",
	// })
	res.end("Something went wrong.")
})

// Запуск VPN
https.createServer(options, app).listen(port, () => {
	console.log(`🚀 Proxy server is running on port ${port}`)
})
