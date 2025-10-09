import express from "express";

const app = express();
app.set("view engine", "ejs");

app.use(express.static('public'));

app.get("/", function(req,res){
    res.render("index", {variable : "aled"});
});

app.get("/nouveaute", function(req,res){
    res.render("nouveaute", {variable : "aled"});
});

app.get("/panier", function(req,res){
    res.render("panier", {variable : "aled"});
});

app.get("/paiement", function(req,res){
    res.render("paiement", {variable : "aled"});
});

app.get("/produit", function(req,res){
    res.render("produit", {variable : "aled"});
});

app.get("/profil", function(req,res){
    res.render("profil", {variable : "aled"});
});

app.get("/reservation", function(req,res){
    res.render("reservation", {variable : "aled"});
});

app.get("/catalogue_produit", function(req,res){
    res.render("catalogue_produit", {variable : "aled"});
});

app.get("/favoris", function(req,res){
    res.render("favoris", {variable : "aled"});
});

app.get("/abonnement", function(req,res){
    res.render("abonnement", {variable : "aled"});
});

app.get("/connexion", function(req,res){
    res.render("connexion", {variable : "aled"});
});

app.get("/inscription", function(req,res){
    res.render("inscription", {variable : "aled"});
});

app.get("/catalogue_categorie", function(req,res){
    res.render("catalogue_categorie", {variable : "aled"});
});

app.get("/gerant/accueil", function(req,res){
    res.render("gerant/accueil", {variable : "aled"});
});

app.get("/gerant/ajout_suppr", function(req,res){
    res.render("gerant/ajout_suppr_produit", {variable : "aled"});
});

app.get("/gerant/check_resa", function(req,res){
    res.render("gerant/check_reservation", {variable : "aled"});
});

app.get("/gerant/liste_resa", function(req,res){
    res.render("gerant/liste_resa", {variable : "aled"});
});








app.use((req,res) =>{
    res.status(404).render("404");
})


app.listen(3000);