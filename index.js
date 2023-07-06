const express = require("express");
const { BookRouter } = require("./routes/books.routes");

const { connection } = require("./config/db");

require('dotenv').config();
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    res.send("welcome to BOOK APP ");
});

app.use("/books", BookRouter);

const PORT = process.env.PORT || 8090;

app.listen(PORT, async () => {
    try {
        await connection;

        console.log("Connected to DB");

    } catch (err) {

        console.log(err);

        console.log("Cannot connect to the database");
    }
    console.log(`Server running on port ${PORT}`);
});