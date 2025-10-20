import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import pool from "./db.js";

const app = express();
app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

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

app.get("/catalogue_produit", async function(req,res){
    let produits = await pool.query("SELECT * FROM produit");
    res.render("catalogue_produit", {liste_produits : produits[0]});
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
app.post("/connexion", async function(req,res){
    // recup info de connexion
    let username = req.body.login;
    let password = req.body.mdp;

    let result = await pool.query (
        "SELECT * FROM utilisateur WHERE login = ? AND password = ?",
        [username, password]
    )

    // verification info de l'utilisateur sont dans la bdd
    if (result [0].length > 0){
        req.session.userRole = result[0][0].role;
        req.session.userID = result[0][0].id;

        res.render("index");
    }
    //si c'est le cas : on recup le rôle + on initialise une session + redirection page accueil
    else {
        res.render("connexion", {message : "Nom d'utilisateur ou mot de passe incorrect"});
    }
    //sinon : message d'erreur + redirection page connexion

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
    res.render("gerant/accueil", {produits_aime : produits_aime[0]});

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

app.get("/gerant/catalogue_produit", async function(req,res){
    let produits = await pool.query("SELECT * FROM produit");
    res.render("catalogue_produit", {liste_produits : produits[0]});
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