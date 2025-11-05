-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 23 oct. 2025 à 06:14
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `sae301`
--

-- --------------------------------------------------------

--
-- Structure de la table `location`
--

DROP TABLE IF EXISTS `location`;
CREATE TABLE IF NOT EXISTS `location` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_debut` date NOT NULL,
  `date_retour_prevue` date NOT NULL,
  `date_retour_effective` date DEFAULT NULL,
  `prix_total` float DEFAULT NULL,
  `utilisateur_id` int NOT NULL,
  `produit_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `utilisateur_id` (`utilisateur_id`),
  KEY `produit_id` (`produit_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

DROP TABLE IF EXISTS `produit`;
CREATE TABLE IF NOT EXISTS `produit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `marque` varchar(100) NOT NULL,
  `modele` varchar(100) NOT NULL,
  `prix_location` float NOT NULL,
  `etat` varchar(20) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `note` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `produit`
--

INSERT INTO `produit` (`id`, `type`, `description`, `marque`, `modele`, `prix_location`, `etat`, `image`, `note`) VALUES
(1, 'vetements', 'Veste coupe-vent imperméable pour la randonnée', 'Quechua', 'MH100', 6.99, 'bon état', '/img/produits/Prdt1.png', 4),
(2, 'vetements', 'Pantalon de ski chaud et respirant', 'Wedze', 'SKI 500', 7.99, 'très bon état', '/img/produits/Prdt2.png', 3),
(3, 'vetements', 'T-shirt technique anti-transpiration', 'Nike', 'Dri-Fit Pro', 3.49, 'neuf', '/img/produits/Prdt3.png', 4),
(4, 'vetements', 'Veste de running réfléchissante', 'Kalenji', 'Run Light', 5.99, 'bon état', '/img/produits/Prdt4.png', 4),
(5, 'vetements', 'Combinaison de plongée 3mm', 'Cressi', 'Morea', 9.99, 'état moyen', '/img/produits/Prdt5.png', 3),
(6, 'vetements', 'Gants de vélo respirants', 'Giro', 'Jag', 2.49, 'bon état', '/img/produits/Prdt6.png', 4),
(7, 'vetements', 'Casquette de sport ajustable', 'Adidas', 'AEROREADY', 1.99, 'très bon état', '/img/produits/Prdt7.png', 3),
(8, 'vetements', 'Veste de cyclisme coupe-vent', 'Btwin', 'RC 500', 4.99, 'bon état', '/img/produits/Prdt8.png', 4),
(9, 'vetements', 'Maillot de foot officiel', 'Puma', 'UltraDry 2025', 5.49, 'bon état', '/img/produits/Prdt9.png', 5),
(10, 'vetements', 'Chaussettes de compression pour running', 'Compressport', 'Pro Racing v3', 2.99, 'neuf', '/img/produits/Prdt10.png', 4),
(11, 'vetements', 'Veste softshell coupe-froid', 'Columbia', 'Windbreaker Pro', 6.49, 'bon état', '/img/produits/Prdt11.png', 3),
(12, 'vetements', 'T-shirt de sport respirant unisexe', 'Domyos', 'Essential 100', 2.49, 'bon état', '/img/produits/Prdt12.png', 4),
(13, 'nutrition', 'Pack de barres protéinées au chocolat', 'MyProtein', 'Bar Max', 3.99, 'neuf', '/img/produits/Prdt13.png', 3),
(14, 'nutrition', 'Boisson isotonique citron en poudre 500g', 'Isostar', 'Hydrate & Perform', 4.49, 'neuf', '/img/produits/Prdt14.png', 4),
(15, 'nutrition', 'Complément BCAA pour la récupération musculaire', 'Optimum Nutrition', 'BCAA 5000', 6.99, 'neuf', '/img/produits/Prdt15.png', 4),
(16, 'nutrition', 'Gels énergétiques goût fruits rouges (pack x5)', 'PowerBar', 'Energy Gel', 5.99, 'neuf', '/img/produits/Prdt16.png', 5),
(17, 'nutrition', 'Shaker de sport gradué 700ml', 'Decathlon', 'Shaker 700', 1.49, 'très bon état', '/img/produits/Prdt17.png', 4),
(18, 'nutrition', 'Protéine Whey saveur vanille 1kg', 'Scitec Nutrition', '100% Whey Protein', 8.99, 'neuf', '/img/produits/Prdt18.png', 3),
(19, 'nutrition', 'Barres de céréales bio pour sportifs', 'Iswari', 'Raw Energy', 3.49, 'bon état', '/img/produits/Prdt19.png', 4),
(20, 'nutrition', 'Gourde isotherme en inox 1L', 'Hydro Flask', 'Sport Steel', 2.99, 'très bon état', '/img/produits/Prdt20.png', 3),
(21, 'nutrition', 'Boîte de compléments multivitaminés', 'Nutrimuscle', 'MultiVits', 6.49, 'neuf', '/img/produits/Prdt21.png', 4),
(22, 'nutrition', 'Pack de boissons énergisantes sans sucre', 'Red Bull', 'Zero Power 6x250ml', 5.99, 'bon état', '/img/produits/Prdt22.png', 4),
(23, 'appareils', 'Tapis de course connecté avec capteurs cardiaques', 'ProForm', 'Carbon T7', 84.99, 'bon état', '/img/produits/Prdt23.png', 3),
(24, 'appareils', 'Vélo d’appartement magnétique', 'Domyos', 'EB500', 59.99, 'bon état', '/img/produits/Prdt24.png', 5),
(25, 'appareils', 'Rameur pliable avec résistance magnétique', 'SportPlus', 'SP-MSP-008', 49.99, 'état moyen', '/img/produits/Prdt25.png', 4),
(26, 'appareils', 'Vélo elliptique connecté Bluetooth', 'NordicTrack', 'E7.5', 64.99, 'très bon état', '/img/produits/Prdt26.png', 3),
(27, 'appareils', 'Stepper compact avec bandes élastiques', 'Ultrasport', 'Up Down Stepper', 22.99, 'bon état', '/img/produits/Prdt27.png', 4),
(28, 'appareils', 'Banc de musculation inclinable avec support haltères', 'Care Fitness', 'Pro Bench 300', 26.99, 'bon état', '/img/produits/Prdt28.png', 4),
(29, 'appareils', 'Station de traction murale renforcée', 'Domyos', 'Pull Up Bar 900', 19.99, 'très bon état', '/img/produits/Prdt29.png', 5),
(30, 'appareils', 'Roue abdominale double avec tapis genouillère', 'Domyos', 'Ab Wheel 100', 5.49, 'neuf', '/img/produits/Prdt30.png', 3),
(31, 'appareils', 'Mini vélo de rééducation pour bras et jambes', 'Reeducare', 'MiniBike 100', 12.99, 'bon état', '/img/produits/Prdt31.png', 4),
(32, 'appareils', 'Multigym complet pour exercices à domicile', 'Marcy', 'MKM-81010', 69.99, 'bon état', '/img/produits/Prdt32.png', 4),
(33, 'appareils', 'Vélo spinning professionnel à résistance magnétique', 'BH Fitness', 'SB3.0', 72.99, 'très bon état', '/img/produits/Prdt33.png', 3),
(34, 'appareils', 'Tapis de marche pliable silencieux', 'Reebok', 'Jet 100', 74.99, 'bon état', '/img/produits/Prdt34.png', 4),
(35, 'équipement', 'Casque de vélo réglable avec visière', 'Giro', 'Register', 3.99, 'très bon état', '/img/produits/Prdt35.png', 2),
(36, 'équipement', 'Sac de sport étanche 50L', 'Adidas', 'Tiro Duffel', 4.99, 'bon état', '/img/produits/Prdt36.png', 4),
(37, 'équipement', 'Sac à dos de randonnée 30L', 'Quechua', 'MH500', 6.99, 'bon état', '/img/produits/Prdt37.png', 4),
(38, 'équipement', 'Tapis de yoga antidérapant 6mm', 'Domyos', 'Comfort 6', 3.99, 'bon état', '/img/produits/Prdt38.png', 3),
(39, 'équipement', 'Lunettes de natation anti-buée', 'Speedo', 'Futura Biofuse', 1.99, 'bon état', '/img/produits/Prdt39.png', 5),
(40, 'équipement', 'Ceinture porte-bouteilles pour running', 'Kalenji', 'Run 500', 2.99, 'neuf', '/img/produits/Prdt40.png', 4),
(41, 'équipement', 'Gants de musculation rembourrés', 'Reebok', 'Grip Pro', 2.49, 'état moyen', '/img/produits/Prdt41.png', 3),
(42, 'équipement', 'Raquette de tennis en graphite', 'Babolat', 'Pure Drive', 8.99, 'très bon état', '/img/produits/Prdt42.png', 4),
(43, 'équipement', 'Raquette de badminton légère', 'Yonex', 'Astrox 77', 6.99, 'bon état', '/img/produits/Prdt43.png', 3),
(44, 'équipement', 'Raquette de padel avec grip ergonomique', 'Head', 'Graphene 360 Alpha', 10.99, 'bon état', '/img/produits/Prdt44.png', 4),
(45, 'équipement', 'Planche de surf en mousse pour débutants', 'Olaian', '500 Softboard', 29.99, 'état moyen', '/img/produits/Prdt45.png', 5),
(46, 'équipement', 'Skateboard complet en érable', 'Oxelo', 'Mid 500', 12.99, 'bon état', '/img/produits/Prdt46.png', 3),
(47, 'équipement', 'Stand up paddle gonflable avec pompe', 'Itwit', 'SUP 11', 34.99, 'bon état', '/img/produits/Prdt47.png', 4),
(48, 'équipement', 'Bodyboard avec leash inclus', 'Tribord', '500 Dynamique', 8.99, 'bon état', '/img/produits/Prdt48.png', 3);
-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `login` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `ddn` date NOT NULL,
  `email` varchar(50) NOT NULL,
  `type_utilisateur` varchar(10) NOT NULL,
  `age` int DEFAULT NULL,
  `téléphone` int DEFAULT NULL,
  `newsletter` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `login`, `password`, `nom`, `prenom`, `ddn`, `email`, `type_utilisateur`, `age`, `téléphone`, `newsletter`) VALUES
