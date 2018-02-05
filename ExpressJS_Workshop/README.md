# ExpressJS Workshop

This example shows more about using NodeJS and using ExpressJS to use the [ejs](http://ejs.co/) template engine

## How to run

1. Open terminal and `cd` to the directory
2. run `npm install`
3. run `node server.js`

* Go to `http://localhost:3000/` for static page
* Go to `http://localhost:3000/date` to get the current date string.
* Go to `http://localhost:3000/color/red` for a red background page
	* You can put any color inplace for `red`, try `color/blue`

## How it works

[Express.js](https://expressjs.com/) is one of the largest used frameworks for Node.JS as it allows creating "routes" super easy.

To use Express.js all you need to do is first install it with `npm install express`, but if you did `npm install` then you are good to go. Here is the 3 lines we use to setup Express in the `server.js` file

```
const express = require('express');
const app = express();
const server = require('http').createServer(app);
```

We first include Express and call it `express` for simplicty. Then we create an instance of Express and call it `app`. Next to start the server we pass the Express instance with `.createServer(app)`.

## Setup template engine

To setup an Express template engine we run these two linse

- `app.set('views', './views');` This where in root directory the find files which is the `views/` folder in our case
- `app.set('view engine', 'ejs');` This says which engine being used. We are using [ejs](http://ejs.co/) so you will need to run `npm install ejs` if you didn't run `npm install` above.

This line is here to save where to put non-template engine files. Ultimatly the `.ejs` file gets loaded as if it was from the `public/` folder.
`app.use(express.static(path.join(__dirname, 'public')));`
