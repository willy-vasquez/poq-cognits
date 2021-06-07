const app = require('../');
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

/*
 * Test the / and /filter route
*/
describe('Testing to get all products',() =>{
    it(' / => should GET all the products', (done) =>{
        chai.request(app)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
            chai.expect(res.body).should.be.a('Object');
            chai.expect(res.body).have.property('size');
            chai.expect(res.body).have.property('minprice');
            chai.expect(res.body).have.property('maxprice');
            chai.expect(res.body).have.property('commonWords');
            chai.expect(res.body).have.property('products');
            chai.expect(res.body).length.should.not.be.eql(0);
            done();
        });
    });

    it(' /filter => should GET all the products', (done) =>{
        chai.request(app)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
            chai.expect(res.body).should.be.a('Object');
            chai.expect(res.body).have.property('size');
            chai.expect(res.body).have.property('minprice');
            chai.expect(res.body).have.property('maxprice');
            chai.expect(res.body).have.property('commonWords');
            chai.expect(res.body).have.property('products');
            chai.expect(res.body).length.should.not.be.eql(0);
            done();
        });
    });
});

/*
 * Test filters for products
*/
describe('Testing filters', () => {
    
    it('getting products with min price', (done) => {
        chai.request(app)
        .get('/filter?minprice=10')
        .end((err,res) => {
            res.should.have.status(200);
            chai.expect(res.body).have.property('minprice').eql(10);
            chai.expect(res.body).length.should.not.be.eql(0);
            done();
        });
    });

    it('getting products with max price', (done) => {
        chai.request(app)
        .get('/filter?maxprice=25')
        .end((err,res) => {
            res.should.have.status(200);
            chai.expect(res.body).have.property('maxprice').eql(25);
            chai.expect(res.body).length.should.not.be.eql(0);
            done();
        });
    });

    it('getting products with min and max price', (done) => {
        chai.request(app)
        .get('/filter?minprice=20&maxprice=25')
        .end((err,res) => {
            res.should.have.status(200);
            chai.expect(res.body).have.property('minprice').eql(20);
            chai.expect(res.body).have.property('maxprice').eql(25);
            chai.expect(res.body).length.should.not.be.eql(0);
            done();
        });
    });

    it('getting products by size', (done) => {
        chai.request(app)
        .get('/filter?size=small')
        .end((err,res) => {
            res.should.have.status(200);
            chai.expect(res.body).have.property('size').eql('small');
            chai.expect(res.body).length.should.not.be.eql(0);
            chai.expect(() => {
                let findingSize = res.body.products.filter(
                    product => product.sizes.includes('small') && product.sizes.length >= 1
                    );
                if(findingSize.length == 0) throw new Error
            }).to.not.throw();
            done();
        });
    });

    it('getting products with price between 20 and 25  and size medium', (done) => {
        chai.request(app)
        .get('/filter?minprice=20&maxprice=25&size=medium')
        .end((err,res) => {
            res.should.have.status(200);
            chai.expect(res.body).have.property('minprice').eql(20);
            chai.expect(res.body).have.property('maxprice').eql(25);
            chai.expect(res.body).have.property('size').eql('medium');
            chai.expect(res.body).length.should.not.be.eql(0);
            chai.expect(() => {
                let findingSize = res.body.products.filter(
                    product => product.sizes.includes('medium') && product.sizes.length >= 1
                    );
                if(findingSize.length == 0) throw new Error
            }).to.not.throw();
            done();
        });
    });

    it('highlighting description with word  This', (done) => {
        chai.request(app)
        .get('/filter?highlight=This')
        .end((err,res) => {
            res.should.have.status(200);
            chai.expect(res.body).have.property('highlight').eql('This');
            chai.expect(res.body).length.should.not.be.eql(0);
            chai.expect(() => {
                let findingHighlights = res.body.products.filter(
                    product => product.description.split(' ').includes('<em>This</em>')
                    );
                if(findingHighlights.length == 0) throw new Error
            }).to.not.throw();
            done();
        });
    });

    it('highlight description with word  trouser', (done) => {
        chai.request(app)
        .get('/filter?highlight=trouser')
        .end((err,res) => {
            res.should.have.status(200);
            chai.expect(res.body).have.property('highlight').eql('trouser');
            chai.expect(res.body).length.should.not.be.eql(0);
            chai.expect(() => {
                let findingHighlights = res.body.products.filter(
                    product => product.description.split(' ').includes('<em>trouser</em>')
                    );
                if(findingHighlights.length == 0) throw new Error
            }).to.not.throw();
            done();
        });
    });
});

/*
 * Test top ten common words
*/
describe('Testing most common words',() =>{
    it('should get an array of 10 with most common words', (done) =>{
        chai.request(app)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
            chai.expect(res.body).should.be.a('Object');
            chai.expect(res.body).length.should.not.be.eql(0);
            chai.expect(res.body).have.property('commonWords').to.have.lengthOf(10);
            done();
        });
    });
});