(1, 'jdupont', '81dc9bdb52d04dc20036dbd8313ed055', 'Dupont', 'Jean', '1990-05-12', 'jdupont@example.com', 'client', NULL, NULL, NULL),
(2, 'sleclerc', '81dc9bdb52d04dc20036dbd8313ed055', 'Leclerc', 'Sophie', '1985-09-21', 'sleclerc@example.com', 'client', NULL, NULL, NULL),
(3, 'plefebvre', '81dc9bdb52d04dc20036dbd8313ed055', 'Lefebvre', 'Pierre', '1988-12-05', 'plefebvre@example.com', 'client', NULL, NULL, NULL),
(4, 'mleroy', '81dc9bdb52d04dc20036dbd8313ed055', 'Leroy', 'Marie', '1995-07-18', 'mleroy@example.com', 'client', NULL, NULL, NULL),
(5, 'amartin', '81dc9bdb52d04dc20036dbd8313ed055', 'Martin', 'Alex', '1982-03-28', 'amartin@example.com', 'agent', NULL, NULL, NULL),
(6, 'lpetit', '81dc9bdb52d04dc20036dbd8313ed055', 'Petit', 'Laura', '1989-11-15', 'lpetit@example.com', 'agent', NULL, NULL, NULL),
(7, 'adufrene', '81dc9bdb52d04dc20036dbd8313ed055', 'Dufrène', 'Alice', '1975-01-01', 'adufrene@example.com', 'admin', NULL, NULL, NULL),
(8, 'test', '81dc9bdb52d04dc20036dbd8313ed055', 'Confrere', 'Sébastien', '0000-00-00', 'sconfrere@gmail.com', 'client', NULL, NULL, NULL),
(9, 'sconfrere', '81dc9bdb52d04dc20036dbd8313ed055', 'Sebabou', 'Troubadour', '0000-00-00', 'sconfrere6@gmail.com', 'client', 56, 2147483647, 0);
COMMIT;

