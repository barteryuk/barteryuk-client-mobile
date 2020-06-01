const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const expect = require('chai').expect
const User = require('../models/user')
const Product = require('../models/product')
chai.use(chaiHttp)


describe('TDD test', function () {
    let token;
    let tokenNonAdmin;
    let productId;

    //HOOKS
    before(function () {
        return User.deleteMany({})
    })
    before(function () {
        return Product.deleteMany({})
    })

    describe('USER test', function () {

        it('user register success', function (done) {
            let body = {
                email: 'test@gmail.com',
                password: 'test',
                username: 'test',
                admin: true
            }
            chai.request(app)
                .post('/user/register')
                .send(body)
                .end(function (err, res) {
                    let user = res.body.createdUser
                    expect(user).to.be.an('Object')
                    expect(user.password).to.be.not.equals(body.password)
                    expect(user).to.have.property('email')
                    expect(user).to.have.property('password')
                    expect(user).to.have.property('username')
                    expect(user).to.have.property('cart')
                    expect(user).to.have.property('admin')
                    done()
                })
        })

        it('user register success non admin', function (done) {
            let body = {
                email: 'test2@gmail.com',
                password: 'test2',
                username: 'test2',
            }
            chai.request(app)
                .post('/user/register')
                .send(body)
                .end(function (err, res) {
                    let user = res.body.createdUser
                    expect(user).to.be.an('Object')
                    expect(user.password).to.be.not.equals(body.password)
                    expect(user).to.have.property('email')
                    expect(user).to.have.property('password')
                    expect(user).to.have.property('username')
                    expect(user).to.have.property('cart')
                    expect(user).to.have.property('admin')
                    done()
                })
        })

        it('user register fail', function (done) {
            let body = {
                email: 'testgmail.com'
            }
            chai.request(app)
                .post('/user/register')
                .send(body)
                .end(function (err, res) {
                    expect(res).to.have.status(422)
                    expect(res.body.message[0]).to.be.equals('username is required')
                    expect(res.body.message[1]).to.be.equals('Please fill a valid email address')
                    expect(res.body.message[2]).to.be.equals('password is required')
                    expect(res.body.message).to.be.an('Array')
                    done()
                })
        })

        it('user login success', function (done) {
            let body = {
                email: "test@gmail.com",
                password: "test"
            }
            chai.request(app)
                .post('/user/login')
                .send(body)
                .end(function (err, res) {
                    token = res.body.token
                    let user = res.body.user
                    expect(token).to.be.a('String')
                    expect(user).to.be.an('Object')
                    expect(user).to.have.property('username')
                    expect(user).to.have.property('email')
                    expect(user).to.have.property('cart')
                    done()
                })
        })

        it('user login success', function (done) {
            let body = {
                email: "test2@gmail.com",
                password: "test2"
            }
            chai.request(app)
                .post('/user/login')
                .send(body)
                .end(function (err, res) {
                    tokenNonAdmin = res.body.token
                    let user = res.body.user
                    expect(token).to.be.a('String')
                    expect(user).to.be.an('Object')
                    expect(user).to.have.property('username')
                    expect(user).to.have.property('email')
                    expect(user).to.have.property('cart')
                    done()
                })
        })

        it('user login fail', function (done) {
            let body = {
                email: "hello@gmail.com",
                password: "test"
            }
            chai.request(app)
                .post('/user/login')
                .send(body)
                .end(function (err, res) {
                    let message = res.body.message
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('wrong email/password')
                    done()
                })
        })
    })
    
    describe('PRODUCT test', function () {

        it('create product success', function (done) {
            let body = {
                name: 'test',
                qty: 10,
                description: 'String, min: 50, max: 150, required',
                price: 5000,
                categories: 'test'
            }
            let headers = { token }

            chai.request(app)
                .post('/product')
                .send(body)
                .set(headers)
                .end(function (err, res) {
                    let product = res.body
                    productId = product._id
                    expect(product).to.have.property('name')
                    expect(product).to.have.property('qty')
                    expect(product).to.have.property('description')
                    expect(product).to.have.property('image')
                    expect(product).to.have.property('category')
                    expect(product).to.have.property('price')
                    expect(product.name).to.be.a('String')
                    expect(product.description).to.be.a('String')
                    expect(product.image).to.be.a('String')
                    expect(product.category).to.be.a('String')
                    expect(product.qty).to.be.a('Number')
                    expect(product.price).to.be.a('Number')
                    done()
                })
        })

        it('create product fail', function (done) {
            let body = {
                price: 'hello',
                name: 2000
            }
            let headers = { token }
            chai.request(app)
                .post('/product')
                .send(body)
                .set(headers)
                .end(function (err, res) {
                    let error = res.body.message
                    expect(error).to.be.an('Array')
                    expect(error[1]).to.be.equals('product required description')
                    expect(error[2]).to.be.equals('product required category')
                    done()
                })
        })

        it('create product fail because token', function (done) {
            let body = {
                price: 'hello',
                name: 2000
            }
            let headers = { token: 'sjdka92839283asljdslj' }
            chai.request(app)
                .post('/product')
                .send(body)
                .set(headers)
                .end(function (err, res) {
                    let error = res.body.message
                    expect(error).to.be.a('String')
                    expect(error).to.be.equals('authentication error')
                    done()
                })
        })
        
        it('create product fail because token non admin', function (done) {
            let body = {
                price: 'hello',
                name: 2000
            }
            let headers = { token: tokenNonAdmin }
            chai.request(app)
                .post('/product')
                .send(body)
                .set(headers)
                .end(function (err, res) {
                    let error = res.body.message
                    expect(error).to.be.a('String')
                    expect(error).to.be.equals('authorization error')
                    done()
                })
        })

        it('show products success', function (done) {
            chai.request(app)
                .get('/product')
                .end(function (err, res) {
                    let products = res.body
                    expect(products).to.be.an('Array')
                    products.forEach(product => {
                        expect(product).to.have.property('name')
                        expect(product).to.have.property('qty')
                        expect(product).to.have.property('description')
                        expect(product).to.have.property('image')
                        expect(product).to.have.property('category')
                        expect(product).to.have.property('price')
                        expect(product.name).to.be.a('String')
                        expect(product.description).to.be.a('String')
                        expect(product.image).to.be.a('String')
                        expect(product.category).to.be.a('String')
                        expect(product.qty).to.be.a('Number')
                        expect(product.price).to.be.a('Number')
                    });
                    done()
                })
        })

        it('show product success', function (done) {
            chai.request(app)
                .get(`/product/${productId}`)
                .end(function (err, res) {
                    let product = res.body
                    expect(product).to.have.property('name')
                    expect(product).to.have.property('qty')
                    expect(product).to.have.property('description')
                    expect(product).to.have.property('image')
                    expect(product).to.have.property('category')
                    expect(product).to.have.property('price')
                    expect(product.name).to.be.a('String')
                    expect(product.description).to.be.a('String')
                    expect(product.image).to.be.a('String')
                    expect(product.category).to.be.a('String')
                    expect(product.qty).to.be.a('Number')
                    expect(product.price).to.be.a('Number')
                    done()
                })
        })

        it('show product if product is not exist', function (done) {
            chai.request(app)
                .get(`/product/RANDOM_ID`)
                .end(function (err, res) {
                    let error = res.body.message
                    expect(error).to.be.a('String')
                    expect(error).to.be.equals('data not found')
                    done()
                })
        })

        it('update product success', function(done){
            let body = {
                name : 'Update Name',
                qty : 2903,
                description : 'Update Description',
                price : 2,
                image : 'UpdateImageLink',
                category : 'Update Category'
            }
            let headers = { token }
            chai.request(app)
            .patch(`/product/${productId}`)
            .set(headers)
            .send(body)
            .end(function(err,res){
                let response = res.body.message
                expect(res).to.have.status(200)
                expect(response).to.be.a('String')
                expect(response).to.be.equals('successfully updated product')
                done()
            })
        })

        it('update product fail', function(done){
            let body = {
                name : 'Update Name FAIL',
                qty : 404,
                description : 'Update Description FAIL',
                price : 404,
                image : 'UpdateImageLink FAIL',
                category : 'Update Category FAIL'
            }
            let headers = { token }
            chai.request(app)
                .patch(`/product/RANDOM_PRODUCT_ID`)
                .set(headers)
                .end(function (err, res) {
                    let error = res.body.message
                    expect(res).to.have.status(404)
                    expect(error).to.be.equals('data not found')
                    expect(error).to.be.a('String')
                    done()
                })
        })

        it('update product fail because token', function(done){
            let body = {
                name : 'Update Name FAIL',
                qty : 404,
                description : 'Update Description FAIL',
                price : 404,
                image : 'UpdateImageLink FAIL',
                category : 'Update Category FAIL'
            }
            let headers = { token : 'SOMERANDOMTOKEN' }
            chai.request(app)
                .patch(`/product/RANDOM_PRODUCT_ID`)
                .set(headers)
                .end(function (err, res) {
                    let error = res.body.message
                    expect(res).to.have.status(403)
                    expect(error).to.be.equals('authentication error')
                    expect(error).to.be.a('String')
                    done()
                })
        })

        it('update product fail because token non admin', function(done){
            let body = {
                name : 'Update Name FAIL',
                qty : 404,
                description : 'Update Description FAIL',
                price : 404,
                image : 'UpdateImageLink FAIL',
                category : 'Update Category FAIL'
            }
            let headers = { token : tokenNonAdmin }
            chai.request(app)
                .patch(`/product/RANDOM_PRODUCT_ID`)
                .set(headers)
                .end(function (err, res) {
                    let error = res.body.message
                    expect(res).to.have.status(403)
                    expect(error).to.be.equals('authorization error')
                    expect(error).to.be.a('String')
                    done()
                })
        })

        it('show product success', function (done) {
            chai.request(app)
                .get(`/product/${productId}`)
                .end(function (err, res) {
                    let product = res.body
                    expect(product).to.have.property('name')
                    expect(product).to.have.property('qty')
                    expect(product).to.have.property('description')
                    expect(product).to.have.property('image')
                    expect(product).to.have.property('category')
                    expect(product).to.have.property('price')
                    expect(product.name).to.be.a('String')
                    expect(product.description).to.be.a('String')
                    expect(product.image).to.be.a('String')
                    expect(product.category).to.be.a('String')
                    expect(product.qty).to.be.a('Number')
                    expect(product.price).to.be.a('Number')
                    done()
                })
        })

        it('delete product success', function (done) {
            let headers = { token }
            chai.request(app)
                .delete(`/product/${productId}`)
                .set(headers)
                .end(function (err, res) {
                    let response = res.body.message
                    expect(res).to.have.status(200)
                    expect(response).to.be.equals('successfully deleted product')
                    expect(response).to.be.a('String')
                    done()
                })
        })

        it('delete product fail', function (done) {
            let headers = { token }
            chai.request(app)
                .delete(`/product/RANDOM_PRODUCT_ID`)
                .set(headers)
                .end(function (err, res) {
                    let error = res.body.message
                    expect(res).to.have.status(404)
                    expect(error).to.be.equals('data not found')
                    expect(error).to.be.a('String')
                    done()
                })
        })

        it('delete product fail because token', function(done){
            let headers = { token : 'RANDOMTOKENUHUY' }
            chai.request(app)
                .delete(`/product/${productId}`)
                .set(headers)
                .end(function (err, res) {
                    let error = res.body.message
                    expect(res).to.have.status(403)
                    expect(error).to.be.equals('authentication error')
                    expect(error).to.be.a('String')
                    done()
                })
        })

        it('delete product fail because token non admin', function(done){
            let headers = { token : tokenNonAdmin }
            chai.request(app)
                .delete(`/product/${productId}`)
                .set(headers)
                .end(function (err, res) {
                    let error = res.body.message
                    expect(res).to.have.status(403)
                    expect(error).to.be.equals('authorization error')
                    expect(error).to.be.a('String')
                    done()
                })
        })

    })

    describe('add to cart test', function(){
        //SEED PRODUCT
        it('create product success', function (done) {
            let body = {
                name: 'test',
                qty: 10,
                description: 'String, min: 50, max: 150, required',
                price: 5000,
                image: 'imageLink',
                category: 'test'
            }
            let headers = { token }

            chai.request(app)
                .post('/product')
                .send(body)
                .set(headers)
                .end(function (err, res) {
                    let product = res.body
                    productId = product._id
                    expect(product).to.have.property('name')
                    expect(product).to.have.property('qty')
                    expect(product).to.have.property('description')
                    expect(product).to.have.property('image')
                    expect(product).to.have.property('category')
                    expect(product).to.have.property('price')
                    expect(product.name).to.be.a('String')
                    expect(product.description).to.be.a('String')
                    expect(product.image).to.be.a('String')
                    expect(product.category).to.be.a('String')
                    expect(product.qty).to.be.a('Number')
                    expect(product.price).to.be.a('Number')
                    done()
                })
        })

        //USER LOGIN => tokenNonAdmin var // sudah diwakilkan diatas

        //add to cart
        it('add to cart' , function(done){
            let body = {
                productId
            }
            let headers = {
                token: tokenNonAdmin
            }
            chai.request(app)
            .patch('/user/addToCart')
            .send(body)
            .set(headers)
            .end(function(err,res){
                let response = res.body.message
                expect(res).to.have.status(201)
                expect(response).to.be.a('String')
                expect(response).to.be.equals('successfully add product to cart')
                done()
            })
        })

        it('add to cart fail if product not exist' , function(done){
            let headers = {
                token: tokenNonAdmin
            }
            let body = {
                productId : 'kdjasldj8390238aljsdakljdl'
            }
            chai.request(app)
            .patch('/user/addToCart')
            .send(body)
            .set(headers)
            .end(function(err,res){
                let response = res.body.message
                expect(res).to.have.status(404)
                expect(response).to.be.a('String')
                expect(response).to.be.equals('data not found')
                done()
            })
        })

        it('add to cart fail because of token', function(done){
            let headers = {
                token: 'RANDOMTOKENGENERATED'
            }
            let body = {
                productId : 'kdjasldj8390238aljsdakljdl'
            }
            chai.request(app)
            .patch('/user/addToCart')
            .send(body)
            .set(headers)
            .end(function(err,res){
                let response = res.body.message
                expect(res).to.have.status(403)
                expect(response).to.be.a('String')
                expect(response).to.be.equals('authentication error')
                done()
            })
        })
    })

    describe('remove item from cart test', function(){
        
        it('remove from cart success', function(done){
            let body = {
                productId
            }
            let headers = {
                token: tokenNonAdmin
            }
            chai.request(app)
            .patch('/user/removeFromCart')
            .send(body)
            .set(headers)
            .end(function(err,res){
                let response = res.body.message
                expect(res).to.have.status(200)
                expect(response).to.be.a('String')
                expect(response).to.be.equals('successfully removed product from cart')
                done()
            })
        })

        it('remove from cart fail', function(done){
            let headers = {
                token: tokenNonAdmin
            }
            let body = {
                productId : 'kdjasldj8390238aljsdakljdl'
            }
            chai.request(app)
            .patch('/user/removeFromCart')
            .send(body)
            .set(headers)
            .end(function(err,res){
                let response = res.body.message
                expect(res).to.have.status(404)
                expect(response).to.be.a('String')
                expect(response).to.be.equals('data not found')
                done()
            })
        })

        it('remove from cart fail because of token', function(done){
            let headers = {
                token: 'RANDOMTOKENGENERATED'
            }
            let body = {
                productId : 'kdjasldj8390238aljsdakljdl'
            }
            chai.request(app)
            .patch('/user/removeFromCart')
            .send(body)
            .set(headers)
            .end(function(err,res){
                let response = res.body.message
                expect(res).to.have.status(403)
                expect(response).to.be.a('String')
                expect(response).to.be.equals('authentication error')
                done()
            })
        })
    })

    describe('checkout' , function(){
        // seed item to cart
        for(let i = 0; i < 4; i++){
            it('seed item' , function(done){
                let body = {
                    productId
                }
                let headers = {
                    token: tokenNonAdmin
                }
                chai.request(app)
                .patch('/user/addToCart')
                .send(body)
                .set(headers)
                .end(function(err,res){
                    let response = res.body.message
                    expect(res).to.have.status(201)
                    expect(response).to.be.a('String')
                    expect(response).to.be.equals('successfully add product to cart')
                    done()
                })
            })
        }

        //checkout
        it('checkout success' , function(done){
            let headers = {
                token : tokenNonAdmin
            }
            chai.request(app)
            .patch('/user/checkout')
            .set(headers)
            .end(function(err,res){
                let response = res.body.message
                expect(res).to.have.status(200)
                expect(response).to.be.a('String')
                expect(response).to.be.equals('successfully checkout')
                done()
            })
        })

        it('checkout fail - token' , function(done){
            let headers = {
                token : 'RANDOMGENERATEDTOKEN'
            }
            chai.request(app)
            .patch('/user/checkout')
            .set(headers)
            .end(function(err,res){
                let response = res.body.message
                expect(res).to.have.status(403)
                expect(response).to.be.a('String')
                expect(response).to.be.equals('authentication error')
                done()
            })  
        })
        
    })
})