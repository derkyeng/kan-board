const express = require("express");
const jsonParser = require("body-parser").json();
const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || 8001;

const app = express();

const dataItems = [
    { id: "1", title: "First task", description: "First Desc" },
    { id: "2", title: "Second task", description: "Second Desc"  },
    { id: "3", title: "Third task", description: "Third Desc"  },
    { id: "4", title: "Fourth task", description: "Fourth Desc"  },
    { id: "5", title: "Fifth task", description: "Fifth Desc"  }
];

let dataList = {
    ["1"]: {
        name: "To Do",
        items: dataItems
    },
    ["2"]: {
        name: "In Progress",
        items: []
    },
    ["3"]: {
        name: "Completed",
        items: []
    }
}


app.get("/api", (req, res) => {
    console.log("Getting");
    res.json(dataList);
});
  
app.post("/add", jsonParser, (req,res) => {
    // console.log(req.body);
    if (req.body.id !== 0){
        dataList[1].items.push(req.body);     
    }
    res.json(dataList);
})

app.post("/update", jsonParser, (req, res) => {
    console.log("Updating")
    dataList = req.body;
    res.json(dataList);
})

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', function(req, res) {
  res.sendFile('index.html', { root: __dirname }, function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});