DROP TABLE IF EXISTS `panier`;
CREATE TABLE IF NOT EXISTS `panier` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_utilisateur` varchar(100) NOT NULL,
  `id_produit` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `favoris`;
CREATE TABLE IF NOT EXISTS `favoris` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_utilisateur` varchar(100) NOT NULL,
  `id_produit` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `panier` (`id`, `id_utilisateur`, `id_produit`) VALUES
(1, '1', '17'),
(2, '1', '39'),
(3, '4', '28');
COMMIT;

INSERT INTO `favoris` (`id`, `id_utilisateur`, `id_produit`) VALUES
(1, '1', '40'),
(2, '7', '5');
COMMIT;
--
-- Déchargement des données de la table `location`
--

INSERT INTO `location` (`id`, `date_debut`, `date_retour_prevue`, `date_retour_effective`, `prix_total`, `utilisateur_id`, `produit_id`) VALUES
(1, '2025-01-05', '2025-01-09', '2025-01-09', 23.96, 1, 4), -- 4 jours × 5.99
(2, '2025-01-15', '2025-01-18', '2025-01-18', 23.97, 2, 2), -- 3 jours × 7.99
(3, '2025-02-03', '2025-02-05', '2025-02-05', 9.98, 3, 8), -- 2 jours × 4.99
(4, '2025-02-10', '2025-02-12', '2025-02-12', 4.98, 4, 6), -- 2 jours × 2.49
(5, '2025-03-08', '2025-03-12', '2025-03-12', 23.96, 5, 24), -- 4 jours × 5.99
(6, '2025-03-20', '2025-03-25', '2025-03-25', 424.95, 6, 23), -- 5 jours × 84.99
(7, '2025-04-12', '2025-04-14', '2025-04-14', 9.98, 9, 36), -- 2 jours × 4.99
(8, '2025-05-05', '2025-05-08', '2025-05-08', 20.97, 3, 1), -- 3 jours × 6.99
(9, '2025-05-20', '2025-05-22', '2025-05-22', 4.98, 2, 12), -- 2 jours × 2.49
(10, '2025-06-02', '2025-06-06', '2025-06-06', 364.95, 1, 33), -- 5 jours × 72.99
(11, '2025-06-18', '2025-06-21', '2025-06-21', 5.97, 4, 7), -- 3 jours × 1.99
(12, '2025-07-10', '2025-07-14', '2025-07-14', 27.96, 8, 43), -- 4 jours × 6.99
(13, '2025-08-05', '2025-08-10', '2025-08-10', 174.95, 9, 47), -- 5 jours × 34.99
(14, '2025-09-03', '2025-09-07', '2025-09-07', 27.96, 5, 37), -- 4 jours × 6.99
(15, '2025-10-12', '2025-10-16', '2025-10-16', 299.96, 6, 34); -- 4 jours × 74.99
COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
