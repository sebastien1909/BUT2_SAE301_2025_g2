import express from "express";

const app = express();
app.set("view engine", "ejs");


app.get("/", function(req,res){
    res.render("index", {variable : "aled"});
});

app.use((req,res) =>{
    res.status(404).render("404");
})


app.listen(3000);