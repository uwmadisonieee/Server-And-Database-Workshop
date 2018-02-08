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

This line is here to save where to put non-template engine files. Ultimatly the `.ejs` file gets loaded as if it was a `.html` file from the `public/` folder.
`app.use(express.static(path.join(__dirname, 'public')));`

## Static site

As mentioned above, you can directly access anything in the `public/` folder as normal. There is currently a very basic `index.hmtl` and `main.js` file. To view them run the server and then got to `http://localhost:3000/`.

To view the photo you can go to `http://localhost:3000/IEEE.png`

## Basic route

The first route we have is from the `server.js` file

```
app.get('/date', function(req, res, next) {

    var date = (new Date()).toString();

	return res.status(200).send(date);
});
```

The first thing to notice is `.get('/date'`. This is tell us that when we call a HTTP GET Requst to `/date` we will run this function.

Also not that `/date` is really `http://localhost:3000/date` because all paths are relative to the root URL path

With **every** route there are 2 arguments we need

- `req` - This our **request** value. This is a json object containing information about the HTTP Request we got that triggered this.
- `res` - This is our **response** value. This is how we will be able to send back a response to the request we just got.

First we populate `var date` with the current date for this example. Then to send the data back we run `res.status(200).send(date);`. This says "Send the person who requested `/date` the value of `var data` and let them know it was successful with a 200 status"

## Returning Template Engine

So there a few moving parts here so lets take it step by step.

First notice the file in `views/color.ejs`. It is bacially a standard HTML file except we have `<%= message %>` and `<%= backColor %>`. Our goal is to have these values replaced on the server before we send this a HTML file.

Going back to `server.js` we see `app.get('/color/:color', function(req, res) {`. This is the same idea as the date example except we add a "paramter" option with `:color`. What this is saying is we will take the value passed in the URL and it will be saved in `req.params.color`.

This means if we would call `http://localhost:3000/color/red` then `req.params.color == red`

Now instead of calling `res.send()` we call `res.render()` which takes the template information we set before. By passing in `res.render('color')` we are telling it to look for the `color` file inside the `views/` folder since we set `views/` in the `app.set('views', './views');` line above.

Take the `color.ejs` file now it will take a json object and it will go through the `color.ejs` file looking for `<%= message %>` and replace it with `"Server is up and running"`. It now does the same thing with the `backColor` variable.


## Server settings

To start the server we call `server.listen(port);` which will do the work and get the server going.

By calling `server.on('error', onError);` and `server.on('listening', onListening);` we are telling it to run the two functions `onError()` and `onListening()` when the server runs one of the two events it has.