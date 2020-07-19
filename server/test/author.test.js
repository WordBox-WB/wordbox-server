const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp);
chai.should();
const port = "http://localhost:4000"

describe("AUTHOR TESTING", () => {
    describe("GET /api/v1/authors", () => {
        //Test to get all posts
        it("should not get all authors if array is empty", (done) => {
             chai.request(port)
                 .get('/api/v1/authors')
                 .end((err, success) => {
                     success.should.have.status(400);
                     success.body.should.be.a('object');
                     console.log(success.statusCode)
                     console.log(success.body.success)
                     done();
                });
         });

         it("should get a single post", (done) => {
            let id = "5f0d72e6d04dda2b081ed67b"
            chai.request(port)
                .get(`/api/v1/post/${id}`)
                .end((err, success) => {
                    success.should.have.status(200);
                    success.body.should.be.a('object');
                    console.log(success.statusCode)
                    console.log(success.body.success)
                    done();
               });
        });

    });

    describe("POST /api/v1/author", () => {
        it("should not register new author without complete credentials", (done) => {
            let author = {
                name: "author1 testing",
                email: "author1@gmail.com"
            }
            chai.request(port)
                .post(`/api/v1/author`)
                .send(author)
                .end((err, success) => {
                    success.should.have.status(400)
                    success.body.should.be.a('object')
                    console.log(success.statusCode)
                    console.log(success.body.success)
                    done()
                })
        })

        it("should register new author with complete credentials", (done) => {
            let author = {
                name: "author1 testing",
                email: "author1@gmail.com",
                password: "123456"
            }
            chai.request(port)
                .post(`/api/v1/author`)
                .send(author)
                .end((err, success) => {
                    success.should.have.status(201)
                    success.body.should.be.a('object')
                    console.log(success.statusCode)
                    console.log(success.body.success)
                    done()
                })
        })
    })
})
