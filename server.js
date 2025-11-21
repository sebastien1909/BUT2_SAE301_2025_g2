import express from "express";
import session from "express-session";
import crypto from "crypto";
import bodyParser from "body-parser";
import pool from "./db.js";
import multer from "multer";
import path from "path";





// Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/produits'); // dossier de stockage des images
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = 'Prdt' + Date.now() + ext;
        cb(null, uniqueName);
    }
});




const upload = multer({ storage: storage });

const app = express();
app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

//MIDDLEWARES MAISON
function authenticate(req,res,next) {
    if (req.session.hasOwnProperty("userId")){
        next();
    }
    else {
        res.status(403).redirect("connexion")
    }
}

function isAdmin(req, res, next){
    if (req.session.userRole == "Admin"){
        next();
    }
    else {
        res.status(403).redirect("/");
    }
}
app.get("/co", authenticate, async function(req,res){
    if (req.session.userRole == "client"){
        res.render("profil")
    }
    else {
        res.render("connexion");
    }
});


//protéger une page (rajout d'authenticate et par ex isAdmin)
// app.get("/", authenticate, isAdmin, async function(req,res){
//     //récupération bdd (code à réutiliser pour les autres routes)
//     let data = await pool.query("SELECT * FROM produit");
//     res.render("index", {variable : data});
// });

//

// ROUTES

