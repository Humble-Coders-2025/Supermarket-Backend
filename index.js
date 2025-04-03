const express = require("express");
const app = express();

// Connect to database
const { sequelize } = require("./models/index.js");
sequelize
    .sync({ alter: true })
    .then(() => {
        console.log("Connected to database");

        // Start the server
        app.listen(8080, () => {
            console.log(`Server is running on port 8080`);
        });
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
        process.exit(1);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base router
const baseRouter = require("./routes/index.js");
app.use("/api", baseRouter);

// Error handling middleware
const errorHandler = require("./middlewares/error");
app.use(errorHandler);
