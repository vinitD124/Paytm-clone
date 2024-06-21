const express = require("express");
const routes = require("./routes/routes");
const account = require("./routes/Account");
const cors = require('cors');
const mongoose = require('mongoose');
const { dbConnect } = require("./config/DbConnect");

require('dotenv').config(); // Load environment variables

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", routes);
app.use("/api/v1/account", account);

app.listen(4000, () => {
    console.log("app running on port number 4000");
});

dbConnect(); // Connect to the database


