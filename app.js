const express=require("express");
const app = express();
const bodyParser=require("body-parser");
const https = require("https");
const { url } = require("inspector");
const { response } = require("express");
const e = require("express");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.listen(process.env.PORT || 3000,()=>{
    console.log("server is running on port 3000")
})
app.get("/",(req,res)=>{
    res.sendFile(`${__dirname}/signup.html`);    
})
app.post("/",(req,res)=>{
    let firstName =req.body.firstName;
    let email = req.body.email;
    let lastName = req.body.lastName;
    const url =`https://us14.api.mailchimp.com/3.0/lists/f98549bd38`
    let database = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    const jsData =JSON.stringify(database);
    const options = {
        method:"POST",
        auth:"wava31:12d0aedf4841158a7f9ff6e6bcb6e01d-us14"
    }

    const requiem=https.request(url,options,(responsey)=>{
        if(responsey===200){
            res.sendFile(`${__dirname}/failure.html`)
            
        }else{
            
            res.sendFile(`${__dirname}/succes.html`)
        }

        responsey.on("data",(data)=>{
            console.log(JSON.parse(data))
        })
       
        
    })
    requiem.write(jsData);
    requiem.end();
})

//API 12d0aedf4841158a7f9ff6e6bcb6e01d-us14
//unique id f98549bd38