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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_result`
--

LOCK TABLES `game_result` WRITE;
/*!40000 ALTER TABLE `game_result` DISABLE KEYS */;
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
  `quiz_answer` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (52,'peng','19c964072eac13433f45a35680ae195148f09c3fcc031dc0093dc02569c1da04','펭슈',1000),(53,'admin201','032408a4fbd1765ea8c2944c20415e5c4b724c2344a11e185d16b93e5b576de0','admin1',1000);
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

-- Dump completed on 2024-02-09 10:25:26
