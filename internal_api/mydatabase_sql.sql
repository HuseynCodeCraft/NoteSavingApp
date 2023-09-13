-- MariaDB dump 10.19  Distrib 10.11.4-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: sampledb
-- ------------------------------------------------------
-- Server version	10.11.4-MariaDB-1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_users` (
  `id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES
('22a2a414-fb79-468e-9029-4ab6c092e851','huseyna12','$2b$10$.aMzqTQR9sKxqUoCZfgVJ.AX8Y44kghRInWM4t9IA0NAvjSQdfYTi','2023-09-09 19:58:48'),
('2d339cff-cb62-46ba-a8cf-f31d408cea9e','huseyna12','$2b$10$T29GUFX/1DZdZGKzF4YP3.LmON7e.y27d2ggIN3/LqLGiOhq9ouNG','2023-09-09 20:53:35'),
('4f56a20d-2b02-401b-9030-91c0146f9398','huseyna12','$2b$10$Xv8v3PrpJzxKtMnuPqc7T.NeJaMqbpVJMv8BpNAUFdsBvcrur/nGK','2023-09-09 19:58:56'),
('6b2e97fe-d466-48b5-8efe-a8e584a8578c','huseyna12','$2b$10$cmXcZ.LrxKO9dtDp8HUon.SnehZXQgRsu9BP9XEdkbLo1KRRrEsdu','2023-09-09 19:58:57'),
('8e73c3ab-7255-4d5d-953c-ff4d8a91c252','huseyna12','$2b$10$tk/DyKFO5cXD26PXdCkfRObQfiRp9YZFdax1p7bIiBMNOgUX31eha','2023-09-09 20:53:21'),
('a5908c5a-2de2-4664-a0d0-ecdc353ad98b','huseyna12','$2b$10$m3RpyU8rlOsQ8x/13jKTkeIFCsLf2V1..X/rRKED5K2kd4nEkepVa','2023-09-09 19:58:41'),
('e9c24626-13b5-47b7-9728-b5608a19a682','huseyna12','$2b$10$NFzoOgDdQKjU1aPY072IzOCjhvqLKmLiFecfDaeHAHjildYYB3QyG','2023-08-22 17:50:20'),
('f9fce1d1-51f2-403a-bf04-f1edae2b9f7b','huseyna12','$2b$10$Si8qI4vS35/bIoJlXrV/MuR8zBrvm4ck/nV7LCBCQIGshIFE70dee','2023-08-23 12:04:33');
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_notes`
--

DROP TABLE IF EXISTS `user_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_notes` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_notes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_notes`
--

LOCK TABLES `user_notes` WRITE;
/*!40000 ALTER TABLE `user_notes` DISABLE KEYS */;
INSERT INTO `user_notes` VALUES
('25a25930-9b61-4b52-aff4-898ccf727167','4d925120-4792-4323-8bff-1c04f9437b71','thsa','this is uspdated','2023-08-22 17:49:51'),
('3027da9d-050c-422d-a170-f989d3f9f149','4d925120-4792-4323-8bff-1c04f9437b71','thsa','this is uspdated','2023-08-22 17:49:24'),
('3dbb7c08-f7e5-450c-9f55-33c010ecaa07','4d925120-4792-4323-8bff-1c04f9437b71','thsa','this is uspdated','2023-08-22 17:47:08'),
('83968239-2671-471e-8058-4c54b7cd73cc','4d925120-4792-4323-8bff-1c04f9437b71','thsa','this is uspdated','2023-08-22 17:47:44'),
('b257dc3b-e977-4155-b202-bf267cf580a9','4d925120-4792-4323-8bff-1c04f9437b71','thsa','this is uspdated','2023-08-22 17:47:20'),
('b8ec4ade-64f9-4997-b154-12b795f3324a','4d925120-4792-4323-8bff-1c04f9437b71','thsa','this is uspdated','2023-09-07 23:56:38'),
('ccda3ee8-182e-49f4-886d-9b8297f01584','4d925120-4792-4323-8bff-1c04f9437b71','thsa','this is uspdated','2023-09-09 19:53:42'),
('f01a670c-2cb8-44e5-a250-3f4f48c6e43c','4d925120-4792-4323-8bff-1c04f9437b71','thsa','this is uspdated','2023-08-22 17:44:09'),
('f1af0e2c-667c-48cc-9c6e-54e2f54a1c97','4d925120-4792-4323-8bff-1c04f9437b71','thsa','this is uspdated','2023-08-22 17:45:07');
/*!40000 ALTER TABLE `user_notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
('4d925120-4792-4323-8bff-1c04f9437b71','huseyna12','$2b$10$TInpzTdV5WZDfbJqmbIZeuuj2xvHLViL.teL9NvkzcvZvBzZRjN8u',12,'huseyn.aghazada@prosol.az','2023-08-22 17:34:41');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-10 14:26:45
