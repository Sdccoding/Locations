const express = require("express"); 
const request=require('request')
const bodyParser = require("body-parser") 
const geocode=require(__dirname+"/geocode.js");
// New app using express module 
const app = express(); 
const port=process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ 
	extended:true
})); 

app.get("/",(req, res)=> { 
res.sendFile(__dirname + "/index.html"); 
}); 

app.post("/getAddress",(req, res)=> { 
    console.log(req.body.num1);
    geocode(req.body.num1,(error,ans)=>{
        if(error){
            return res.send({error})
        }
         var Address = {
             latitude: ans.latitude,
             longitude:ans.longitude,
             address:  ans.location,
             location: ans.street_address,   
             city:     ans.city,
             state_maybe_district: ans.state1,
             state_maybe_zip:ans.state2,
             country:  ans.country,

            }
             
        res.send({Address});
})
  
      
});

 

app.listen(port, function(){ 
console.log("server is running on port "+ port); 
}) 
