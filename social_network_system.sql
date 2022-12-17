-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Dec 16, 2022 at 02:09 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `social_network_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment_reply`
--

CREATE TABLE `comment_reply` (
  `comment_reply_id` bigint(20) NOT NULL,
  `date_reply` date NOT NULL,
  `reply` varchar(255) NOT NULL,
  `post_comment_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comment_reply`
--

INSERT INTO `comment_reply` (`comment_reply_id`, `date_reply`, `reply`, `post_comment_id`, `user_id`) VALUES
(1, '2022-12-16', 'test reply ??', 4, 7),
(3, '2022-12-16', '????', 4, 7),
(4, '2022-12-16', 'test reply', 8, 7);

-- --------------------------------------------------------

--
-- Table structure for table `friendship`
--

CREATE TABLE `friendship` (
  `friendship_id` int(11) NOT NULL,
  `personone_id` int(11) NOT NULL,
  `persontwo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `friendship`
--

INSERT INTO `friendship` (`friendship_id`, `personone_id`, `persontwo_id`) VALUES
(1, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `group`
--

CREATE TABLE `group` (
  `group_id` bigint(20) NOT NULL,
  `created_date` date NOT NULL,
  `group_about` varchar(50) NOT NULL,
  `group_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `group`
--

INSERT INTO `group` (`group_id`, `created_date`, `group_about`, `group_name`) VALUES
(1, '2022-12-15', '...', 'Nhóm 1'),
(2, '2022-12-15', '...', 'Nhóm 2'),
(3, '2022-12-16', '...', 'Nhóm 3');

-- --------------------------------------------------------

--
-- Table structure for table `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(14);

-- --------------------------------------------------------

--
-- Table structure for table `joinedgroup`
--

CREATE TABLE `joinedgroup` (
  `group_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `joined_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `joinedgroup`
--

INSERT INTO `joinedgroup` (`group_id`, `user_id`, `joined_date`) VALUES
(1, 7, '2022-12-16'),
(1, 8, '2022-12-15'),
(2, 8, '2022-12-15'),
(3, 8, '2022-12-16');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `location_id` int(11) NOT NULL,
  `country` text NOT NULL,
  `province` text NOT NULL,
  `city` text NOT NULL,
  `address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`location_id`, `country`, `province`, `city`, `address`) VALUES
(1, 'Việt Nam', 'Khánh Hòa', 'Nha Trang', '213 Võ Thị Sáu');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `post_id` bigint(20) NOT NULL,
  `content` varchar(255) NOT NULL,
  `image` varchar(1000) NOT NULL,
  `published_date` date NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`post_id`, `content`, `image`, `published_date`, `user_id`) VALUES
(24, 'hom nay toi buon qua diiiiiiiiii', 'NONE', '2022-12-14', 7),
(59, 'Day la test', '|https://firebasestorage.googleapis.com/v0/b/media-socia.appspot.com/o/post_images%2Fbackground.jpg?alt=media&token=5bc1b69a-b2ec-4671-a180-9534158d06e2|https://firebasestorage.googleapis.com/v0/b/media-socia.appspot.com/o/post_images%2Fbaitap.png?alt=media&token=e9af7062-d662-4aa9-a6cf-de8b00c12209', '2022-12-16', 7);

-- --------------------------------------------------------

--
-- Table structure for table `post_comment`
--

