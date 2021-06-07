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

##### Port in use
You can change the port for any that you want. 
Inside the file index.js, the port is specified by:

`const port = process.env.NODE_ENV || 3000;`

## How to use
The API shows the products of a list from an endpoint

* Without filter
`http://localhost:3000/ or
http://localhost:3000/filter`

* With filter
    - size: you can specify (small|medium|large)
    - minprice: showing products with min price
    - maxprice: showing products with max price
    - highlight: will remark words with tag `<em>`

##### Examples
* `http://localhost:3000/filter?maxprice=20`
* `http://localhost:3000/filter?minprice=10`
* `http://localhost:3000/filter?size=medium`
* `http://localhost:3000/filter?highlight=green,blue,This`
* `http://localhost:3000/filter?minprice=10&maxprice=20&size=medium&highlight=green,blue,This`

##### Result example
```json
{
    "minprice": 10,
    "maxprice": 20,
    "size": "medium",
    "highlight": "green,blue,This",
    "commonWords": [
        "trouser",
        "green",
        "shirt",
        "blue",
        "hat",
        "red",
        "shirt.",
        "hat.",
        "shoe.",
        "belt."
    ],
    "products": [
        {
            "title": "A Red Trouser",
            "price": 10,
            "sizes": [
                "small",
                "medium",
                "large"
            ],
            "description": "<em>This</em> trouser perfectly pairs with a <em>green</em> shirt."
        },
        {
            "title": "A Green Shirt",
            "price": 10,
            "sizes": [
                "small",
                "medium",
                "large"
            ],
            "description": "<em>This</em> shirt perfectly pairs with a <em>blue</em> hat."
        }
    ]
}
       
```

