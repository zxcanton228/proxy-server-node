const http = require("http"),
  url = require('url'),
 	httpProxy = require("http-proxy"),
 	dotenv = require("dotenv")

dotenv.config()
const port = process.env.PORT || 8080
const proxy = httpProxy.createProxyServer({})

const server = http.createServer((req, res) => {
	console.log('Request received:', req.method, req.url);
	
	// Анализируем URL запроса
	const parsedUrl = url.parse(req.url);
	let target = 'http://example.com'; // Целевой сервер по умолчанию
	
	// Определяем целевой сервер на основе хоста запроса
	if (parsedUrl.hostname === 'yandex.ru') {
		target = 'https://yandex.ru';
	} else if (parsedUrl.hostname === 'google.com') {
		target = 'https://google.com';
	} // Добавьте другие условия по мере необходимости
	
	proxy.on('proxyReq', (proxyReq, req, res, options) => {
		console.log('Proxy request:', req.method, req.url);
		console.log('Headers:', req.headers);
	});
	
	proxy.on('proxyRes', (proxyRes, req, res) => {
		console.log('Response received:', proxyRes.statusCode);
		console.log('Headers:', proxyRes.headers);
		
		let body = [];
		proxyRes.on('data', (chunk) => {
			body.push(chunk);
		}).on('end', () => {
			body = Buffer.concat(body).toString();
			console.log('Body:', body);
		});
	});
	
	proxy.on('error', (err, req, res) => {
		console.error('Proxy error:', err);
		res.writeHead(500, { 'Content-Type': 'text/plain' });
		res.end('Something went wrong.');
	});
	
	proxy.web(req, res, { target: target });
});
server.listen(port, () => {
	console.log(`🚀 Proxy server running at ${port}`)
})