CREATE TABLE `post_comment` (
  `post_comment_id` bigint(20) NOT NULL,
  `date_comment` date NOT NULL,
  `content` varchar(100) NOT NULL,
  `post_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post_comment`
--

INSERT INTO `post_comment` (`post_comment_id`, `date_comment`, `content`, `post_id`, `user_id`) VALUES
(4, '2022-12-16', 'day la mot comment ', 24, 7),
(8, '2022-12-16', 'test comment', 59, 7);

-- --------------------------------------------------------

--
-- Table structure for table `post_favorite`
--

CREATE TABLE `post_favorite` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post_favorite`
--

INSERT INTO `post_favorite` (`post_id`, `user_id`) VALUES
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `refreshtoken`
--

CREATE TABLE `refreshtoken` (
  `ref_token_id` bigint(20) NOT NULL,
  `expiry_date` datetime NOT NULL,
  `token` varchar(255) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `refreshtoken`
--

INSERT INTO `refreshtoken` (`ref_token_id`, `expiry_date`, `token`, `user_id`) VALUES
(2, '2022-12-14 21:38:03', '996b5420-67e5-4246-beec-853c770e09fb', 8),
(3, '2022-12-15 01:29:30', 'f19966be-8115-4cfb-b475-9759148ca415', 7),
(4, '2022-12-15 02:11:04', '62468e34-9d87-484a-a30d-fc226ff1d1c3', 7),
(5, '2022-12-15 02:37:11', '897a3f29-9a3c-48e7-bd49-8feb14861b7a', 7),
(6, '2022-12-15 14:56:04', '95bd1f66-a1f4-4178-8f9b-a51d3975137e', 7),
(7, '2022-12-16 14:18:10', '420fc5d8-2ab3-4ed9-a1cc-bd8968d6b247', 7),
(8, '2022-12-16 17:52:08', '3beadc38-71c9-434b-8730-0518ef3931d3', 7),
(9, '2022-12-16 23:00:58', '7ff7fc82-7cff-4070-9d33-4026502849e8', 8),
(10, '2022-12-17 13:41:29', '38f06ce0-79c3-427c-bab9-5c440831fa3f', 7),
(11, '2022-12-17 07:50:10', 'd12ce127-74e0-4227-97ad-4c2cf06bb1bf', 7),
(12, '2022-12-17 08:07:51', '0960a76b-d059-4258-8a7d-abc89d9e0deb', 7),
(13, '2022-12-17 09:39:15', 'de2770ef-ef76-4bd8-bec1-96fb9364dc65', 7);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_id` bigint(20) NOT NULL,
  `name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `name`) VALUES
(1, 'ROLE_ADMIN'),
(2, 'ROLE_USER'),
(3, 'ROLE_MODERATOR');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` bigint(11) NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `registered_date` date NOT NULL,
  `username` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `email`, `password`, `registered_date`, `username`) VALUES
(2, 'nguyenthach617@gmail.com', '123456789', '2022-12-02', 'thachnt123'),
(3, 'hungbeo123@gmail.com', '$2a$10$u1rrtoQQSy4PhWek3lEdU.uqKtIPWo4R1lG9Z.gqQvsG.6CxTeIUy', '2022-12-02', 'hung2712'),
(4, 'thachnv@gmail.com', 'asbsdas', '2022-12-02', 'thachlmao2828'),
(7, 'email@gmail.com', '$2a$10$2jmGakjWDImZeuE740oVT.Z0x7rpeZPw8WH.KkejsIGrQsKr0CYzW', '2022-12-08', 'hung2727'),
(8, 'sieupha2712@gmail.com', '$2a$10$Jw1noGaVHIE9tj.3QnNxh.qPYlFs6Oa.DTd2E1pfQxiNKU4l76sta', '2022-12-08', 'hung2728');

-- --------------------------------------------------------

--
-- Table structure for table `userprofile`
--

