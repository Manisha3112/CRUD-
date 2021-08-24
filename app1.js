var express=require('express');
var app=express()
var bodyparser=require('body-parser');
const port=2222;
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(__dirname));
const myRoutes=require('./app/routes/route');
app.use(myRoutes);
    app.listen(port,()=>{
    console.log("Server is listening 2222");
})