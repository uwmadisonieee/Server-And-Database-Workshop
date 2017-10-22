
# NodeJS Workshop

This workshop is to **quick** teach you about NodeJS. This is by no means a full tutorial, but the goal is teach you the main concepts you may be new to learning how to run a backend.

## What is NodeJS

Every language needs a way to compile to code and run it. For javascript each browser has its own "engine" which is really for our purpose the "compiler". Chrome's engine, the V8 Engine, is what runs NodeJS... so really this means you can now just run your javascript code in your terminal and not a browser. NodeJS offers a set of built in modules/libraries for servers use cases and this bundled with a javascript engine is all NodeJS really is. NodeJS is also [Event-Driven Programming](https://www.tutorialspoint.com/nodejs/nodejs_event_loop.htm) language and is designed to wait until you request an action out of it.

## NodeJS Hello World

- Create a file anywhere called `helloWorld.js`
- Add [these lines](./helloWorld.js):
```
var name = "NodeJS Workshop";
console.log("Hello World", name);
```
- Save the file
- Open the terminal/command prompt to the location of this file
- Run: `node HelloWorld.js`
- ... well congratulations, you ran a NodeJS program!
- To run any NodeJS program just type `node` then the name of the file... That's it!
- **NOTE:** To end a NodeJS program you just type `Ctrl + c` to kill it

## NodeJS Server

This next part is going to break down all the parts of code into creating a server, feel free to create a new file and build it up part-by-part or feel free to reference the [server](./server.js) code right away.

