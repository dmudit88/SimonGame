var express=require('express');
var app=express();

app.use(express.static('public'))
app.set('view engine', 'ejs');
app.get('/',(req,res)=>{
    res.render('index');
});
app.listen(5000,()=>{
    console.log('Website running on localhost 5000');
})