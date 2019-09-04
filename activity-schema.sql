DROP DATABASE IF EXISTS mysql_presentation_activity;
CREATE DATABASE mysql_presentation_activity;
USE mysql_presentation_activity;

CREATE TABLE `players` (
  `id` int PRIMARY KEY auto_increment,
  `name` varchar(255),
  `email` varchar(255),
  `country` ENUM('PH', 'JP', 'SG', 'US', 'CA', 'UK', 'SK', 'CN')
);

CREATE TABLE `matches` (
  `id` int PRIMARY KEY auto_increment,
  `duration` int,
  `winner` ENUM ('stratus', 'cirrus'),
  `timestamp` datetime
);

CREATE TABLE `hero_roles` (
  `hero_id` int,
  `role_id` int
);

CREATE TABLE `heroes` (
  `id` int PRIMARY KEY auto_increment,
  `name` varchar(255)
);

CREATE TABLE `match_plays` (
  `player_id` int,
  `match_id` int,
  `hero_id` int,
  `team` ENUM ('stratus', 'cirrus')
);

CREATE TABLE `roles` (
	`id` int PRIMARY KEY auto_increment,
	`name` varchar(30)
);

ALTER TABLE `hero_roles` ADD FOREIGN KEY (`hero_id`) REFERENCES `heroes` (`id`) ON DELETE CASCADE;

ALTER TABLE `hero_roles` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

ALTER TABLE `match_plays` ADD FOREIGN KEY (`player_id`) REFERENCES `players` (`id`) ON DELETE CASCADE;

ALTER TABLE `match_plays` ADD FOREIGN KEY (`match_id`) REFERENCES `matches` (`id`) ON DELETE CASCADE;

ALTER TABLE `match_plays` ADD FOREIGN KEY (`hero_id`) REFERENCES `heroes` (`id`) ON DELETE CASCADE;