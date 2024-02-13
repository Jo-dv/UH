-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: i10e201.p.ssafy.io    Database: uh
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (10,61,'방설정이 되지않습니당!'),(11,60,'방생성이 안돼요'),(12,62,'마음의 준비를 위해 어떤 게임에서 어떤 권한을 필요하는지 설명이 있으면 좋을 것 같습니다!'),(13,66,'asdf'),(14,66,'asdfasdf'),(15,67,'df'),(16,67,'방이 안만들어져요\n'),(17,81,'닉네임에 쌍기윽 들어갔을때 안되요 !!'),(18,88,'인원수가 부족할때 게임 시작 버튼을 누르면 \'인원부족\' 경고창이 떠야할 것 같습니다! 현재는 콘솔창에만 뜨네요 사용자가 왜 시작을 안하는지 모를 것 같습니다'),(19,89,'캬 피드백 창이 늘어났네요\n시원시원하고 보기 좋네요');
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
INSERT INTO `friends` VALUES (4,83,57,1),(5,83,53,1),(6,101,95,0),(7,101,52,1),(9,102,80,0),(10,102,73,0),(11,104,102,0),(12,80,73,0),(13,89,103,0),(14,57,103,0),(15,52,57,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_result`
--

LOCK TABLES `game_result` WRITE;
/*!40000 ALTER TABLE `game_result` DISABLE KEYS */;
INSERT INTO `game_result` VALUES (33,57,78,NULL,NULL,102,8,'2024-02-09 13:56:46',1),(34,70,71,NULL,NULL,102,7,'2024-02-09 13:56:46',0),(35,70,71,NULL,NULL,102,11,'2024-02-09 14:00:41',1),(36,57,78,NULL,NULL,102,7,'2024-02-09 14:00:41',0),(37,57,78,NULL,NULL,102,13,'2024-02-09 14:04:07',1),(38,70,71,NULL,NULL,102,6,'2024-02-09 14:04:07',0),(39,83,85,NULL,NULL,102,29,'2024-02-10 05:27:03',1),(40,84,81,NULL,NULL,102,9,'2024-02-10 05:27:03',0),(41,83,85,NULL,NULL,102,29,'2024-02-10 05:32:42',1),(42,84,81,NULL,NULL,102,21,'2024-02-10 05:32:42',0),(43,53,91,NULL,NULL,102,22,'2024-02-10 17:20:48',1),(44,90,57,NULL,NULL,102,15,'2024-02-10 17:20:48',0),(45,57,52,NULL,NULL,102,41,'2024-02-12 05:01:17',1),(46,73,95,NULL,NULL,102,0,'2024-02-12 05:01:17',0),(47,57,52,NULL,NULL,102,30,'2024-02-12 05:04:52',1),(48,73,95,NULL,NULL,102,2,'2024-02-12 05:04:52',0),(49,52,53,NULL,NULL,102,44,'2024-02-12 15:10:19',1),(50,57,83,NULL,NULL,102,28,'2024-02-12 15:10:19',0),(51,57,53,NULL,NULL,102,6,'2024-02-12 15:57:47',1),(52,83,52,NULL,NULL,102,0,'2024-02-12 15:57:47',0),(53,80,57,NULL,NULL,102,7,'2024-02-13 00:47:59',1),(54,96,73,NULL,NULL,102,1,'2024-02-13 00:47:59',0),(55,103,103,NULL,NULL,101,10,'2024-02-13 01:18:08',1),(56,103,103,NULL,NULL,101,5,'2024-02-13 01:18:08',0);
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
  `quiz_answer` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`quiz_id`)
) ENGINE=InnoDB AUTO_INCREMENT=201 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_person`
--

LOCK TABLES `quiz_person` WRITE;
/*!40000 ALTER TABLE `quiz_person` DISABLE KEYS */;
INSERT INTO `quiz_person` VALUES (1,'오정세'),(2,'김병철'),(3,'조우진'),(4,'진선규'),(5,'송승헌'),(6,'김해숙'),(7,'이서'),(8,'권은비'),(9,'아이린'),(10,'김성철'),(11,'송강'),(12,'김민재'),(13,'김민재'),(14,'여진구'),(15,'뷔'),(16,'조슈아'),(17,'강혜원'),(18,'최정훈'),(19,'박재범'),(20,'노주현'),(21,'이덕화'),(22,'이도현'),(23,'김영철'),(24,'정우'),(25,'최강창민'),(26,'김재중'),(27,'닉쿤'),(28,'문별'),(29,'비비'),(30,'현아'),(31,'케이윌'),(32,'사이먼 디'),(33,'민니'),(34,'해원'),(35,'권정열'),(36,'로버트 다우니 주니어'),(37,'하니'),(38,'유이'),(39,'황광희'),(40,'김소혜'),(41,'정채연'),(42,'김남길'),(43,'송중기'),(44,'혜리'),(45,'장기용'),(46,'임지연'),(47,'진기주'),(48,'서예지'),(49,'침착맨'),(50,'노윤서'),(51,'이창호'),(52,'휴잭맨'),(53,'카더가든'),(54,'박해수'),(55,'기무라 타쿠야'),(56,'김채원'),(57,'김재현'),(58,'조승우'),(59,'유해진'),(60,'이승우'),(61,'김원훈'),(62,'강승윤'),(63,'마크'),(64,'호시'),(65,'조현아'),(66,'닝닝'),(67,'주우재'),(68,'옥주현'),(69,'리즈'),(70,'소희'),(71,'이창섭'),(72,'소유'),(73,'공민지'),(74,'백예린'),(75,'박지민'),(76,'그레이'),(77,'베네딕트 컴버베치'),(78,'오킹'),(79,'민혁'),(80,'허니제이'),(81,'최예나'),(82,'이하이'),(83,'도경수'),(84,'고아라'),(85,'장원영'),(86,'박정민'),(87,'조정석'),(88,'전도연'),(89,'정경호'),(90,'크리스탈'),(91,'이종석'),(92,'장기하'),(93,'성동일'),(94,'톰 홀랜드'),(95,'다나카'),(96,'엄태구'),(97,'유지태'),(98,'전종서'),(99,'이선빈'),(100,'전여빈'),(101,'천우희'),(102,'이용진'),(103,'오은영'),(104,'조니뎁'),(105,'서인국'),(106,'안보현'),(107,'민지'),(108,'사쿠라'),(109,'지창욱'),(110,'김지원'),(111,'유재명'),(112,'홍광호'),(113,'박신혜'),(114,'이지아'),(115,'이상이'),(116,'고민시'),(117,'민호'),(118,'강하늘'),(119,'공효진'),(120,'이준기'),(121,'윤시윤'),(122,'다현'),(123,'지수'),(124,'이홍기'),(125,'김혜수'),(126,'설인아'),(127,'김수현'),(128,'리아'),(129,'고현정'),(130,'신민아'),(131,'장도연'),(132,'성규'),(133,'강동원'),(134,'이동욱'),(135,'보미'),(136,'미미'),(137,'임시완'),(138,'윤두준'),(139,'규현'),(140,'신세경'),(141,'서강준'),(142,'최현욱'),(143,'웬디'),(144,'대성'),(145,'오연서'),(146,'신예은'),(147,'유정'),(148,'손석구'),(149,'남주혁'),(150,'홍종현'),(151,'김유연'),(152,'하니'),(153,'도겸'),(154,'박규영'),(155,'신정근'),(156,'규진'),(157,'강예서'),(158,'배해선'),(159,'황정민'),(160,'조성하'),(161,'이유미'),(162,'강민경'),(163,'선미'),(164,'정보석'),(165,'버논'),(166,'원빈'),(167,'우기'),(168,'한지현'),(169,'박형식'),(170,'이은샘'),(171,'유주'),(172,'연희'),(173,'이채연'),(174,'김영대'),(175,'부승관'),(176,'차은우'),(177,'김창완'),(178,'박근형'),(179,'이성민'),(180,'김태리'),(181,'조이'),(182,'주헌'),(183,'태용'),(184,'염혜란'),(185,'정이랑'),(186,'안재홍'),(187,'안재욱'),(188,'임영웅'),(189,'이지훈'),(190,'김지훈'),(191,'태연'),(192,'카리나'),(193,'박소담'),(194,'김윤석'),(195,'권해효'),(196,'조윤희'),(197,'염정아'),(198,'진지희'),(199,'이수현'),(200,'김성겸');
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
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_shout`
--

LOCK TABLES `quiz_shout` WRITE;
/*!40000 ALTER TABLE `quiz_shout` DISABLE KEYS */;
INSERT INTO `quiz_shout` VALUES (1,'모터사이클'),(2,'공간감각'),(3,'에어프라이어'),(4,'에스프레소'),(5,'와이파이'),(6,'반달가슴곰'),(7,'비선형방정식'),(8,'알리오올리오'),(9,'스테이크'),(10,'페페로니피자'),(11,'척추측만증'),(12,'율림빌딩'),(13,'토마토'),(14,'행렬대수학'),(15,'시바견'),(16,'페브리즈'),(17,'카페인'),(18,'왕밤빵'),(19,'포메라니안'),(20,'스테레오'),(21,'라떼'),(22,'블루투스'),(23,'로맨틱'),(24,'브런치'),(25,'브리또'),(26,'국제보호구역'),(27,'스크럽'),(28,'롤러블레이드'),(29,'핸드크림'),(30,'킥보드'),(31,'자이언티'),(32,'확률분포표'),(33,'게임기'),(34,'포카리스웨트'),(35,'페로마그네티즘'),(36,'포테이토칩'),(37,'스케이트보드'),(38,'로얄뉴로얄'),(39,'전국노래자랑'),(40,'노트북'),(41,'핵융합'),(42,'생명공학'),(43,'유전자재조합'),(44,'드론'),(45,'국제유가변동'),(46,'도넛'),(47,'지구과학자'),(48,'비타민'),(49,'물놀이'),(50,'자전거'),(51,'강력접착제'),(52,'맥스파이시상하이버거'),(53,'미적분학'),(54,'몽키스페너'),(55,'더블퐁듀쉬림프'),(56,'리조또'),(57,'짜왕'),(58,'포스트잇'),(59,'고깔모자'),(60,'무형문화재'),(61,'첩첩산중'),(62,'스마트폰'),(63,'그래비테이션웨이브'),(64,'어반자카파'),(65,'프로틴'),(66,'코카콜라'),(67,'브로치'),(68,'케이크'),(69,'마이리틀텔레비젼'),(70,'쿠키'),(71,'쥬스'),(72,'가상현실'),(73,'스무디'),(74,'타코'),(75,'풍경화'),(76,'환골탈태'),(77,'중고나라'),(78,'군고구마'),(79,'요거트'),(80,'유기화학'),(81,'트랜스포머'),(82,'에어팟'),(83,'샐러드'),(84,'초고속전자기'),(85,'양키캔들'),(86,'슈퍼컴퓨터'),(87,'파스타'),(88,'향수'),(89,'립스틱'),(90,'이상한나라의엘리스'),(91,'계산복잡도이론'),(92,'분자생물학'),(93,'뉴런네트워크'),(94,'잡곡밥'),(95,'상담담당선생님'),(96,'무기화학'),(97,'미생물학자'),(98,'해리포터와비밀의방'),(99,'복잡다각체'),(100,'엽기떡볶이'),(101,'양자암호통신'),(102,'확률론'),(103,'반지의제왕반지원정대'),(104,'모카'),(105,'서울외곽순한도로'),(106,'철수세미'),(107,'합성착향료'),(108,'머신러닝'),(109,'서울외곽순환도로'),(110,'접근금지'),(111,'게발선인장'),(112,'지록위마'),(113,'캐릭터'),(114,'18색크레파스'),(115,'참치꽁치찜'),(116,'햄버거'),(117,'경찰청창살'),(118,'모바일'),(119,'미분적분학'),(120,'카푸치노'),(121,'아이폰xs'),(122,'초신성폭발'),(123,'왁자지껄'),(124,'라흐마니노프'),(125,'스포티지'),(126,'마카롱'),(127,'창해일속'),(128,'법학박사'),(129,'커플링'),(130,'딥러닝'),(131,'테이크아웃'),(132,'펜던트'),(133,'피자'),(134,'켄터키후라이드치킨'),(135,'빨간고추'),(136,'국세청연말정산'),(137,'황금물결'),(138,'플라스틱'),(139,'마들렌'),(140,'워크샵'),(141,'암호이론'),(142,'문화유산보존'),(143,'증강현실'),(144,'고유치'),(145,'스쿠터'),(146,'액자속사진'),(147,'피아노콘체르토'),(148,'베스킨라빈스31'),(149,'철수책상철책상'),(150,'플레이스테이션');
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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_seq` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `user_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `user_nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `rating` int NOT NULL DEFAULT '1000',
  PRIMARY KEY (`user_seq`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `user_nickname_UNIQUE` (`user_nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (52,'peng','19c964072eac13433f45a35680ae195148f09c3fcc031dc0093dc02569c1da04','펭슈',1022),(53,'admin201','032408a4fbd1765ea8c2944c20415e5c4b724c2344a11e185d16b93e5b576de0','admin1',1030),(57,'K3334863536',NULL,'어어어',1036),(59,'K3335579894',NULL,'야옹',1000),(60,'dmdkvj369','997b9bcaaea88972d36028a705e9dfa745a17a312ee2f1cb039706988bf5f6eb','하이만기',1000),(61,'bsh4766','4d4f26369171994f3a46776ee2d88494fb9955800a5bb6261c016c4bb9f30b56','bsh',1000),(62,'ssafy0209','504c13a3280f4ccb2f2d5cf64d217b58cf26cfaec85276b2fa86a470dd648982','ssafyyy',1000),(63,'zzz123','acc0a1ee1a84a3ea66b892d6f823217d64f367f19964cb974f351b4671f453f2','fwwqfqwfw',1000),(64,'K3335617875',NULL,'셰진',1000),(65,'shin1111','ef51306214d9a6361ee1d5b452e6d2bb70dc7ebb85bf9e02c3d4747fb57d6bec','shin1111',1000),(66,'test','2413fb3709b05939f04cf2e92f7d0897fc2596f9ad0b8a9ea855c7bfebaae892','test',1000),(67,'test01','52d946c73311f81a21373635fe010cb403a8c6e10d284054e3c45006179f7107','test01',1000),(68,'test11','744ea9ec6fa0a83e9764b4e323d5be6b55a5accfc7fe4c08eab6a8de1fca4855','test11',1000),(69,'K3335654149',NULL,'쿼카코치',1000),(70,'K3335791558',NULL,'이현우최강짱짱맨',994),(71,'K3335793538',NULL,'실버택',994),(72,'K3335793919',NULL,'응애',1000),(73,'1111','0ffe1abd1a08215353c233d6e009613e95eec4253832a761af28ff37ac5a150c','Wony',976),(74,'test1','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','닉네임',1000),(75,'heekyung','de07769f3393873b0f532fc2f15c268a8faf9cf8429d590bdac1750279ad3a63','히꽁',1000),(76,'K3336033040',NULL,'박은택',1000),(77,'K3336033384',NULL,'Doogae',1000),(78,'asd123','54d5cb2d332dbdb4850293caae4559ce88b65163f1ea5d4e4b3ac49d772ded14','불로만',1012),(79,'K3336050018',NULL,'방랑자',1000),(80,'test123','ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae','test123',1010),(81,'mentos0601','f3c7a255a39955da45e886064bb4439c4fd0fad036e0cf1f3fd3581ed7652ec4','공시공사',984),(83,'test22','759cfde265aaddb6f728ed08d97862bbd9b56fd39de97a049c640b4c5b70aac9','꽁시꽁사22',1004),(84,'e105','f277c3c3754507aa1c3c30c31af25da6cbb7201f0fbc156443d033427ae79d1b','꽁시꽁사꽁오',984),(85,'K3336635085',NULL,'태태호',1020),(87,'rlfnr','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','끼룩',1000),(88,'K3300929025',NULL,'박수빈카카오',1000),(89,'subin','72e608742117df6367ac4818a7c1dcdc82b9b7d67dc156a107a2731c7b34c40f','수빈',1000),(90,'dahee0525','7e9d92ad0267e2003cd93121e7ea4fea6bf2c67388903411167bb914ac2e2463','dahee',992),(91,'hing','04e490e700f719177ed0699d3eabc340fb092d0a05a971c29e01ab8bda1724e9','이성완강기',1010),(92,'123123','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','12',1000),(93,'uio5778','6bf78d9a95b805d8aa3feb71a0436a7cfa3a37dc6e64cfee6d2d12f1f1b37052','박수빈바보',1000),(94,'test03','60e3f64cd735a17c3e15878042ffc26b309e0161615a339466604fda9700d778','test03',1000),(95,'2222','edee29f882543b956620b26d0ee0e7e950399b1c4222f5de05e06425b4c995e9','2222',984),(96,'qwer','f6f2ea8f45d8a057c9566a33f99474da2e5c6a6604d736121650e2730c6fb0a3','qwer',992),(97,'whoami','4d4f26369171994f3a46776ee2d88494fb9955800a5bb6261c016c4bb9f30b56','누구게',1000),(98,'sunsuair','c9fe854ea69fc0a252340e152864b539b116c36cf1ac419652e1826c3071d5ed','whowho',1000),(99,'1234','1718c24b10aeb8099e3fc44960ab6949ab76a267352459f203ea1036bec382c2','1234',1000),(100,'4321','fe2592b42a727e977f055947385b709cc82b16b9a87f88c6abf3900d65d0cdc3','4321',1000),(101,'zzzz','2d6ccd34ad7af363159ed4bbe18c0e43c681f606877d9ffc96b62200720d7291','ㅋㅋㅋㅋ',1000),(102,'coach','e0f167bc84b881bc06f6884fb48e02f41dfc5579e25489db6c6bde238e4aed15','coach',1000),(103,'q111','87ed14fe998b487a82ffca8e288878c9d3a46a65e48758e7557a13a4fb66b63f','q1',1004),(104,'kosh','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','부2컨',1000),(105,'q222','becdf67ada8908b4d77069e1f872f9f54bdee6c3277de52125d52e68626425f6','q2',1000),(106,'q333','fc589b8746e358b79c6ed084d673959524b3b9fc88aae036d2097e038ae20abf','q3',1000),(107,'scoach','0695c21a7f7b68c5bd63cbd421a50a6cc3e4681316f390116ec8d70dd2d149d5','scoach',1000);
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

-- Dump completed on 2024-02-13 11:08:01
