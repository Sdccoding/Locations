const express = require("express"); 
const request=require('request')
const bodyParser = require("body-parser") 
const geocode=(address,callback)=>{
 const url='http://nominatim.openstreetmap.org/search?q='+address+'+&format=json&&_eventsCount: 3';
  request({url:url,json:true},(error,res)=>{
     if(error){
         callback('Unable to connect to location services');
         
     }
     else if(res.error){
         callback('Unable to Find Location');
 
     }else{
     // 
     var leng=res.body.length;
     var t1=new Array();
     t1=res.body[0].display_name.split(",");
     console.log(typeof t1[t1.length-1]);
      callback(undefined,{
         street_address:t1[0],
         latitude: res.body[0].lat,
         longitude: res.body[0].lon,
         location:  res.body[0].display_name,   
         country:  t1[t1.length-1],
         state1:   t1[t1.length-3],
         state2:   t1[t1.length-2],
         city:     t1[t1.length-4],
         
      })
      console.log(res.body);
      
     }
     })
 }

// geocode('Kolkata',(error,response)=>{
//  console.log(response)

// })

module.exports=geocode
 