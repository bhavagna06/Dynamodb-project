const express = require("express");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

AWS.config.update({
    region: "us-east-1"
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/register", (req, res) => {

    const params = {
        TableName: "Users",
        Item: {
            email: req.body.email,
            name: req.body.name,
            phone: req.body.phone
        }
    };

    dynamodb.put(params, (err, data) => {

        if (err) {
            console.log(err);
            res.send("Error saving data");
        } else {
            res.send("User registered successfully");
        }

    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
