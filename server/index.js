const express = require('express');
const app = express();

app.get("/api", (req, res) => {
    res.json({"message" : "test"});
});

app.listen(3001, () => {
    console.log("Server started on 3001");
})