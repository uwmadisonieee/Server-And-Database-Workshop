# Server and Database Workshop

This is a step by step guide how to get up and running with Servers and Database. We will be using Node.js and MongoDB to run our server and store data.

## The Workshop

There is a ton of information to break down so this workshop is broken down to 3 parts

1. [Node.js workshop](./NodeJS_Workshop)
2. [Express.js workshop](./ExpressJS_Workshop) (Under Contruction)
3. [MongoDB workshop](./MongoDB_Workshop) (Under Contruction)

## Things to Install

As with anything, you will need certain software downloaded to work with, luckily its not as bad as it looks at first

- [NodeJS](#nodejs)
- [Postman](#postman)
- [MongoDB](#mongodb)
- [MongoChef](#mongochef)

### NodeJS 

> Need for all Workshops

We need to make sure you have at least version `6.11.0` which supports ES6. This workshop will use version `8.7.0` but anything above `6.11.0` for our purposes will be just fine!

#### Windows/Mac
	
1. Go to [NodeJS Download Page](https://nodejs.org/en/download/) and download it
2. Install
3. Open terminal (Command prompt for Windows) and type `node -v` and you should see a version

- If on Windows, you will also need to make sure `C:\Program Files\nodejs\` is included in your [Enviroment path](https://stackoverflow.com/questions/27864040/fixing-npm-path-in-windows-8/32159233)
	- Note: The file path may vary for users
- If on Windows, you need to close and reopen command prompt to see effect

#### Linux
	
1. Follow the [package manager guide](https://nodejs.org/en/download/package-manager/) for your respected version of Linux

### Postman

> Need just for Express.JS and MongoDB Workshop

[Postman](https://www.getpostman.com/) is a tool used to call HTTP Request and see the response. This will be used to test that our server is correctly handling all various HTTP Request.

### MongoDB

> Need just for MongoDB Workshop

When you download MongoDB you actually get a few different executables, we are worrying about just two: `mongod` and `mongo`

1. [Download and install MongoDB](https://www.mongodb.com/download-center#community)
	- For headless Linux you can run `sudo apt-get install mongodb-server` 
2. Run `mongod --version` to confirm it install correctly

- If on Windows, make sure add path to MongoDB to system enviroment variables and restart the command prompt
		- Location will be similar to `C:\Program Files\MongoDB\Server\3.0\bin\`

#### Test MongoDB is running
	
**NOTE** MongoDB defaults its saved file path to `/data/db` (or `C:\data\db` for Windows). **Create** this folder unless you plan to change the path in the MongoDB configuration. If you don't do this MongoDB will complain and not start up!

- Open a terminal or command prompt and type `mongod`
	- You might have to use `sudo` if Mac/Linux
- In a second terminal run `mongo` and it should open a Mongo Shell
- Run:
	- `show dbs`
	- `use Test`
	- `db.TestCollection.insert({"hello":"world"})`
	- `db.TestCollection.find()`
- If this worked then you have a working MongoDB and to start it you just need to have `mongod` running in background

### Robomongo (Robo 3T)

> Need just for MongoDB Workshop

Command line shells are good to learn, but for sake of simplicity we will just use a GUI to interact with our database. [Robomongo](https://robomongo.org/) is by far the nicest MongoDB GUI I know about and easy to [download and install.](https://robomongo.org/)
