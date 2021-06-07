
const axios = require('axios');

const getFilterProducts = async (req, res) => {
    try{
        let {
            maxprice,
            minprice,
            size,
            highlight
        } = req.query;

        let { data: { products } } = await getProducts();
        
        if(products){
            //sorting asc by price
            products = products.sort((item1,item2) => item1.price - item2.price);
        
            //getting min n max price from parameters
            minprice = minprice == undefined ? products[0].price : +minprice;
            maxprice = maxprice == undefined ? products[products.length - 1].price : +maxprice;

            //filter producst by price
            products = products.filter(item => item.price <= maxprice && item.price >= minprice);

            //filter products by size
            products = size == undefined ? products : products.filter(function(item){
                return item.sizes.includes(size) ? item : false;
            });

            //most common words
            let commonWords = mostCommonWords(products);

            //highlighting description
            products = highlight == undefined ? products : products.map(product => highlightProducts(product, highlight));
           
            //getting sizes
            size = size != undefined ? size : getSizes(products);

            let hasProducts = products.length > 0 ? products : 'no products listed';
            products = {
                minprice,
                maxprice,
                size,
                highlight,
                commonWords,
                "products": hasProducts 
            }
            res.json(products);
            return ;
        }
        
    }catch(error){
        res.status(500).json({
            errorCode: '500',
            message: 'Internal error',
            description: error
        });
    }
}

const getProducts = async () => {
    try{
        const products = await axios.get('http://www.mocky.io/v2/5e307edf3200005d00858b49');
        return products;
    }catch(e){
        return {};
    }
};

const highlightProducts = (product, highlight) => {
    let highlightArray = highlight.split(',');
    let description = product.description.split(' ');
    
    highlightArray.forEach(word => {
        if(description.includes(word)){
            description[description.indexOf(word)] ='<em>'+ word +'</em>';
        }
    });
    product.description = description.join(' ');
    return product;
};

const getSizes = (products) =>{
    let sizes = new Set();
	products.forEach((item) => {
		item.sizes.forEach((size) => sizes.add(size))
	});
    return [...sizes].join(",");
}

function mostCommonWords (products) {
    //saving words = [{ word: 'shoes', count: 1},...]
    let words = [];
    products.forEach(product => {
        let description = product.description.split(' ');
        description.forEach(word => {
            if(!hasWord(words, word))
                words.push({word : word, count: 1});
        });
    });

    words.sort((item1, item2) => item2.count - item1.count);
    words = words.slice(5,15).map(item => item.word);
    return words;
}

const hasWord = (words, word) => {
    for (const element of words) {
        if(element.word == word){
            //adding count if word exist
            element.count++;
            return true;
        }
    }
    return false;
};

module.exports = getFilterProducts;