- [Importing Modules](#importing-modules)
- [Port](#port)
- [Callbacks](#callbacks)
- [Routing HTTP Calls](#routing-http-calls)
- [Starting Server and Event Emitters](#starting-server-and-event-emitters)

### Importing Modules

Just like any language, you expect to use some level of libraries from other people. In NodeJS these are called `modules` and you need to `require` them to use. While there are many great modules using your [node package manager](https://www.npmjs.com/), NodeJS actually already comes with a bunch of really awesome modules which are called the [NodeJS APIs](https://nodejs.org/dist/latest-v8.x/docs/api/)

- The first line of code we will write is: `const http = require('http');`
- The variable `const http` is now a reference to all the functionality offered in the [NodeJS HTTP Module](https://nodejs.org/dist/latest-v8.x/docs/api/http.html)
- By calling `require('http')` we tell NodeJS to load this module before it runs

### Port

Every computer has 65536 TCP Ports it can use to interact with other computers. Instead of trying to confuse anyway just remember these few facts:

- Ports can be between 0 - 65535
- Ports under 1024 are reserved
- Port 80 is the default HTTP port

Other then that the port number is completely arbitrary!

- In this example we will be using `const port = 3000;` to set our server port to 3000

### Callbacks

One of the **Biggest** concept to understand when doing backend code is the idea of `callbacks` or `asynchronous` programming!

![Callback diagram](/images/callbacks.png)

In this image, we see a call like `Make_HTTP_Request()` can take awhile since it depends on other factors outside computation of the CPU. HTTP Request are the perfect example of an asynchronous callback as we want to run the `Print_HTTP()` function whenever we get the HTTP Response. 

```
http.get('http://nodejs.org/dist/index.json', (res) => {
	// response contains array of node versions metadata
	res.setEncoding('utf8');
	let rawData = '';
	res.on('data', (chunk) => { rawData += chunk; });
	// Called when it has finished a GET request
	res.on('end', () => {
		const parsedData = JSON.parse(rawData);
		console.log("The newest version of NodeJS is", parsedData[0].version);
	});
});

console.log('This line is after the http.get function call!');
```

**Let's break down this code line by line!**

- `http.get('http://nodejs.org/dist/index.json', (res) => {`
	- To understand what the `http.get` call does, one should reference the documentation
		- It is a *great* skill to learn how to read documentations
	- ![httt_get_node_api](/images/httt_get_node_api.png)
	- First note that any parameters in the `[ ]` brackets means that it is optional
	- The first parameter. **options**, can take a URL
		- Use your browser and try the [URL to see the data it returns](http://nodejs.org/dist/index.json)
	- The `(res) => {` is the **callback** and is the function that will be called *when* the get request is sent back
- `res.setEncoding('utf8');`
	- The just makes sure we don't get some random encoding your computer may default to
- `let rawData = '';`
	- We are going to manually append the string of data to a string
		- If this starts to seems like a lot of work, then you will really appreciate the Express.js framework in the next workshop! But bare with me for now
- `res.on('data', (chunk) => { rawData += chunk; });`
	- This is an `EventEmitter` which says whenever data is sent in chunks to append it to our string
- `res.on('end', () => { const parsedData = JSON.parse(rawData);`
	- This event is when we have finally finished getting all the chunks and we call `JSON.parse()` to turn the data from a string to a JSON variable
- `console.log("The newest version of NodeJS is", parsedData[0].version);`
	- `parsedData` is an array of JSON objects and we grab the first one and check the `version` field
- `console.log('This line is after the http.get function call!');`
	- The big thing to also notice is the code that was under the `http.get` function is printed after since `http.get` is an asynchronous call. This means you need to be aware as a backend developer if certain data is dependent of an asynchronous function.

So let's be real, this whole  `http.get('http://nodejs.org/dist/index.json', (res) => {` syntax kinda makes no sense, like what is this `=>` doing... well let's recode this block of code up

```
http.get('http://nodejs.org/dist/index.json', onReturn);

console.log('This line is after the http.get function call!');

function onReturn(res) {
	// response contains array of node versions metadata
	res.setEncoding('utf8');
	let rawData = '';
	res.on('data', (chunk) => { rawData += chunk; });
	// Called when it has finished a GET request
	res.on('end', () => {
		const parsedData = JSON.parse(rawData);
		console.log('The newest version of NodeJS is', parsedData[0].version);
	});
}
```

Note that **ALL** I did was create a function called `onReturn` and called it instead of using the `(res) => {}` notation.  The reason for this is the fact if you are just calling this function once it's a waste to declare it elsewhere. This inline function calling is **very** common in code around the internet

- Fair warning you might also see the ES5 notation which they call `function(res){}` instead of `(res) => {}`

### Routing HTTP Calls

So the fundamental part of writing a backend is creating a set of `routes`. These `routes` are how handle the various request coming in and figure out if the request is a GET, POST, etc. and the path of the URL. This is not a *hard* task, but it becomes a lot of code really quick. Most people do not create their own routing framework and use a popular framework such as Express.js, Koa.js, Vue.js, etc. We will be using Express.js in the next workshop so don't waste to much brain matter on this next set of code, just realize that if **could** be all done with just the built in NodeJS libraries if really wanted to

```
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});
```

**Let's break this down**

- `const server = http.createServer((req, res) => {`
	- This is a special function for the `http` library and it will make our `const server` variable an instance of the [http.Server](https://nodejs.org/api/http.html#http_class_http_server) type
- `(req, res)`
	- This stands for `(request, response)` but to save yourself from a lot of typing, people will short-hand these two words
- `res.statusCode = 200;`
	- We are telling it that we will return a status code of 200 which means everything worked
- `res.setHeader('Content-Type', 'text/plain');`
	- We also need to let the client getting the response know its text and not JSON
- `res.end('Hello World\n');`
	- We send our response message
- **Note:** that this callback is called **everytime** someone makes any HTTP request to our server for this code example.
- **Note:** we have not *started* our server yet, we just said what to do when someone calls it.
 and Event Emitters

So to start the server is actually just one more line of code

```
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
```

Let's first take a dive into what is going on with `server.listen()` by looking up the [http.Server listen event doc](https://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback) (Note that there are 3 overload methods for this event)

![http server doc](/images/http_server_doc.png)

We are passing both the optional `port` and `callback` parameter. The callback is there let use know where the server has started.

### All together

So to for reference of what the code should look like check [here](./server.js), but let's run this code and try it all out as one

- Run `node server.js`
	- or the name of the file you created
- Open your browser to [http://localhost:3000](http://localhost:3000)
	- If you changed the port number just substitute that instead
- You will see your browser getting the response from your code
	- `res.end("Hello World\n");
- To terminate your server just type `Ctrl + c`
- Congratulations, you complete your first NodeJS server
- Feel free to mess around and experiment with the code as well!
- Time to move on to the [Express.js Workshop](/ExpressJS_Workshop) to learn how to make NodeJS a powerful routing backend