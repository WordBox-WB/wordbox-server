const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp);
chai.should();
const port = "http://localhost:4000"

describe("POST TESTING", () => {
    describe("GET /api/v1/posts", () => {
        // Test to get all posts
        it("should get all posts", (done) => {
             chai.request(port)
                 .get('/api/v1/posts')
                 .end((err, success) => {
                     success.should.have.status(200);
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

    describe("POST /api/v1/post/create/:authorId", () => {
        it("should not create new post without valid author id", (done) => {
            let authorId = "5f0d72e6d04dda2b081ed67b"
            let posts = {
                title: "unit testing",
                content: "unit testing 1"
            }
            chai.request(port)
                .post(`/api/v1/post/create/${authorId}`)
                .send(posts)
                .end((err, success) => {
                    success.should.have.status(400)
                    success.body.should.be.a('object')
                    console.log(success.statusCode)
                    console.log(success.body.success)
                    done()
                })
        })

        it("should not create new post without complete data", (done) => {
            let authorId = "5f1159fbce0efe211cfa82ed"
            let posts = {
                title: "unit testing"
            }
            chai.request(port)
                .post(`/api/v1/post/create/${authorId}`)
                .send(posts)
                .end((err, success) => {
                    success.should.have.status(400)
                    success.body.should.be.a('object')
                    console.log(success.statusCode)
                    console.log(success.body.success)
                    done()
                })
        })

        it("should create new post without complete data", (done) => {
            let authorId = "5f1159fbce0efe211cfa82ed"
            let posts = {
                title: "unit testing 1",
                content: "Unit one testing by author1"
            }
            chai.request(port)
                .post(`/api/v1/post/create/${authorId}`)
                .send(posts)
                .end((err, success) => {
                    success.should.have.status(201)
                    success.body.should.be.a('object')
                    console.log(success.statusCode)
                    console.log(success.body.success)
                    done()
                })
        })
    })

    describe("UPDATE POST /api/v1/update/post/:id", () => {
        it("should not update post if no valid id", (done) => {
            let id = "5f0d7396d04dda2b081ed67c"
            let update_post = {
                title: "unit testing 1 updated"
            }
            chai.request(port)
                .put(`/api/v1/update/post/${id}`)
                .send(update_post)
                .end((err, success) => {
                    success.should.have.status(400)
                    success.body.should.be.a('object')
                    console.log(success.statusCode)
                    console.log(success.body.success)
                    done()

                })
        })

        it("should update post with valid id", (done) => {
            let id = "5f115e74ce0efe211cfa82f3"
            let update_post = {
                title: "unit testing 1 updated"
            }
            chai.request(port)
                .put(`/api/v1/update/post/${id}`)
                .send(update_post)
                .end((err, success) => {
                    success.should.have.status(200)
                    success.body.should.be.a('object')
                    console.log(success.statusCode)
                    console.log(success.body.success)
                    done()
                })
        })
    })

    describe("DELETE POST /api/v1/delete/post/:id", () => {
        it("should not delete if id is invalid", (done) => {
            let id = "5f0d7396d04dda2b081ed67c"
            chai.request(port)
                .delete(`/api/v1/delete/post/${id}`)
                .end((err, success) => {
                    success.should.have.status(400)
                    success.body.should.be.a('object')
                    console.log(success.statusCode)
                    console.log(success.body.success)
                    done()
                })
        })

        it("should delete if id is valid", (done) => {
            let id = "5f0d7396d04dda2b081ed67c"
            chai.request(port)
                .delete(`/api/v1/delete/post/${id}`)
                .end((err, success) => {
                    success.should.have.status(200)
                    success.body.should.be.a('object')
                    console.log(success.statusCode)
                    console.log(success.body.success)
                    done()
                })
        })
    })
})
