const express = require('express')
const app = express()
const redis=require('redis')
const client=redis.createClient({
    port:18059,
    host:'redis-18059.c212.ap-south-1-1.ec2.cloud.redislabs.com',
    password :'2aaJidSJfCgtYadTkTnQfjD46Q4LD3dZ',
});
client.on("error",function(error){
    console.log(error);
})
 app.get('/',(req,res)=>{
    client.get("ede",(err,result)=>{
        if(!err && result==null){
               setTimeout(()=>{
                client.set("ede",JSON.stringify({name:"Mani"}))
                res.json({
                   name:"Mani",
                   err:true
                })
            },1000)
        }
        else{
            res.json({
                data:JSON.parse(result),
                err:false
            })
        }
    })
  })
app.get('/delete',(req,res)=>{
    client.flushall();
    res.json({done:"true"})
})
        
app.listen(4000,()=>console.log('listining 4000...'));