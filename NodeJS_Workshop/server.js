const http = require('http');

const port = 3000;

http.get('http://nodejs.org/dist/index.json', (res) => {
	// response contains array of node versions metadata
	res.setEncoding('utf8');
	let rawData = '';
	res.on('data', (chunk) => { rawData += chunk; });
	// Called when it has finished a GET request
	res.on('end', () => {
		const parsedData = JSON.parse(rawData);
		console.log('The newest version of NodeJS is', parsedData[0].version);
	});
});

console.log('This line is after the http.get function call!');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});