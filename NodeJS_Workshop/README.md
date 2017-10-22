
# NodeJS Workshop

This workshop is to **quick** teach you about NodeJS. This is by no means a full tutorial, but the goal is teach you the main concepts you may be new to learning how to run a backend.

## What is NodeJS

Every language needs a way to compile to code and run it. For javascript each browser has its own "engine" which is really for our purpose the "compiler". Chrome's engine, the V8 Engine, is what runs NodeJS... so really this means you can now just run your javascript code in your terminal and not a browser. NodeJS offers a set of built in modules/libraries for servers use cases and this bundled with a javascript engine is all NodeJS really is.

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

## NodeJS Server

This next part is going to break down all the parts of code into creating a server, feel free to create a new file and build it up part-by-part or feel free to reference the [server](./server.js) code right away.

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