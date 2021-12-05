const add = require("../models/add");

const getImg = async (req, res) => {
    const curr = await add.findOne();
    res.send(curr);
};

const postImg = async (req, res) => {
    const curr = await add.findOne();
    console.log(req.body);
    curr.update({ image: req.body.image });
    res.send(curr);
};
const addCount = async (req, res) => {
    const curr = await add.findOne();
    await curr.increment("clickCount", { by: 1 });
    res.sendStatus(200);
};

module.exports = { getImg, postImg, addCount };