app.get("/", async function(req,res){
    //récupération bdd (code à réutiliser pour les autres routes)
    let produits_aime = await pool.query("SELECT * FROM produit LIMIT 5");
    res.render("index", {produits_aime : produits_aime[0]});
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

app.get('/produit/:id', async function(req, res) {
    const produitId = req.params.id;
    const row = await pool.query("SELECT * FROM produit WHERE id = ?", [produitId]);
    const produit = row[0][0]
    const type = produit.type
    const produit_plaire = await pool.query("SELECT * FROM produit WHERE type = ? AND id != ?LIMIT 3", [type, produitId]);
    res.render('produit', { 
        produit : produit,
        produit_plaire : produit_plaire[0]
    })
});

app.get('/nutrition/:id', async function(req, res) {
    const produitId = req.params.id;
    const row = await pool.query("SELECT * FROM produit WHERE id = ?", [produitId]);
    const produit = row[0][0]
    const type = produit.type
    const produit_plaire = await pool.query("SELECT * FROM produit WHERE type = ? AND id != ?LIMIT 3", [type, produitId]);
    res.render('nutrition', { 
        produit : produit,
        produit_plaire : produit_plaire[0]
    })
});

app.get('/appareils_equipements/:id', async function(req, res) {
    const produitId = req.params.id;
    const row = await pool.query("SELECT * FROM produit WHERE id = ?", [produitId]);
    const produit = row[0][0]
    const type = produit.type
    const produit_plaire = await pool.query("SELECT * FROM produit WHERE type = ? AND id != ?LIMIT 3", [type, produitId]);
    res.render('appareils_equipements', { 
        produit : produit,
        produit_plaire : produit_plaire[0]
    })
});

app.get("/profil", function(req,res){
    //mettre un if pour quand co l'icone connexion mène à profil
    res.render("profil", {variable : "aled"});
});

app.get("/reservation/:id", async function(req,res){
    const produitId = req.params.id;
    const result = await pool.query("SELECT * from produits WHERE id = ?",[produitId]);
    res.render("reservation", {produit : result});
});

app.get("/catalogue_produit", async function(req,res){
    const tri = req.query.tri;
    const ordre = req.query.ordre === 'desc' ? 'DESC' : 'ASC';
    const filtre = req.query.filtre;
    const valeur = req.query.valeur;

    let RequetedeBase = "SELECT * FROM produit";
    let queryParams = [];

    if (filtre && valeur) {
        RequetedeBase += ` WHERE ${filtre} = ?`;
        queryParams.push(valeur);
    }

    // Ajout du tri si demandé
    if (tri) {
        RequetedeBase += ` ORDER BY ${tri} ${ordre}`;
    }

    try {
        const result = await pool.query(RequetedeBase, queryParams);
        res.render("gerant/catalogue_produit", { liste_produits: result[0] });
    } catch (error) {
        console.error("Erreur SQL :", error);
        res.status(500).send("Erreur serveur");
    }
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
    let hashedPassword = crypto.createHash('md5').update(password).digest('hex');

    let result = await pool.query ("SELECT * FROM utilisateur WHERE login = ? AND password = ?",[username, hashedPassword])

    // verification info de l'utilisateur sont dans la bdd
    if (result [0].length > 0){
        let nom = await pool.query ("SELECT prenom FROM utilisateur WHERE login = ?", [username]);
        req.session.userRole = result[0][0].type_utilisateur;
        req.session.userID = result[0][0].id;
        req.session.prenom = nom[0];
        if (req.session.userRole == "agent"){
            res.redirect("/gerant/accueil");
        }
        else if (req.session.userRole == "admin"){
            res.redirect("/admin/accueil");
        }
        else{
            res.redirect("/");
        }
        
    }
    //si c'est le cas : on recup le rôle + on initialise une session + redirection page accueil
    else {
        res.render("connexion", {message : "Nom d'utilisateur ou mot de passe incorrect"});
    }
    //sinon : message d'erreur + redirection page connexion
});


app.get("/inscription", function(req,res){
    res.render("inscription", {variable : "aled"});
});

app.get("/catalogue_categorie", function(req,res){
    res.render("catalogue_categorie", {variable : "aled"});
});







// partie pour le gerant

app.get("/gerant/accueil", async function(req,res){
    let produits_aime = await pool.query("SELECT * FROM produit LIMIT 5");
    res.render("gerant/accueil", {produits_aime : produits_aime[0],
        prenom:req.session.nom
    });

});

app.get("/gerant/ajout_suppr_produit", async function(req,res){
    const liste_produit = await pool.query("SELECT * FROM produit");
    res.render("gerant/ajout_suppr_produit", {produits_suppr : liste_produit[0]});
});

app.get("/gerant/check_reservation", function(req,res){
    res.render("gerant/check_reservation", {variable : "aled"});
});

app.get("/gerant/liste_reservation", async function(req,res){
    const liste_reservation = await pool.query("SELECT produit.description, produit.marque, produit.modele, produit.image, location.date_debut, location.date_retour_prevue, location.id, location.prix_total, location.date_retour_effective, utilisateur.login, utilisateur.email FROM produit NATURAL JOIN location LEFT JOIN utilisateur ON (utilisateur.id = location.utilisateur_id) WHERE location.date_retour_effective is null")
    res.render("gerant/liste_resa", {liste_resa :liste_reservation[0]});
});

app.get("/gerant/nouveaute", function(req,res){
    res.render("gerant/nouveaute", {variable : "aled"});
});

app.get("/gerant/catalogue_produit", async function(req, res) {
    const tri = req.query.tri;
    const ordre = req.query.ordre === 'desc' ? 'DESC' : 'ASC';
    const filtre = req.query.filtre;
    const valeur = req.query.valeur;

    let RequetedeBase = "SELECT * FROM produit";
    let queryParams = [];

    if (filtre && valeur) {
        RequetedeBase += ` WHERE ${filtre} = ?`;
        queryParams.push(valeur);
    }

    // Ajout du tri si demandé
    if (tri) {
        RequetedeBase += ` ORDER BY ${tri} ${ordre}`;
    }

    try {
        const result = await pool.query(RequetedeBase, queryParams);
        res.render("gerant/catalogue_produit", { liste_produits: result[0] });
    } catch (error) {
        console.error("Erreur SQL :", error);
        res.status(500).send("Erreur serveur");
    }
});


app.get('/gerant/produit/:id', async function(req, res) {
    const produitId = req.params.id;
    const row = await pool.query("SELECT * FROM produit WHERE id = ?", [produitId]);
    const produit = row[0][0]
    const type = produit.type
    const produit_plaire = await pool.query("SELECT * FROM produit WHERE type = ? AND id != ?LIMIT 3", [type, produitId]);
    res.render('gerant/produit', { 
        produit : produit,
        produit_plaire : produit_plaire[0]
    })
});

app.get('/gerant/reservation/:id', async function(req, res) {
    const produitId = req.params.id;
    const row = await pool.query("SELECT * FROM produit WHERE id = ?", [produitId]);
    const produit = row[0][0]
    const type = produit.type
    const produit_plaire = await pool.query("SELECT * FROM produit WHERE type = ? AND id != ?LIMIT 3", [type, produitId]);
    res.render('gerant/reservation', { 
        produit : produit
    })
});



// Actions au click sur les boutons

app.post('/ajouter-produit', upload.single('image'), async function(req, res) {
    try {
        const { marque, modele, categorie, prix, description } = req.body;
        const image = req.file ? `/img/produits/${req.file.filename}` : null;
        await pool.query("INSERT INTO produit (type, description, marque, modele, prix_location, etat, image) VALUES (?, ?, ?, ?, ?, ?, ?)",[categorie, description, marque, modele, prix, 'très bon état', image]);

        res.redirect('/gerant/ajout_suppr_produit'); 
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de l'ajout du produit");
    }
});

app.post('/rechercher_suppression', async function(req, res) {
    try {
        const nomRecherche = '%' + req.body.search + '%';
        const produits_suppr = await pool.query("SELECT * FROM produit WHERE modele LIKE ? OR marque LIKE ?", [nomRecherche, nomRecherche]);
        res.render("gerant/ajout_suppr_produit", { produits_suppr: produits_suppr[0] });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la recherche du produit");
    }
});


app.post('/supprimer-produit', async function(req, res){
    try {
        const produitId = req.body.id;
        await pool.query("DELETE FROM produit WHERE id = ? AND NOT EXISTS (SELECT * FROM location WHERE produit_id = ?);", [produitId,produitId]);
        res.redirect('/gerant/ajout_suppr_produit');
    } catch (err) {
        console.error(err);
        res.status(500).send("Le produit est en réservation ou erreur lors de la suppression du produit");
    }
});

app.post('/inscription_infos', async function(req, res){
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const tel = req.body.telephone;
    const age = req.body.age;
    const mail = req.body.mail;
    const mdp = req.body.mdp;
    const mdp_confirm = req.body.mdp_confirm;
    const conditions_générales = req.body.conditions_générales;
    const recevoir_mail = !!req.body.recevoir_mail;
    const login = req.body.login;

    const mailExistant = await pool.query("SELECT * FROM utilisateur WHERE email = ?",[mail]);
    const loginExistant = await pool.query("SELECT * FROM utilisateur WHERE login = ?",[login])


    if (mailExistant[0].length > 0) {
        return res.render("inscription", { message: "Email déjà utilisé" });
    }
    else if (loginExistant[0].length > 0) {
        return res.render("inscription", { message: "Email déjà utilisé" });
    }

    else if (mdp == mdp_confirm){
        const mdp_hash = crypto.createHash('md5').update(mdp).digest('hex')
        await pool.query("INSERT INTO utilisateur(login,password,nom,prenom,email,type_utilisateur, téléphone, age, newsletter) VALUES (?,?,?,?,?,?,?,?, ?)", [login, mdp_hash, nom, prenom, mail, 'client', tel, age, recevoir_mail]);
        res.redirect('/');
    } else{
        res.render("/inscription", {message : "Une information est erronée"});
    }


    
});





















app.use((req,res) =>{
    res.status(404).render("404");
})


app.listen(3000);