const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res)
{
    res.sendFile(__dirname + "/index.html");
})
app.post("/",function(req,res)
{
    const firstname = req.body.first;
    const lastname = req.body.last;
    const email = req.body.email;

    var data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    }
    var jsonData = JSON.stringify(data);
    const url = "https://us7.api.mailchimp.com/3.0/lists/4903e0f388";
    const options  = {
        method:"POST",
        auth:"vasanth:5767b893fa4682316e135e3253b3cbed-us7"
    }
    
   const request =  https.request(url,options,function(response){

    if(response.statusCode===200){
        res.sendFile(__dirname + "/success.html");
    }
    else{
        res.sendFile(__dirname + "/failure.html")
    }
        response.on("data",function(data)
        {
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData);
    request.end();
})

app.post("/failure",function(req,res){
    res.redirect("/")
})
app.listen(3000,function()
{
    console.log("RUNNING");
});


// 5767b893fa4682316e135e3253b3cbed-us7
// 4903e0f388