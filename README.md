# API Filter 
API Filter is a project develped in Node.js that consume a endpoint from mocky and filter the response by diferentes parameters

## Requirements and Installation
* Developed with node version: 14.12.0

Use npm to install node_modules neccesaries.
```bash
npm install
```

## Execute and Test
Use npm start to start the server
```bash
npm start
```

Use npm test to start mocha test
```bash
npm test
```

### Port in use
You can change the port for any that you want. 
Inside the file index.js, the port is specified by:
`const port = process.env.NODE_ENV || 3000;`

## How to use
The API shows the products of a list from an endpoint

* Without filter
    `localhost:3000/`
    `localhost:3000/filter`

