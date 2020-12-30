const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res)
{
    res.sendFile(__dirname + "/index.html");
})
app.post("/",function(req,res)
{
    var firstname = req.body.first;
    var lastname = req.body.last;
    var email = req.body.email;

    console.log(firstname,lastname,email)
})
app.listen(3000,function()
{
    console.log("RUNNING");
});


// 5767b893fa4682316e135e3253b3cbed-us7
// 4903e0f388