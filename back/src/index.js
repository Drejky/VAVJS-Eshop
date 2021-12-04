const { app } = require("./app");
const { sequelize } = require("./db.js");
const product = require("./models/product.js");
const order = require("./models/order.js");
const buyer = require("./models/buyer");
const add = require("./models/add");

//Relations
product.belongsToMany(order, { through: "product_order" });
order.belongsToMany(product, { through: "product_order" });
buyer.hasMany(order);
order.belongsTo(buyer);

//setproducts
//setorders

app.get("/products", async (req, res) => {
    const products = await product.findAll();
    res.send(products);
});

app.get("/orders", async (req, res) => {
    const orders = await order.findAll();
    res.send(orders);
});

app.post("/orders/:prID", async (req, res) => {
    const order = await order.findAll({
        where: {
            id: req.params.prID,
        },
    });
    //Add code to change state of order
    res.send(order);
});

//Most complicated enpoind
app.post("/orderThings", async (req, res) => {
    //First check if email already belongs to someone
    //Because there is no login system and email field must be unique
    //I decided to always write the newest order user information down
    let currBuyer = await buyer.findOne({
        where: { email: req.body[0].email },
    });
    //Scenario where user ordered before
    if (currBuyer) {
        currBuyer.set(req.body[0]); //Index 0 is always user
        await currBuyer.save();
    }
    //New user
    else {
        currentBuyer = await buyer.create(req.body[0]);
    }

    //Now create order
    const currOrder = await order.create({
        state: "Unpaid",
        price: req.body[1].price,
    });

    //Now we define the relations
    //All products are listed beyond index 1
    currOrder.setBuyer(currBuyer);
    for (let i = 2; i < req.body.length; i += 1) {
        let tempProduct = await product.findOne({
            where: { id: req.body[i].id },
        });
        currOrder.addProduct(tempProduct, {
            through: { ammount: req.body[i].bought },
        });
    }

    console.log(currOrder);

    //console.log(req.body);
    res.sendStatus(200);
});

app.post("/addCount", async (req, res) => {
    const curr = await add.findOne();
    await curr.increment("clickCount", { by: 1 });
    res.sendStatus(200);
});

app.get("/img", async (req, res) => {
    const curr = await add.findOne();
    res.send(curr);
});

app.post("/img", async (req, res) => {
    const curr = await add.findOne();
    console.log(req.body);
    curr.update({ image: req.body.image });
    res.send(curr);
});

app.get("/", async (req, res) => {
    buyer.hasMany(order);
    order.belongsTo(buyer);
    let uwu = await order.findOne({ include: buyer });
    let owo = await buyer.findOne();
    let foo = await product.findOne();
    //console.log(Object.keys(order.prototype.setbuyer));
    console.log(uwu);
    uwu.getBuyer();

    res.send(uwu);
});
