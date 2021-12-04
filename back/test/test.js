//During the test the env variable is set to test
process.env.DB_URL = "test";

let db = require("../src/db");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../src/app");
//let should = chai.should();

chai.use(chaiHttp);
/*
 * Test the /GET route
 */
describe("/GET orders", () => {
    it("it should GET all the books", (done) => {
        chai.request(app)
            .get("/orders")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                done();
            });
    });
});
