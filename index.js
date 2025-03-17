const express = require("express");
const app = express();

// Connect to database
const sequelize = require("./config/database");
sequelize
    .authenticate()
    .then(() => {
        console.log("Connected to database");

        // Start the server
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
        process.exit(1);
    });

app.get("/", (req, res) => {
    res.send("Hello World");
});
