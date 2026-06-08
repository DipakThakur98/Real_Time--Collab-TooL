-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 07, 2026 at 07:02 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;

/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `collab_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `excerpt` text DEFAULT NULL,
  `featured_image` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `status` enum('draft','published','scheduled') DEFAULT 'draft',
  `published_at` datetime DEFAULT NULL,
  `seo_title` varchar(255) DEFAULT NULL,
  `seo_description` text DEFAULT NULL,
  `views` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `slug`, `content`, `excerpt`, `featured_image`, `category_id`, `author_id`, `status`, `published_at`, `seo_title`, `seo_description`, `views`, `created_at`, `updated_at`) VALUES
(1, 'How to Build Animals using CollabTool', 'how-to-build-animals-using-collabtool-1778156100137', 'In this deep dive, we explore how Animals can revolutionize your workflow...', 'Learn the secrets of Animals with our comprehensive guide.', NULL, 1, 1, 'published', NULL, 'Mastering Animals | CollabTool', 'Learn the secrets of Animals with our comprehensive guide.', 0, '2026-05-07 12:15:00', '2026-05-07 12:15:00'),
(2, 'Instagram Buffer APIS', 'instagram-buffer-apis-1778264391279', '<p>https://developers.facebook.com/docs/instagram-platform/comment-moderation</p><p>https://developers.facebook.com/products/instagram/success-stories/</p>', '', '', 1, 1, 'draft', NULL, '', '', 0, '2026-05-08 18:19:51', '2026-05-08 18:19:51'),
(3, 'How to Build Junk Food is danger helthe  using CollabTool', 'how-to-build-junk-food-is-danger-helthe--using-collabtool-1779271984926', 'In this deep dive, we explore how Junk Food is danger helthe  can revolutionize your workflow...', 'Learn the secrets of Junk Food is danger helthe  with our comprehensive guide.', NULL, 1, 6, 'published', NULL, 'Mastering Junk Food is danger helthe  | CollabTool', 'Learn the secrets of Junk Food is danger helthe  with our comprehensive guide.', 0, '2026-05-20 10:13:04', '2026-05-20 10:13:04');

-- --------------------------------------------------------

--
-- Table structure for table `blog_categories`
--

CREATE TABLE `blog_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog_categories`
--

INSERT INTO `blog_categories` (`id`, `name`, `slug`) VALUES
(1, 'Technical', 'technical'),
(2, 'Tutorial', 'tutorial'),
(3, 'Product', 'product'),
(4, 'Social Media', 'social-media'),
(5, 'AI News', 'ai-news');

-- --------------------------------------------------------

--
-- Table structure for table `collaborators`
--

CREATE TABLE `collaborators` (
  `document_id` varchar(36) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role` enum('viewer','editor') DEFAULT 'editor'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `collaborators`
--

INSERT INTO `collaborators` (`document_id`, `user_id`, `role`) VALUES
('94b02333-872e-4afa-8e0d-3482f474151f', 2, 'editor'),
('c7055fcc-2127-4cc9-ac72-4c7b7c17f072', 1, 'editor'),
('d54399b7-bcd8-4451-bf27-1057a04a4439', 1, 'editor');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `blog_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) DEFAULT 'Untitled Document',
  `content` longtext DEFAULT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`id`, `title`, `content`, `owner_id`, `created_at`, `updated_at`) VALUES
('94b02333-872e-4afa-8e0d-3482f474151f', 'Untitled Document', '{\"ops\":[{\"insert\":\"Welcome to Blog Post...\\n\\n\"}]}', 2, '2026-05-15 04:23:41', '2026-05-15 04:24:27'),
('c7055fcc-2127-4cc9-ac72-4c7b7c17f072', 'Untitled Document', '{\"ops\":[{\"insert\":\"Hello,\\nI M John from Maxico city.\\nwelcome to collaBration Page for Have any Intersted to collab DM me.  \\n\"}]}', 1, '2026-05-07 03:16:16', '2026-05-07 03:19:58'),
('d54399b7-bcd8-4451-bf27-1057a04a4439', 'Untitled Document', '{\"ops\":[{\"insert\":\"\\n\"}]}', 1, '2026-05-07 03:29:03', '2026-05-07 07:43:53');

-- --------------------------------------------------------

--
-- Table structure for table `document_versions`
--

CREATE TABLE `document_versions` (
  `id` int(11) NOT NULL,
  `document_id` varchar(36) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `saved_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `document_id` varchar(36) DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `newsletter_subscribers`
--

