import express from "express";

const app = express();


app.get("/", function(req,res){
    res.sendFile("index.html", {root : import.meta.dirname})
});

app.use((req,res) =>{
    res.status(404).sendFile("./404.html", {root : import.meta.dirname});
})


app.listen(3000);