CREATE TABLE `userprofile` (
  `userprofile_id` bigint(20) NOT NULL,
  `avatar` text DEFAULT NULL,
  `background` varchar(255) DEFAULT NULL,
  `dob` date NOT NULL,
  `first_name` varchar(40) NOT NULL,
  `gender` bit(1) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `update_date` date DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  `about` varchar(255) NOT NULL,
  `location_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userprofile`
--

INSERT INTO `userprofile` (`userprofile_id`, `avatar`, `background`, `dob`, `first_name`, `gender`, `last_name`, `update_date`, `user_id`, `about`, `location_id`) VALUES
(1, 'hutao.jpg', 'background.jpg', '2001-12-27', 'Nguyen Van', b'1', 'Hung', '2022-12-12', 7, '그동안 \'너의 이름은\' 사운드트랙을 10곡 커버했습니다.\n모음집으로 만들면서 돌아보니 2019년부터 \'너의 이름은\' OST를 연주하기 시작 했네요. 시간이 꽤 흘렀지만 좋아하는 작품인지라 매년 다시보고 꾸준히 음악도 들어가며 즐겁게 연주했습니다. ', 0),
(2, 'hung2.jpg', 'alone.png', '2022-12-01', 'Nguyen', b'1', 'Hung', '2022-12-12', 8, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(2, 1),
(3, 1),
(7, 2),
(8, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment_reply`
--
ALTER TABLE `comment_reply`
  ADD PRIMARY KEY (`comment_reply_id`),
  ADD KEY `FK35weat9pbnp5kdpevwti5k3u4` (`post_comment_id`),
  ADD KEY `FKsrjwcmm9boromh00gubiqc8x5` (`user_id`);

--
-- Indexes for table `friendship`
--
ALTER TABLE `friendship`
  ADD PRIMARY KEY (`friendship_id`);

--
-- Indexes for table `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`group_id`);

--
-- Indexes for table `joinedgroup`
--
ALTER TABLE `joinedgroup`
  ADD PRIMARY KEY (`group_id`,`user_id`),
  ADD KEY `FK2yw1svn2qu59st95n4vgrk45q` (`user_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `FK72mt33dhhs48hf9gcqrq4fxte` (`user_id`);

--
-- Indexes for table `post_comment`
--
ALTER TABLE `post_comment`
  ADD PRIMARY KEY (`post_comment_id`),
  ADD KEY `FKna4y825fdc5hw8aow65ijexm0` (`post_id`),
  ADD KEY `FKtc1fl97yq74q7j8i08ds731s1` (`user_id`);

--
-- Indexes for table `post_favorite`
--
ALTER TABLE `post_favorite`
  ADD PRIMARY KEY (`post_id`,`user_id`);

--
-- Indexes for table `refreshtoken`
--
ALTER TABLE `refreshtoken`
  ADD PRIMARY KEY (`ref_token_id`),
  ADD UNIQUE KEY `UK_or156wbneyk8noo4jstv55ii3` (`token`),
  ADD KEY `FKfr75ge3iecdx26qe8afh1srf6` (`user_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `UKsb8bbouer5wak8vyiiy4pf2bx` (`username`) USING HASH,
  ADD UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`) USING HASH;

--
-- Indexes for table `userprofile`
--
ALTER TABLE `userprofile`
  ADD PRIMARY KEY (`userprofile_id`),
  ADD KEY `FKf624a6kavdjjkwyibdatrjipf` (`user_id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `FKrhfovtciq1l558cw6udg0h0d3` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment_reply`
--
ALTER TABLE `comment_reply`
  MODIFY `comment_reply_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `friendship`
--
ALTER TABLE `friendship`
  MODIFY `friendship_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `group`
--
ALTER TABLE `group`
  MODIFY `group_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `post_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `post_comment`
--
ALTER TABLE `post_comment`
  MODIFY `post_comment_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `role_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `userprofile`
--
ALTER TABLE `userprofile`
  MODIFY `userprofile_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment_reply`
--
ALTER TABLE `comment_reply`
  ADD CONSTRAINT `FK35weat9pbnp5kdpevwti5k3u4` FOREIGN KEY (`post_comment_id`) REFERENCES `post_comment` (`post_comment_id`),
  ADD CONSTRAINT `FKsrjwcmm9boromh00gubiqc8x5` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `joinedgroup`
--
ALTER TABLE `joinedgroup`
  ADD CONSTRAINT `FK2yw1svn2qu59st95n4vgrk45q` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `FKrx7jrt7jw263b4731utr71bd1` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`);

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `FK72mt33dhhs48hf9gcqrq4fxte` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `post_comment`
--
ALTER TABLE `post_comment`
  ADD CONSTRAINT `FKna4y825fdc5hw8aow65ijexm0` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`),
  ADD CONSTRAINT `FKtc1fl97yq74q7j8i08ds731s1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `refreshtoken`
--
ALTER TABLE `refreshtoken`
  ADD CONSTRAINT `FKfr75ge3iecdx26qe8afh1srf6` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `userprofile`
--
ALTER TABLE `userprofile`
  ADD CONSTRAINT `FKf624a6kavdjjkwyibdatrjipf` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `FK55itppkw3i07do3h7qoclqd4k` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `FKrhfovtciq1l558cw6udg0h0d3` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
