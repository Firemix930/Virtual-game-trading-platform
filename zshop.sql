/*
Navicat MySQL Data Transfer

Source Server         : Team Work E
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : zshop

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2020-11-12 10:19:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for advert
-- ----------------------------
DROP TABLE IF EXISTS `advert`;
CREATE TABLE `advert` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `position` int(11) NOT NULL,
  `image` varchar(100) NOT NULL,
  `url` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `version` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of advert
-- ----------------------------
INSERT INTO `advert` VALUES ('1', 'heading1', null, '1', '/static/images/vt/s1.png', null, '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `advert` VALUES ('2', 'heading2', null, '1', '/static/images/vt/s2.png', null, '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `advert` VALUES ('3', 'heading3', null, '1', '/static/images/vt/s3.png', null, '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `advert` VALUES ('4', 'heading4', null, '2', '/static/images/vt/mid.png', null, '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(30) NOT NULL,
  `prodId` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `version` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES ('1', 'halloffame', '1', '3', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `cart` VALUES ('2', 'halloffame', '2', '2', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `cart` VALUES ('3', 'halloffame', '3', '1', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `cart` VALUES ('4', 'halloffame', '4', '1', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');

-- ----------------------------
-- Table structure for collection
-- ----------------------------
DROP TABLE IF EXISTS `collection`;
CREATE TABLE `collection` (
  `id` varchar(50) NOT NULL,
  `userId` varchar(30) NOT NULL,
  `prodId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `version` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of collection
-- ----------------------------
INSERT INTO `collection` VALUES ('2cc925f8-2410-11eb-92a7-002b670d7c78', 'halloffame', '2', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `collection` VALUES ('2cc976e1-2410-11eb-92a7-002b670d7c78', 'halloffame', '1', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');

-- ----------------------------
-- Table structure for group_attri
-- ----------------------------
DROP TABLE IF EXISTS `group_attri`;
CREATE TABLE `group_attri` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prodGroup` int(11) NOT NULL,
  `attriId` varchar(20) NOT NULL,
  `attriName` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `version` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of group_attri
-- ----------------------------
INSERT INTO `group_attri` VALUES ('1', '1', 'area', 'Area', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `group_attri` VALUES ('2', '1', 'version', 'Version', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `group_attri` VALUES ('3', '1', 'langue', 'Langue', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `group_attri` VALUES ('4', '3', 'currency', 'Currency', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `group_attri` VALUES ('5', '3', 'value', 'Value', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');

-- ----------------------------
-- Table structure for group_attri_value
-- ----------------------------
DROP TABLE IF EXISTS `group_attri_value`;
CREATE TABLE `group_attri_value` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupAttriId` int(11) NOT NULL,
  `attriValue` varchar(200) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `version` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of group_attri_value
-- ----------------------------
INSERT INTO `group_attri_value` VALUES ('1', '1', 'Russian', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `group_attri_value` VALUES ('2', '1', 'China', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `group_attri_value` VALUES ('3', '2', 'Ultimate Edition', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `group_attri_value` VALUES ('4', '2', 'Standard version', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `group_attri_value` VALUES ('5', '3', 'Chinese', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `group_attri_value` VALUES ('6', '3', 'English', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `group_attri_value` VALUES ('7', '4', 'Brazilian real', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `group_attri_value` VALUES ('8', '4', 'Russian ruble', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `group_attri_value` VALUES ('9', '5', '＄100', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `group_attri_value` VALUES ('10', '1', 'Argentina', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` varchar(50) NOT NULL,
  `userId` varchar(30) NOT NULL,
  `province` varchar(20) NOT NULL,
  `city` varchar(20) NOT NULL,
  `area` varchar(20) NOT NULL,
  `address` varchar(100) NOT NULL,
  `recipient` varchar(20) NOT NULL,
  `recipientPhone` varchar(30) NOT NULL,
  `deliveryType` int(11) NOT NULL DEFAULT '1',
  `expressCompany` varchar(50) NOT NULL,
  `expressNumber` varchar(50) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `deliveryFee` decimal(12,2) NOT NULL DEFAULT '10.00',
  `prodPrice` decimal(12,2) NOT NULL,
  `totalPrice` decimal(12,2) NOT NULL,
  `payStartTime` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `version` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES ('13d7b927-81f6-4318-a0a0-c16a1f835298', '18703889256', '', '', '', '', '请选择一个收件地址', '', '1', '', '', '5', '10.00', '399.00', '409.00', '2020-11-12 01:12:55', '2020-11-12 01:12:08', '2020-11-12 03:01:26', '3');
INSERT INTO `order` VALUES ('b9214701-31f0-44d1-86a3-58b12b046f4a', '18703889256', '', '', '', '', '请选择一个收件地址', '', '1', '', '', '3', '10.00', '399.00', '409.00', '2020-11-12 03:11:49', '2020-11-12 03:11:38', '2020-11-12 03:11:55', '2');

-- ----------------------------
-- Table structure for order_prod
-- ----------------------------
DROP TABLE IF EXISTS `order_prod`;
CREATE TABLE `order_prod` (
  `id` varchar(50) NOT NULL,
  `orderId` varchar(50) NOT NULL,
  `prodId` int(11) NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `count` int(11) NOT NULL,
  `cartId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `version` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order_prod
-- ----------------------------
INSERT INTO `order_prod` VALUES ('12b7a7bf-8b26-490a-803c-95bb50829676', '13d7b927-81f6-4318-a0a0-c16a1f835298', '1', '399.00', '1', '8', '2020-11-12 01:12:08', '2020-11-12 01:12:08', '0');
INSERT INTO `order_prod` VALUES ('5995e786-99ef-4689-a183-a356dac6c0cd', 'b9214701-31f0-44d1-86a3-58b12b046f4a', '1', '399.00', '1', '0', '2020-11-12 03:11:38', '2020-11-12 03:11:38', '0');

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupId` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `image` varchar(100) NOT NULL,
  `recommend` int(11) DEFAULT NULL,
  `sales` int(11) NOT NULL DEFAULT '0',
  `stock` int(11) NOT NULL DEFAULT '0',
  `detailImages` varchar(300) NOT NULL,
  `detailHtml` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `version` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('1', '1', 'CyberPunk2077', '-FPS-', '399.00', '/static/images/product/good1.jpg', '1', '13', '53', 'prod_detail0.jpg;prod_detail1.jpg;prod_detail2.jpg;prod_detail3.jpg', '/static/html/prod_detail/prod-detial0.html', '2020-11-11 19:22:25', '2020-11-12 03:11:38', '8');
INSERT INTO `product` VALUES ('2', '2', 'Yakuza Kiwami2', '-RPG-', '185.00', '/static/images/product/good2.jpg', '1', '2', '34', 'prod_detail4.jpg;prod_detail5.jpg;prod_detail6.jpg;prod_detail7.jpg', '/static/html/prod_detail/prod-detial1.html', '2020-11-11 19:22:25', '2020-11-11 23:19:35', '2');
INSERT INTO `product` VALUES ('3', '3', 'Steam Dollar prepaid card', '-Cdkey-', '630.00', '/static/images/product/good3.jpg', '1', '6', '21', 'prod_detail12.jpg', '/static/html/prod_detail/prod-detial2.html', '2020-11-11 19:22:25', '2020-11-11 23:19:35', '2');
INSERT INTO `product` VALUES ('4', '4', 'Steam Dollar prepaid card', '-Cdkey-', '600.00', '/static/images/product/good4.jpg', '1', '8', '88', 'prod_detail12.jpg', '/static/html/prod_detail/prod-detial2.html', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `product` VALUES ('5', '5', 'Football Manager 2021', '-SIM-', '224.00', '/static/images/product/good5.jpg', '1', '3', '99', 'prod_detail8.jpg;prod_detail9.jpg;prod_detail10.jpg;prod_detail11.jpg', '/static/html/prod_detail/prod-detial3.html', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `product` VALUES ('6', '6', 'Assassins Creed Valhalla', '-RPG-', '298.00', '/static/images/product/good6.jpg', '1', '5', '44', 'prod_detail13.jpg;prod_detail14.jpg;prod_detail15.jpg;prod_detail16.jpg', '/static/html/prod_detail/prod-detial4.html', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `product` VALUES ('7', '1', 'CyberPunk2077 Golden', '-FPS-', '288.00', '/static/images/product/good1.jpg', '1', '7', '33', 'prod_detail0.jpg;prod_detail1.jpg;prod_detail2.jpg;prod_detail3.jpg', '/static/html/prod_detail/prod-detial0.html', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');

-- ----------------------------
-- Table structure for prod_attri
-- ----------------------------
DROP TABLE IF EXISTS `prod_attri`;
CREATE TABLE `prod_attri` (
  `id` varchar(50) NOT NULL,
  `prodId` int(11) NOT NULL,
  `groupAttriValueId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `version` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of prod_attri
-- ----------------------------
INSERT INTO `prod_attri` VALUES ('2cc48cd2-2410-11eb-92a7-002b670d7c78', '1', '1', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `prod_attri` VALUES ('2cc4ecf0-2410-11eb-92a7-002b670d7c78', '1', '3', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `prod_attri` VALUES ('2cc54c25-2410-11eb-92a7-002b670d7c78', '1', '5', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `prod_attri` VALUES ('2cc5c33e-2410-11eb-92a7-002b670d7c78', '2', '2', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `prod_attri` VALUES ('2cc6119c-2410-11eb-92a7-002b670d7c78', '2', '4', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `prod_attri` VALUES ('2cc671bd-2410-11eb-92a7-002b670d7c78', '2', '6', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `prod_attri` VALUES ('2cc6c361-2410-11eb-92a7-002b670d7c78', '3', '7', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `prod_attri` VALUES ('2cc71bd9-2410-11eb-92a7-002b670d7c78', '3', '9', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `prod_attri` VALUES ('2cc76687-2410-11eb-92a7-002b670d7c78', '4', '8', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `prod_attri` VALUES ('2cc7bebf-2410-11eb-92a7-002b670d7c78', '4', '9', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `prod_attri` VALUES ('2cc80fed-2410-11eb-92a7-002b670d7c78', '7', '1', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `prod_attri` VALUES ('2cc86c93-2410-11eb-92a7-002b670d7c78', '7', '4', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');
INSERT INTO `prod_attri` VALUES ('2cc8bda4-2410-11eb-92a7-002b670d7c78', '7', '5', '2020-11-11 19:22:25', '2020-11-11 19:22:25', '0');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mobile` varchar(11) NOT NULL,
  `userId` varchar(30) NOT NULL,
  `passwd` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `headImage` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `version` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile` (`mobile`),
  UNIQUE KEY `userId` (`userId`),
  UNIQUE KEY `user_mobile_unique` (`mobile`),
  UNIQUE KEY `user_userId_unique` (`userId`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `user_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('e277ddc4-1c12-40a5-b4ff-c1a1bcaaba62', null, '18703889256', '18703889256', '123456', 'lzl', null, '/static/images/head/bear.jpg', '2020-11-11 19:42:30', '2020-11-11 22:28:06', '1');

-- ----------------------------
-- Table structure for user_address
-- ----------------------------
DROP TABLE IF EXISTS `user_address`;
CREATE TABLE `user_address` (
  `id` varchar(50) NOT NULL,
  `userId` varchar(30) NOT NULL,
  `province` varchar(20) NOT NULL,
  `city` varchar(20) NOT NULL,
  `area` varchar(20) NOT NULL,
  `address` varchar(100) NOT NULL,
  `name` varchar(20) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `type` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `version` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_address
-- ----------------------------
