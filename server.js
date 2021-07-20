const express = require("express");
const jsonParser = require("body-parser").json();

const PORT = process.env.PORT || 8001;

const app = express();
let counter = 0;

app.get("/api", (req, res) => {
    res.json({ message: `Counter: ${counter}` });
    counter++;
});

app.post("/database", jsonParser, (req, res) => {
    console.log(req.body)
})
  
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});