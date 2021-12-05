const dotenv = require("dotenv");
dotenv.config();

//Setting url to my local machine
process.env.DB_URL = process.env.LOCAL_DB_URL;
let chai = require("chai");
let chaiHttp = require("chai-http");
let { app } = require("../src/app");
let should = chai.should();
chai.use(chaiHttp);

describe("Order tests", () => {
    it("return all orders", (done) => {
        chai.request(app)
            .get("/orders")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                done();
            });
    });

    it("order creation", (done) => {
        let body = [
            {
                email: "name@gmail.com",
                name: "John Doe",
                street: "Wallstreet",
                number: 53,
                city: "London",
                psc: 92001,
            },
            { price: 50 },
            {
                id: 1,
                bought: 59,
                name: "Nugget",
                price: "30",
            },
            {
                id: 2,
                bought: 29,
                name: "Arduino",
                price: "50",
            },
        ];
        chai.request(app)
            .post("/orderThings")
            .send(body)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it("return all orders", (done) => {
        chai.request(app)
            .post("/orders/" + 1)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("state");
                res.body.should.have.property("price");
                done();
            });
    });
});
