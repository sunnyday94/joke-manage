/*
Navicat MySQL Data Transfer

Source Server         : 10.0.10.60
Source Server Version : 50547
Source Host           : 10.0.10.60:3306
Source Database       : sunny_joke

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2017-10-12 16:47:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sy_joke_jokeinfo
-- ----------------------------
DROP TABLE IF EXISTS `sy_joke_jokeinfo`;
CREATE TABLE `sy_joke_jokeinfo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `joke_name` varchar(50) DEFAULT NULL COMMENT '笑话名称',
  `joke_content` varchar(2000) DEFAULT NULL COMMENT '笑话内容',
  `joke_type_id` bigint(20) DEFAULT NULL COMMENT '段子类型id',
  `upload_user_id` bigint(20) DEFAULT NULL COMMENT '上传者id',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '最后更新时间',
  `del_time` datetime DEFAULT NULL COMMENT '删除时间',
  `del_flag` enum('0','1') DEFAULT '0' COMMENT '删除标记(0=未删除，1=已删除)',
  `remark` varchar(200) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sy_joke_jokeinfo
-- ----------------------------
INSERT INTO `sy_joke_jokeinfo` VALUES ('1', '是台长那个狗曰的', '电视台台长与女播音员一起下乡采访，见农户有一窝小狗十分可爱，于是台长和女播音员各要了一只。台长要的是公的，播音员要的是母的，台长想占女播音员便宜，笑着说：“今晚一公一母就住一块吧。” 播音员说：“可以啊，要是我那小狗怀上了，我就给别人说：‘是台长那个狗曰的！’”', '1', '1', '2017-09-18 14:37:15', '2017-09-19 17:38:57', null, '0', null);
INSERT INTO `sy_joke_jokeinfo` VALUES ('2', '唱的什么歌', '据说有80%女生洗澡时都自慰，有20%女生洗澡时都唱歌。一男生听到后回学校问一女同学：“你知道那20%的女生在唱什么歌吗？”女同学：“不知道。”男生哦了一声就笑着走开了，旁边听到的人也笑了。女同学见大家都在笑就大声喊：“我是真不知道嘛~有什么好笑的！”这时笑声更大了。。。', '2', '2', '2017-09-18 15:39:19', '2017-09-18 15:39:19', null, '0', null);
INSERT INTO `sy_joke_jokeinfo` VALUES ('3', '赚钱的小说', '我有个朋友才写小说一个月，就赚了38万。我问他怎么赚的？他说把男主写死了，女主被人先奸后杀。他被读者打断了腿，对方赔的', '1', '2', '2017-09-18 15:53:56', '2017-09-18 15:53:56', null, '0', null);
INSERT INTO `sy_joke_jokeinfo` VALUES ('4', '临终前的微笑', '一老人临终前，问他妻子说“你我两家是世仇，你父亲更是说要我家断子绝孙，你为何还要嫁给我，给我生儿育女”妻子看了儿女一眼得意的笑了起来，老人惊恐的看着儿子，又如负释重的看了一眼女儿，欣慰的看了眼外孙安详的走了', '2', '1', '2017-09-19 11:09:18', '2017-09-25 15:14:51', null, '0', null);

-- ----------------------------
-- Table structure for sy_joke_manager
-- ----------------------------
DROP TABLE IF EXISTS `sy_joke_manager`;
CREATE TABLE `sy_joke_manager` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `manager_name` varchar(50) CHARACTER SET utf8 DEFAULT NULL COMMENT '用户名',
  `manager_password` varchar(50) CHARACTER SET utf8 DEFAULT NULL COMMENT '用户密码',
  `manager_nickname` varchar(50) CHARACTER SET utf8 DEFAULT NULL COMMENT '用户昵称',
  `head_pic` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '头像地址',
  `del_flag` enum('0','1') CHARACTER SET utf8 DEFAULT '0' COMMENT '禁用标记(0=未禁用;1=禁用)',
  `add_time` datetime DEFAULT NULL COMMENT '添加时间',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  `del_time` datetime DEFAULT NULL COMMENT '删除时间',
  `remark` varchar(50) CHARACTER SET utf8 DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of sy_joke_manager
-- ----------------------------
INSERT INTO `sy_joke_manager` VALUES ('1', 'sunnyday', 'e10adc3949ba59abbe56e057f20f883e', 'sunnyday', '/joke-web/image/headPic/b10641aae0214fe7bbe0f97c5e905b72.jpg', '0', '2017-07-07 09:42:06', '2017-07-07 09:42:06', null, null);
INSERT INTO `sy_joke_manager` VALUES ('2', 'liuxiang', 'e10adc3949ba59abbe56e057f20f883e', '刘祥', null, '0', '2017-09-18 15:32:55', '2017-09-18 15:32:55', null, null);
INSERT INTO `sy_joke_manager` VALUES ('4', 'yangyang', 'e10adc3949ba59abbe56e057f20f883e', '杨洋', null, '0', '2017-09-26 17:38:37', '2017-09-26 17:38:37', null, null);
INSERT INTO `sy_joke_manager` VALUES ('5', 'luhan', 'e10adc3949ba59abbe56e057f20f883e', '鹿晗', null, '0', '2017-09-26 17:47:37', '2017-09-26 17:47:37', null, null);
INSERT INTO `sy_joke_manager` VALUES ('6', 'yangyang2', 'e10adc3949ba59abbe56e057f20f883e', '杨洋2', null, '0', '2017-09-26 17:50:37', '2017-09-26 17:50:37', null, null);

-- ----------------------------
-- Table structure for sy_joke_type
-- ----------------------------
DROP TABLE IF EXISTS `sy_joke_type`;
CREATE TABLE `sy_joke_type` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `type_name` varchar(50) DEFAULT NULL COMMENT '类型名称',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `del_time` datetime DEFAULT NULL COMMENT '删除时间',
  `del_flag` enum('0','1') DEFAULT '0' COMMENT '删除标记(0=未删除;1=已删除)',
  `remark` varchar(200) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sy_joke_type
-- ----------------------------
INSERT INTO `sy_joke_type` VALUES ('1', '笑话', '2017-09-14 13:28:55', null, '0', null);
INSERT INTO `sy_joke_type` VALUES ('2', '内涵段子', '2017-09-14 17:06:48', null, '0', null);
