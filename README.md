# Locfit
Membres : *Sébastien Confrère, Lucie Flohic, Lucas Bihan--Fourn, Margot Bouche*
Groupes : 2A1

# Présentation du travail

Pour rappel, notre persona est Charles Guyon, une personne très ciblée sur le luxe avec l’envie de bien s’habiller. Il veut également pouvoir louer des produits de bonne qualité. Pour répondre à ses besoins, nous avons réalisé des wireframes et des mock-up dans lesquels nous avons choisi une typographie évoquant un site web de luxe et de qualité. Les couleurs principales du site sont le jaune, le noir et le blanc.

Nous avons les pages basiques : accueil, catalogue, produit, panier, inscription et connexion.

En plus, nous avons les pages : abonnement (l’utilisateur peut choisir son abonnement, c’est factice), la page des favoris, le catalogue des nouveautés et une page profil (l’utilisateur peut changer ses informations personnelles).


# Présentation des extensions et modules installés

Notre site LocFit utilise les modules suivants :

- **express** : framework minimaliste pour gérer le serveur HTTP, les routes et le rendu des vues EJS.
- **express-session** : permet de gérer les sessions.
- **body-parser** : middleware qui analyse les requêtes HTTP.
- **mysql2** : pour communiquer avec la base de données MySQL
- **multer** : middleware pour gérer l’upload de fichiers (ici, les images de produits, stockées dans "public/img/produits").
- **crypto** (module natif Node.js) : pour hasher les mots de passe utilisateurs en MD5 (question de sécurité).

Ces modules doivent être installés via "npm install" afin que le serveur démarre correctement et que tout fonctionne.


# Autres informations pour faire fonctionner sur une autre machine

L'utilisation du "npm install" avant toute action sur le site web est requis, sous peine de bloquage sur le site.

Il est important de noter que la BDD a été grandement modifiée, et a donc besoin, pour le bon fonctionnement du site, d'être mise à jour. Le code de la BDD est trouvable dans le fichier "DumpBDD.sql" 
Le code est ensuite à copier collé dans mysql (lancé via Wamp ou équivalent). Le code gérera de lui-même la suppression de ce qui existe déjà, et la création de ce qui ne l'est pas.


### Certaines conditions sont à respecter pour la BDD

**nom** de la base de données : **SAE301** 

**User** : **root**


# Identifiants et mot de passe fonctionnels

**admin** : 
- username = adufrene
- Password = 1234

**agent** : 
- username = lpetit
- Password = 1234

**client** : 
- Username = jdupont
- Password = 1234          

*Il est possible d'utiliser d'autres identifiants, mais ces 3 cités au préalable recourvent l'entièreté des fonctionnalités disponibles sur le site. L'utilisation d'autres identifiants (trouvables dans la BDD) n'amènerait aucune fonctionnalités supplémentaires.*


# Récapitulation du travail du groupe

| Fonctionnalité principale | Sébastien | Lucas |Lucie | Margot |
|----------|-----------|-----------|-----------|-----------|
| BDD + Script SQL | 65%  | 0%        | 5%        | 30%        |
| HTML / CSS  | 10%  | 35%        | 45%        | 10%        |
| JavaScript  | 70%  | 5%        | 20%        | 5%        |
| Interface Client (UX et UI) | 5%  | 40%        | 35%        | 20%        |




# Fonctionnalités implémentées

La majeure partie des fonctionnalités demandées sont implémentées.
Voici la liste des différentes fonctionnalités que l'on peut retrouver sur notre site (fonctionnalités accessibles à tous) : 
- Connexion du client / agent / admin
- Inscription / création de compte client
- Page de listing des produits fonctionnelle
- Système de tri des produits selon des catégories prédéfinies
- Page de produit unique, permettant de voir les infos du produit, et d'ensuite accéder à la page de réservation
- page de réservation, où l'utilisateur peut choisir ses dates de réservation et la quantité de produit qu'il souhaite
- Listing des 5 produits les plus aimés (les mieux notés) de la base de données
- Page nouveauté (similaire à la page de listing des produits)
- Page profil, où l'utilisateur peut : 
  - voir son historique d'ancien achat (cependant, cette fonctionnalité n'est pas encore complètement implémentée)
  - Voir ses produits favoris
  - Voir son abonnement (pas dynamique)
  - modifier ses informations (fonctionnel)
  - changer d'abonnement (fictif)
- Une page panier, où l'utilisateur voit les produits qu'il a enregistré. L'utilisateur peut procéder au paiement depuis cette page.
- une page paiement, où l'utilisateur va rentrer ses informations personnelles pour payer.
**Pour une question de sécurité, ceci n'est qu'une simulation, et les informations ne sont pas stockées**
- Une page favoris où l'utilisateur peut accéder à tout les produits qu'il a mis en favoris et les commander de nouveau, en sachant si le produit est disponible ou non
- Un bouton de retour à l'accueil, au cas où l'utilisateur se perd (logo dans le header)
- L'utilisateur peut se déconnecter / supprimer son compte depuis la page profil, dans "modifier mes informations".  

---  

Certaines fonctionnalités sont cependant réservés à certains types d'utilisateur. 
---  
C'est le cas notemment des "**agents**", qui ont accès aux fonctionnalités suivantes : 
- Accès à la page de stockage. Ils peuvent : 
  - Ajouter un produit, en renseignant toutes les informations nécessaires (image, nom, quantité, ...)
  - Supprimer des produits si, et suelement si, le produit n'est pas déjà en cours de réservation
- Accès à la liste de toutes les réservations, où ils peuvent conclure une réservation, ou y mettre fin si elle n'a pas encore commencée.

---
C'est le cas aussi pour l'admin (ici, adufrene), qui dispose de fonctionnalités supplémentaires : 
- Listing de tout les agents, avec leurs informations (nom, prénom, mail, ...)
- Création de compte pour les agents

---
Certaines fonctionnalités ne sont cependant pas totalement, ou tout simplement pas implémentés. C'est le cas des fonctionnalités suivantes : 
- Les clients ne peuvent pas réellement changer de "plan". Ils ne peuvent pas réellement devenir VIP, premium, ou autre
- les gérants ne peuvent pas réellement conclure une réservation au bout du temps impartit
- les clients ne peuvent pas choisir entre livraison ou "à récupérer en magasin"
- L'admin ne peut pas supprimer un compte d'agent
Les prix ne sont pas aussi sophistiqués que ce qui est demandé. Il n'y a pas de "pénalité" si le produit n'est pas rendu en temps et en heure, et le prix ne varie pas dynamiquement en fonction du temps de location. Chaque jour de location coute le même prix. Ce dernier varie uniquement avec la quantité de produit commandé