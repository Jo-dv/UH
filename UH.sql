CREATE DATABASE  IF NOT EXISTS `uh` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `uh`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: uh
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `common_code`
--

DROP TABLE IF EXISTS `common_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `common_code` (
  `group_code` int NOT NULL,
  `common_code` int NOT NULL,
  `code_name` varchar(255) NOT NULL,
  PRIMARY KEY (`common_code`),
  KEY `common_code_to_group_code_fk_idx` (`group_code`),
  CONSTRAINT `common_code_to_group_code_fk` FOREIGN KEY (`group_code`) REFERENCES `group_code` (`group_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `common_code`
--

LOCK TABLES `common_code` WRITE;
/*!40000 ALTER TABLE `common_code` DISABLE KEYS */;
INSERT INTO `common_code` VALUES (100,101,'고요 속의 외침'),(100,102,'인물 맞추기'),(200,201,'인물');
/*!40000 ALTER TABLE `common_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `feedback_id` int NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `feedback_content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`feedback_id`),
  KEY `user_seq_idx` (`user_seq`),
  CONSTRAINT `user_seq` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friends` (
  `friends_id` int NOT NULL AUTO_INCREMENT,
  `from_user_seq` int NOT NULL,
  `to_user_seq` int NOT NULL,
  `friends_state` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`friends_id`),
  KEY `friends_from_user_id_fk_idx` (`from_user_seq`),
  KEY `friends_to_user_id_fk_idx` (`to_user_seq`),
  CONSTRAINT `friends_from_user_id_fk` FOREIGN KEY (`from_user_seq`) REFERENCES `user` (`user_seq`),
  CONSTRAINT `friends_to_user_id_fk` FOREIGN KEY (`to_user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
INSERT INTO `friends` VALUES (3,1,2,1);
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_result`
--

DROP TABLE IF EXISTS `game_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_result` (
  `result_id` int NOT NULL AUTO_INCREMENT,
  `user1` int DEFAULT NULL,
  `user2` int DEFAULT NULL,
  `user3` int DEFAULT NULL,
  `user4` int DEFAULT NULL,
  `game_category` int NOT NULL,
  `score` int NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `win` tinyint NOT NULL,
  PRIMARY KEY (`result_id`),
  KEY `result_user1_fk_idx` (`user1`,`user2`,`user3`,`user4`),
  KEY `result_user2_fk_idx` (`user2`),
  KEY `result_user3_fk_idx` (`user3`),
  KEY `result_user4_fk_idx` (`user4`),
  KEY `result_game_category_fk_idx` (`game_category`),
  CONSTRAINT `result_game_category_fk` FOREIGN KEY (`game_category`) REFERENCES `common_code` (`common_code`),
  CONSTRAINT `result_user1_fk` FOREIGN KEY (`user1`) REFERENCES `user` (`user_seq`),
  CONSTRAINT `result_user2_fk` FOREIGN KEY (`user2`) REFERENCES `user` (`user_seq`),
  CONSTRAINT `result_user3_fk` FOREIGN KEY (`user3`) REFERENCES `user` (`user_seq`),
  CONSTRAINT `result_user4_fk` FOREIGN KEY (`user4`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_result`
--

LOCK TABLES `game_result` WRITE;
/*!40000 ALTER TABLE `game_result` DISABLE KEYS */;
INSERT INTO `game_result` VALUES (3,3,NULL,NULL,NULL,102,300,'2024-01-26 17:11:56',1),(4,3,NULL,NULL,NULL,102,20,'2024-01-26 17:11:56',0);
/*!40000 ALTER TABLE `game_result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_code`
--

DROP TABLE IF EXISTS `group_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_code` (
  `group_code` int NOT NULL,
  `group_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`group_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_code`
--

LOCK TABLES `group_code` WRITE;
/*!40000 ALTER TABLE `group_code` DISABLE KEYS */;
INSERT INTO `group_code` VALUES (100,'게임 종류'),(200,'퀴즈 카테고리');
/*!40000 ALTER TABLE `group_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_person`
--

DROP TABLE IF EXISTS `quiz_person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_person` (
  `quiz_id` int NOT NULL AUTO_INCREMENT,
  `quiz_answer` varchar(255) NOT NULL,
  PRIMARY KEY (`quiz_id`)
) ENGINE=InnoDB AUTO_INCREMENT=401 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_person`
--

LOCK TABLES `quiz_person` WRITE;
/*!40000 ALTER TABLE `quiz_person` DISABLE KEYS */;
INSERT INTO `quiz_person` VALUES (1,'남궁원'),(2,'안성기'),(3,'조용필'),(4,'김창완'),(5,'정혜선'),(6,'이순재'),(7,'조영남'),(8,'전헌태'),(9,'최불암'),(10,'유인촌'),(11,'정동환'),(12,'이병헌'),(13,'김동완'),(14,'이정재'),(15,'조혜련'),(16,'최수종'),(17,'김혜수'),(18,'신구'),(19,'윤여정'),(20,'이효리'),(21,'고두심'),(22,'인순이'),(23,'송현'),(24,'신영균'),(25,'정보석'),(26,'조재현'),(27,'김영애'),(28,'전진'),(29,'정영숙'),(30,'유준상'),(31,'김명곤'),(32,'에릭'),(33,'강부자'),(34,'정애리'),(35,'강신성일'),(36,'이영애'),(37,'김희애'),(38,'박근형'),(39,'성유리'),(40,'김건모'),(41,'문성근'),(42,'양희은'),(43,'보아'),(44,'윤형주'),(45,'이민우'),(46,'이승철'),(47,'박상원'),(48,'전도연'),(49,'정태춘'),(50,'비'),(51,'정준호'),(52,'차승원'),(53,'안석환'),(54,'홍석천'),(55,'조형기'),(56,'류시원'),(57,'정두홍'),(58,'천호진'),(59,'권해효'),(60,'한진희'),(61,'김현철'),(62,'이덕화'),(63,'이선희'),(64,'차인표'),(65,'장동건'),(66,'장두이'),(67,'하정우'),(68,'차태현'),(69,'이경영'),(70,'주현미'),(71,'앤디'),(72,'유지태'),(73,'정한용'),(74,'동방우'),(75,'전지현'),(76,'엄정화'),(77,'송강호'),(78,'안재욱'),(79,'김영철'),(80,'황정순'),(81,'손병호'),(82,'김희선'),(83,'이현우'),(84,'박규채'),(85,'이정현'),(86,'김상중'),(87,'김민종'),(88,'김혜자'),(89,'조민기'),(90,'채시라'),(91,'이미자'),(92,'이범수'),(93,'황정민'),(94,'김수미'),(95,'하지원'),(96,'라미란'),(97,'박진영'),(98,'염정아'),(99,'정웅인'),(100,'희철'),(101,'이성만'),(102,'하희라'),(103,'태진아'),(104,'임창정'),(105,'신혜성'),(106,'심혜진'),(107,'이정길'),(108,'심형래'),(109,'김원준'),(110,'정우성'),(111,'하춘화'),(112,'최민수'),(113,'김미숙'),(114,'나문희'),(115,'김해숙'),(116,'패티김'),(117,'김성원'),(118,'허준호'),(119,'옥주현'),(120,'박인환'),(121,'정원중'),(122,'윤종신'),(123,'박중훈'),(124,'임현식'),(125,'최지우'),(126,'바다'),(127,'이문세'),(128,'장나라'),(129,'이경규'),(130,'강석우'),(131,'조성모'),(132,'길용우'),(133,'최진실'),(134,'양의식'),(135,'강호동'),(136,'신현준'),(137,'조인성'),(138,'문소리'),(139,'유동근'),(140,'문근영'),(141,'이미숙'),(142,'이홍렬'),(143,'아이유'),(144,'윤도현'),(145,'최명길'),(146,'김선아'),(147,'황신혜'),(148,'이주일'),(149,'조승우'),(150,'신동엽'),(151,'설경구'),(152,'이지훈'),(153,'조진웅'),(154,'서세원'),(155,'윤유선'),(156,'채림'),(157,'박영규'),(158,'최일화'),(159,'손예진'),(160,'김선경'),(161,'장윤정'),(162,'양미경'),(163,'이진'),(164,'이승기'),(165,'RM'),(166,'강수연'),(167,'김민기'),(168,'이미연'),(169,'시완'),(170,'오정세'),(171,'이성민'),(172,'이경실'),(173,'오현경'),(174,'이상은'),(175,'강신일'),(176,'김규리'),(177,'손현주'),(178,'김성령'),(179,'안치환'),(180,'최주봉'),(181,'배용준'),(182,'슈'),(183,'최민식'),(184,'신은경'),(185,'장혁'),(186,'예지원'),(187,'소지섭'),(188,'유진'),(189,'김승우'),(190,'조관우'),(191,'현영'),(192,'장미희'),(193,'이승환'),(194,'신해철'),(195,'정성갑'),(196,'김원해'),(197,'배두나'),(198,'정은표'),(199,'고수'),(200,'이재은'),(201,'조희봉'),(202,'전영록'),(203,'박웅'),(204,'윤복희'),(205,'이적'),(206,'방은진'),(207,'정국'),(208,'송혜교'),(209,'한석규'),(210,'성동일'),(211,'공효진'),(212,'신성우'),(213,'최정우'),(214,'윤문식'),(215,'김을동'),(216,'진선규'),(217,'양동근'),(218,'토니안'),(219,'정수라'),(220,'정찬우'),(221,'이광필'),(222,'김현주'),(223,'이선균'),(224,'정경순'),(225,'장서희'),(226,'정준하'),(227,'배종옥'),(228,'이수만'),(229,'김상희'),(230,'재범'),(231,'전영월'),(232,'전유성'),(233,'임하룡'),(234,'지진희'),(235,'김수로'),(236,'김국진'),(237,'강수지'),(238,'장민호'),(239,'김청'),(240,'유열'),(241,'제이홉'),(242,'김태희'),(243,'현숙'),(244,'정태우'),(245,'선우재덕'),(246,'서태지'),(247,'유재석'),(248,'김태균'),(249,'남진'),(250,'양희경'),(251,'진'),(252,'김소연'),(253,'손창민'),(254,'강타'),(255,'백일섭'),(256,'대성'),(257,'정은아'),(258,'유승준'),(259,'한영애'),(260,'이은미'),(261,'양진석'),(262,'뷔'),(263,'택연'),(264,'윤제문'),(265,'정려원'),(266,'김명민'),(267,'김지호'),(268,'김영란'),(269,'정성모'),(270,'여운계'),(271,'김창숙'),(272,'홍록기'),(273,'오지호'),(274,'최재성'),(275,'탁재훈'),(276,'한지민'),(277,'송일국'),(278,'김민정'),(279,'남희석'),(280,'신중현'),(281,'최진희'),(282,'현빈'),(283,'최강희'),(284,'진경'),(285,'홍경인'),(286,'은정'),(287,'이종원'),(288,'슈가'),(289,'정은지'),(290,'전원주'),(291,'정욱'),(292,'박보영'),(293,'마동석'),(294,'안내상'),(295,'김정은'),(296,'윤계상'),(297,'이보영'),(298,'김미화'),(299,'나르샤'),(300,'박상면'),(301,'김창렬'),(302,'김석훈'),(303,'김종국'),(304,'조권'),(305,'한대수'),(306,'신애라'),(307,'한고은'),(308,'엄태웅'),(309,'서경석'),(310,'전석호'),(311,'윤주상'),(312,'지성'),(313,'김원희'),(314,'이혜숙'),(315,'윤다훈'),(316,'최병학'),(317,'이주노'),(318,'심수봉'),(319,'추상미'),(320,'성룡'),(321,'최덕문'),(322,'조정석'),(323,'김응수'),(324,'신민아'),(325,'지민'),(326,'김종서'),(327,'준호'),(328,'이혜영'),(329,'김진표'),(330,'주현'),(331,'엠케이'),(332,'김남주'),(333,'장진영'),(334,'유오성'),(335,'정만식'),(336,'정재영'),(337,'나훈아'),(338,'이혜영'),(339,'김래원'),(340,'정진운'),(341,'변우민'),(342,'차화연'),(343,'정용화'),(344,'김갑수'),(345,'김하늘'),(346,'오연수'),(347,'정형돈'),(348,'김학철'),(349,'윤손하'),(350,'홍승기'),(351,'박정수'),(352,'박철민'),(353,'최백호'),(354,'지현우'),(355,'이휘재'),(356,'독고영재'),(357,'이영하'),(358,'정승호'),(359,'김윤아'),(360,'박지윤'),(361,'정상철'),(362,'지드래곤'),(363,'김성겸'),(364,'사미자'),(365,'김민희'),(366,'최양락'),(367,'김용건'),(368,'이문식'),(369,'성지루'),(370,'권상우'),(371,'최강창민'),(372,'박상민'),(373,'이창민'),(374,'안재모'),(375,'강성연'),(376,'고소영'),(377,'현철'),(378,'혜은이'),(379,'양금석'),(380,'지일주'),(381,'김태우'),(382,'정찬'),(383,'김완선'),(384,'김여진'),(385,'유승호'),(386,'데니안'),(387,'이나영'),(388,'이대연'),(389,'주지훈'),(390,'채정안'),(391,'이서진'),(392,'김혜선'),(393,'신하균'),(394,'서인석'),(395,'박산다라'),(396,'송윤아'),(397,'송옥숙'),(398,'가인'),(399,'박소현'),(400,'전양자');
/*!40000 ALTER TABLE `quiz_person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_shout`
--

DROP TABLE IF EXISTS `quiz_shout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_shout` (
  `quiz_id` int NOT NULL AUTO_INCREMENT,
  `quiz_answer` varchar(255) NOT NULL,
  PRIMARY KEY (`quiz_id`)
) ENGINE=InnoDB AUTO_INCREMENT=401 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_shout`
--

LOCK TABLES `quiz_shout` WRITE;
/*!40000 ALTER TABLE `quiz_shout` DISABLE KEYS */;
INSERT INTO `quiz_shout` VALUES (1,'남궁원'),(2,'안성기'),(3,'조용필'),(4,'김창완'),(5,'정혜선'),(6,'이순재'),(7,'조영남'),(8,'전헌태'),(9,'최불암'),(10,'유인촌'),(11,'정동환'),(12,'이병헌'),(13,'김동완'),(14,'이정재'),(15,'조혜련'),(16,'최수종'),(17,'김혜수'),(18,'신구'),(19,'윤여정'),(20,'이효리'),(21,'고두심'),(22,'인순이'),(23,'송현'),(24,'신영균'),(25,'정보석'),(26,'조재현'),(27,'김영애'),(28,'전진'),(29,'정영숙'),(30,'유준상'),(31,'김명곤'),(32,'에릭'),(33,'강부자'),(34,'정애리'),(35,'강신성일'),(36,'이영애'),(37,'김희애'),(38,'박근형'),(39,'성유리'),(40,'김건모'),(41,'문성근'),(42,'양희은'),(43,'보아'),(44,'윤형주'),(45,'이민우'),(46,'이승철'),(47,'박상원'),(48,'전도연'),(49,'정태춘'),(50,'비'),(51,'정준호'),(52,'차승원'),(53,'안석환'),(54,'홍석천'),(55,'조형기'),(56,'류시원'),(57,'정두홍'),(58,'천호진'),(59,'권해효'),(60,'한진희'),(61,'김현철'),(62,'이덕화'),(63,'이선희'),(64,'차인표'),(65,'장동건'),(66,'장두이'),(67,'하정우'),(68,'차태현'),(69,'이경영'),(70,'주현미'),(71,'앤디'),(72,'유지태'),(73,'정한용'),(74,'동방우'),(75,'전지현'),(76,'엄정화'),(77,'송강호'),(78,'안재욱'),(79,'김영철'),(80,'황정순'),(81,'손병호'),(82,'김희선'),(83,'이현우'),(84,'박규채'),(85,'이정현'),(86,'김상중'),(87,'김민종'),(88,'김혜자'),(89,'조민기'),(90,'채시라'),(91,'이미자'),(92,'이범수'),(93,'황정민'),(94,'김수미'),(95,'하지원'),(96,'라미란'),(97,'박진영'),(98,'염정아'),(99,'정웅인'),(100,'희철'),(101,'이성만'),(102,'하희라'),(103,'태진아'),(104,'임창정'),(105,'신혜성'),(106,'심혜진'),(107,'이정길'),(108,'심형래'),(109,'김원준'),(110,'정우성'),(111,'하춘화'),(112,'최민수'),(113,'김미숙'),(114,'나문희'),(115,'김해숙'),(116,'패티김'),(117,'김성원'),(118,'허준호'),(119,'옥주현'),(120,'박인환'),(121,'정원중'),(122,'윤종신'),(123,'박중훈'),(124,'임현식'),(125,'최지우'),(126,'바다'),(127,'이문세'),(128,'장나라'),(129,'이경규'),(130,'강석우'),(131,'조성모'),(132,'길용우'),(133,'최진실'),(134,'양의식'),(135,'강호동'),(136,'신현준'),(137,'조인성'),(138,'문소리'),(139,'유동근'),(140,'문근영'),(141,'이미숙'),(142,'이홍렬'),(143,'아이유'),(144,'윤도현'),(145,'최명길'),(146,'김선아'),(147,'황신혜'),(148,'이주일'),(149,'조승우'),(150,'신동엽'),(151,'설경구'),(152,'이지훈'),(153,'조진웅'),(154,'서세원'),(155,'윤유선'),(156,'채림'),(157,'박영규'),(158,'최일화'),(159,'손예진'),(160,'김선경'),(161,'장윤정'),(162,'양미경'),(163,'이진'),(164,'이승기'),(165,'RM'),(166,'강수연'),(167,'김민기'),(168,'이미연'),(169,'시완'),(170,'오정세'),(171,'이성민'),(172,'이경실'),(173,'오현경'),(174,'이상은'),(175,'강신일'),(176,'김규리'),(177,'손현주'),(178,'김성령'),(179,'안치환'),(180,'최주봉'),(181,'배용준'),(182,'슈'),(183,'최민식'),(184,'신은경'),(185,'장혁'),(186,'예지원'),(187,'소지섭'),(188,'유진'),(189,'김승우'),(190,'조관우'),(191,'현영'),(192,'장미희'),(193,'이승환'),(194,'신해철'),(195,'정성갑'),(196,'김원해'),(197,'배두나'),(198,'정은표'),(199,'고수'),(200,'이재은'),(201,'조희봉'),(202,'전영록'),(203,'박웅'),(204,'윤복희'),(205,'이적'),(206,'방은진'),(207,'정국'),(208,'송혜교'),(209,'한석규'),(210,'성동일'),(211,'공효진'),(212,'신성우'),(213,'최정우'),(214,'윤문식'),(215,'김을동'),(216,'진선규'),(217,'양동근'),(218,'토니안'),(219,'정수라'),(220,'정찬우'),(221,'이광필'),(222,'김현주'),(223,'이선균'),(224,'정경순'),(225,'장서희'),(226,'정준하'),(227,'배종옥'),(228,'이수만'),(229,'김상희'),(230,'재범'),(231,'전영월'),(232,'전유성'),(233,'임하룡'),(234,'지진희'),(235,'김수로'),(236,'김국진'),(237,'강수지'),(238,'장민호'),(239,'김청'),(240,'유열'),(241,'제이홉'),(242,'김태희'),(243,'현숙'),(244,'정태우'),(245,'선우재덕'),(246,'서태지'),(247,'유재석'),(248,'김태균'),(249,'남진'),(250,'양희경'),(251,'진'),(252,'김소연'),(253,'손창민'),(254,'강타'),(255,'백일섭'),(256,'대성'),(257,'정은아'),(258,'유승준'),(259,'한영애'),(260,'이은미'),(261,'양진석'),(262,'뷔'),(263,'택연'),(264,'윤제문'),(265,'정려원'),(266,'김명민'),(267,'김지호'),(268,'김영란'),(269,'정성모'),(270,'여운계'),(271,'김창숙'),(272,'홍록기'),(273,'오지호'),(274,'최재성'),(275,'탁재훈'),(276,'한지민'),(277,'송일국'),(278,'김민정'),(279,'남희석'),(280,'신중현'),(281,'최진희'),(282,'현빈'),(283,'최강희'),(284,'진경'),(285,'홍경인'),(286,'은정'),(287,'이종원'),(288,'슈가'),(289,'정은지'),(290,'전원주'),(291,'정욱'),(292,'박보영'),(293,'마동석'),(294,'안내상'),(295,'김정은'),(296,'윤계상'),(297,'이보영'),(298,'김미화'),(299,'나르샤'),(300,'박상면'),(301,'김창렬'),(302,'김석훈'),(303,'김종국'),(304,'조권'),(305,'한대수'),(306,'신애라'),(307,'한고은'),(308,'엄태웅'),(309,'서경석'),(310,'전석호'),(311,'윤주상'),(312,'지성'),(313,'김원희'),(314,'이혜숙'),(315,'윤다훈'),(316,'최병학'),(317,'이주노'),(318,'심수봉'),(319,'추상미'),(320,'성룡'),(321,'최덕문'),(322,'조정석'),(323,'김응수'),(324,'신민아'),(325,'지민'),(326,'김종서'),(327,'준호'),(328,'이혜영'),(329,'김진표'),(330,'주현'),(331,'엠케이'),(332,'김남주'),(333,'장진영'),(334,'유오성'),(335,'정만식'),(336,'정재영'),(337,'나훈아'),(338,'이혜영'),(339,'김래원'),(340,'정진운'),(341,'변우민'),(342,'차화연'),(343,'정용화'),(344,'김갑수'),(345,'김하늘'),(346,'오연수'),(347,'정형돈'),(348,'김학철'),(349,'윤손하'),(350,'홍승기'),(351,'박정수'),(352,'박철민'),(353,'최백호'),(354,'지현우'),(355,'이휘재'),(356,'독고영재'),(357,'이영하'),(358,'정승호'),(359,'김윤아'),(360,'박지윤'),(361,'정상철'),(362,'지드래곤'),(363,'김성겸'),(364,'사미자'),(365,'김민희'),(366,'최양락'),(367,'김용건'),(368,'이문식'),(369,'성지루'),(370,'권상우'),(371,'최강창민'),(372,'박상민'),(373,'이창민'),(374,'안재모'),(375,'강성연'),(376,'고소영'),(377,'현철'),(378,'혜은이'),(379,'양금석'),(380,'지일주'),(381,'김태우'),(382,'정찬'),(383,'김완선'),(384,'김여진'),(385,'유승호'),(386,'데니안'),(387,'이나영'),(388,'이대연'),(389,'주지훈'),(390,'채정안'),(391,'이서진'),(392,'김혜선'),(393,'신하균'),(394,'서인석'),(395,'박산다라'),(396,'송윤아'),(397,'송옥숙'),(398,'가인'),(399,'박소현'),(400,'전양자');
/*!40000 ALTER TABLE `quiz_shout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `rank_person`
--

DROP TABLE IF EXISTS `rank_person`;
/*!50001 DROP VIEW IF EXISTS `rank_person`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `rank_person` AS SELECT 
 1 AS `result_id`,
 1 AS `user1`,
 1 AS `user2`,
 1 AS `user3`,
 1 AS `user4`,
 1 AS `score`,
 1 AS `created`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `rank_shout`
--

DROP TABLE IF EXISTS `rank_shout`;
/*!50001 DROP VIEW IF EXISTS `rank_shout`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `rank_shout` AS SELECT 
 1 AS `result_id`,
 1 AS `user1`,
 1 AS `user2`,
 1 AS `user3`,
 1 AS `user4`,
 1 AS `score`,
 1 AS `created`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `rank_user`
--

DROP TABLE IF EXISTS `rank_user`;
/*!50001 DROP VIEW IF EXISTS `rank_user`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `rank_user` AS SELECT 
 1 AS `user_seq`,
 1 AS `user_id`,
 1 AS `user_nickname`,
 1 AS `rating`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `social_token`
--

DROP TABLE IF EXISTS `social_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social_token` (
  `token_id` int NOT NULL AUTO_INCREMENT,
  `user_seq` int NOT NULL,
  `social_provider` int NOT NULL,
  `social_user_id` varchar(255) NOT NULL,
  `access_token` varchar(255) NOT NULL,
  `expires_in` datetime NOT NULL,
  PRIMARY KEY (`token_id`),
  KEY `user_seq` (`user_seq`),
  CONSTRAINT `social_token_ibfk_1` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_token`
--

LOCK TABLES `social_token` WRITE;
/*!40000 ALTER TABLE `social_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `social_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_seq` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_nickname` varchar(255) DEFAULT NULL,
  `rating` int NOT NULL DEFAULT '1000',
  PRIMARY KEY (`user_seq`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `user_nickname_UNIQUE` (`user_nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'qwfqw','qfqf','qfqf',14124),(2,'qwfqwqs','qfqf','qfqfqwfq',1001240),(3,'fwfe','qfef','fewfwe',1000),(4,'fwfeqs','qfef','fewG3Rq',1000);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `rank_person`
--

/*!50001 DROP VIEW IF EXISTS `rank_person`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `rank_person` AS select `game_result`.`result_id` AS `result_id`,`u1`.`user_nickname` AS `user1`,`u2`.`user_nickname` AS `user2`,`u3`.`user_nickname` AS `user3`,`u4`.`user_nickname` AS `user4`,`game_result`.`score` AS `score`,`game_result`.`created` AS `created` from ((((`game_result` left join `user` `u1` on((`game_result`.`user1` = `u1`.`user_seq`))) left join `user` `u2` on((`game_result`.`user2` = `u2`.`user_seq`))) left join `user` `u3` on((`game_result`.`user3` = `u3`.`user_seq`))) left join `user` `u4` on((`game_result`.`user4` = `u4`.`user_seq`))) where (`game_result`.`game_category` = 102) order by `game_result`.`score` desc limit 10 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `rank_shout`
--

/*!50001 DROP VIEW IF EXISTS `rank_shout`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `rank_shout` AS select `game_result`.`result_id` AS `result_id`,`u1`.`user_nickname` AS `user1`,`u2`.`user_nickname` AS `user2`,`u3`.`user_nickname` AS `user3`,`u4`.`user_nickname` AS `user4`,`game_result`.`score` AS `score`,`game_result`.`created` AS `created` from ((((`game_result` left join `user` `u1` on((`game_result`.`user1` = `u1`.`user_seq`))) left join `user` `u2` on((`game_result`.`user2` = `u2`.`user_seq`))) left join `user` `u3` on((`game_result`.`user3` = `u3`.`user_seq`))) left join `user` `u4` on((`game_result`.`user4` = `u4`.`user_seq`))) where (`game_result`.`game_category` = 101) order by `game_result`.`score` desc limit 10 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `rank_user`
--

/*!50001 DROP VIEW IF EXISTS `rank_user`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `rank_user` AS select `user`.`user_seq` AS `user_seq`,`user`.`user_id` AS `user_id`,`user`.`user_nickname` AS `user_nickname`,`user`.`rating` AS `rating` from `user` order by `user`.`rating` desc limit 10 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-01 17:21:36
