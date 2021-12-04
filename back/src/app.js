const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = { app };
