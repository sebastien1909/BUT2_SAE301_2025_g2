import express from "express";

const app = express();


app.get("/", function(req,res){
    res.render("index")
});

app.use((req,res) =>{
    res.status(404).render("404");
})


app.listen(3000);