CREATE TABLE `newsletter_subscribers` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `status` enum('active','unsubscribed') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `type` enum('info','success','warning','error') DEFAULT 'info',
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `plan_name` varchar(100) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `stripe_session_id` varchar(255) NOT NULL,
  `status` enum('pending','completed','failed','cancelled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `plan_name`, `amount`, `stripe_session_id`, `status`, `created_at`) VALUES
(1, 6, 'Pro', 999.00, 'cs_test_a1D4RFvkBqvORTtmxjIwJmkFH54vjQPaoEtjNARo9UGExVvuPQIy7q4qoi', 'completed', '2026-05-20 06:44:22'),
(2, 6, 'Pro', 999.00, 'cs_test_a1unh0Uk501HIqx44O1DZOfIeAUAThd9tluG66ya85PPmVDhhtpzzpoTAQ', 'pending', '2026-05-20 06:48:27'),
(3, 6, 'Pro', 999.00, 'cs_test_a1bs2MsYabY6MZeM2UUiaz8pQBLC9BfwxHZXLhJhaJcPTKSaOWsEeKsqCT', 'completed', '2026-05-20 06:50:22'),
(4, 6, 'Pro', 999.00, 'cs_test_a1YJ679qgCrfkiXSyltHS7SjWI5mqAqxJ2UsBusLYXU6i55L6kcTNCfnyp', 'pending', '2026-05-20 10:07:06');

-- --------------------------------------------------------

--
-- Table structure for table `social_accounts`
--

CREATE TABLE `social_accounts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `platform` enum('linkedin','instagram','facebook','twitter') NOT NULL,
  `profile_name` varchar(255) DEFAULT NULL,
  `access_token` text DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `connected_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `social_accounts`
--

INSERT INTO `social_accounts` (`id`, `user_id`, `platform`, `profile_name`, `access_token`, `refresh_token`, `connected_at`) VALUES
(30, 1, 'instagram', '_ig_shorts001', 'simulated_oauth_1778330481069', NULL, '2026-05-09 12:41:21');

-- --------------------------------------------------------

--
-- Table structure for table `social_posts`
--

CREATE TABLE `social_posts` (
  `id` int(11) NOT NULL,
  `blog_id` int(11) DEFAULT NULL,
  `platform` enum('linkedin','instagram','facebook','twitter') NOT NULL,
  `caption` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `status` enum('draft','scheduled','published','failed') DEFAULT 'draft',
  `scheduled_at` datetime DEFAULT NULL,
  `published_at` datetime DEFAULT NULL,
  `engagement_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`engagement_data`)),
  `error_message` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `social_posts`
--

INSERT INTO `social_posts` (`id`, `blog_id`, `platform`, `caption`, `image_url`, `status`, `scheduled_at`, `published_at`, `engagement_data`, `error_message`) VALUES
(1, 1, 'instagram', '📸 New blog published! \"How to Build Animals using CollabTool\" — Real-time collaboration made smarter. Read it now! 🔗 #CollabTool #AI #Tech', NULL, 'published', NULL, NULL, NULL, NULL),
(2, 1, 'facebook', '🗞️ New Article Alert! We just published: \"How to Build Animals using CollabTool\". Check it out on our blog for the full deep dive. #CollabTool', NULL, 'published', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` enum('super_admin','admin','moderator','editor','user') DEFAULT 'user',
  `status` enum('active','suspended','banned') DEFAULT 'active',
  `last_login` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `full_name`, `email`, `password`, `created_at`, `role`, `status`, `last_login`) VALUES
(1, 'john123', NULL, 'john123@gmail.com', '$2b$10$S293qG5qub.rN5tek/1/ZOIctmmucQQwA0GvrxYdCTxrPFhY8TQWm', '2026-05-07 03:15:50', 'user', 'active', NULL),
(2, 'SuperAdmin', NULL, 'admin@collabtool.com', '$2b$10$dk7DaGuqXglsC0RtTw5sSuezN3o1nvz0tuD06.jg5c0ID9NvpxkH2', '2026-05-10 07:21:45', 'admin', 'active', '2026-05-23 14:33:05'),
(3, 'Kelvin123', NULL, 'kelvin99@gmail.com', '$2b$10$TusPImaRvWuL01DsylhczeNKL4zzuxNTvah3ZPrLBa1W6MC/p/bZC', '2026-05-15 04:16:58', 'user', 'active', NULL),
(4, 'Kelvin11', 'kelvin', 'Kelvin123@gmail.com', '$2b$10$A4AogM0daevhropMV10xIebBymjLX1oEyJtGyfFfmiloNfv9Hznj2', '2026-05-15 11:29:40', 'user', 'active', '2026-05-15 18:37:45'),
(5, 'Smith123', 'Smith', 'smith123@gmail.com', '$2b$10$ygUX1FBaxVfmbHqO/WW7/OBTBQODvk0xJFJFSee7xsUuHFUKON.IC', '2026-05-19 12:22:41', 'user', 'active', '2026-05-20 00:45:20'),
(6, 'Joy123', 'JOY', 'Joy123@gmail.com', '$2b$10$okLQXSEXAMonHag4kpl8L.Ji5CXsyTYMUKh39B5FBTn4PHj3Nd6JK', '2026-05-20 06:37:34', 'editor', 'active', '2026-05-20 15:39:32'),
(7, 'Kelvin111', 'Kelvin', 'kelvin111@gmail.com', '$2b$10$ZPn28ZY1/UfkuZf5ohIAHOkOnHfm4Su.gKM/CA9u5F9MQC4pO1dDi', '2026-05-20 06:59:35', 'user', 'active', '2026-05-20 12:30:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `blog_categories`
--
ALTER TABLE `blog_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `collaborators`
--
ALTER TABLE `collaborators`
  ADD PRIMARY KEY (`document_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blog_id` (`blog_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `document_versions`
--
ALTER TABLE `document_versions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `document_id` (`document_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `document_id` (`document_id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- Indexes for table `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `social_accounts`
--
ALTER TABLE `social_accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_platform` (`user_id`,`platform`);

--
-- Indexes for table `social_posts`
--
ALTER TABLE `social_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blog_id` (`blog_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `blog_categories`
--
ALTER TABLE `blog_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `document_versions`
--
ALTER TABLE `document_versions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `social_accounts`
--
ALTER TABLE `social_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `social_posts`
--
ALTER TABLE `social_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `collaborators`
--
ALTER TABLE `collaborators`
  ADD CONSTRAINT `collaborators_ibfk_1` FOREIGN KEY (`document_id`) REFERENCES `documents` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `collaborators_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `document_versions`
--
ALTER TABLE `document_versions`
  ADD CONSTRAINT `document_versions_ibfk_1` FOREIGN KEY (`document_id`) REFERENCES `documents` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`document_id`) REFERENCES `documents` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `social_accounts`
--
ALTER TABLE `social_accounts`
  ADD CONSTRAINT `social_accounts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `social_posts`
--
ALTER TABLE `social_posts`
  ADD CONSTRAINT `social_posts_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
