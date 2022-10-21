const express = require ("express");
const app = express();

app.use(express.static("public"));
// app.use(bodyParser.urlencoded({extended: true}));

app.get("/" ,function(request , response){
    response.sendFile(__dirname+'/index.html');
});



app.listen(3000 , function(){
    console.log("Listing on port 3000")
});