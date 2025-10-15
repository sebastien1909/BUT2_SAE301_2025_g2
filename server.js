import express from "express";
import pool from "./db.js";

const app = express();
app.set("view engine", "ejs");

app.use(express.static('public'));

// partie pour le grand public

app.get("/", async function(req,res){
    //récupération bdd (code à réutiliser pour les autres routes)
    let data = await pool.query("SELECT * FROM produit");
    res.render("index", {variable : data});
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







// partie pour le gerant

app.get("/gerant/accueil", async function(req,res){
    let produits_aime = await pool.query("SELECT * FROM produit ORDER BY note DESC LIMIT 5");
    res.render("gerant/accueil", {liste_user : produits_aime[0]});

});

app.get("/gerant/ajout_suppr_produit", function(req,res){
    res.render("ajout_suppr_produit", {variable : "aled"});
});

app.get("/gerant/check_resa", function(req,res){
    res.render("check_reservation", {variable : "aled"});
});

app.get("/gerant/liste_resa", function(req,res){
    res.render("liste_resa", {variable : "aled"});
});

app.get("/gerant/nouveaute", function(req,res){
    res.render("nouveaute", {variable : "aled"});
});

app.get("/gerant/catalogue_produit", function(req,res){
    res.render("catalogue_produit", {variable : "aled"});
});

app.get("/gerant/catalogue_categorie", function(req,res){
    res.render("catalogue_categorie", {variable : "aled"});
});

app.get('/gerant/produit/:id', async (req, res) => {
    const produitId = req.params.id;
    const row = await pool.query("SELECT * FROM produit WHERE id = ?", [produitId]);
    res.render('produit', { produit : row[0]})
});










app.use((req,res) =>{
    res.status(404).render("404");
})


app.listen(3000);