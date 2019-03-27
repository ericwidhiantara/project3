-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 27, 2019 at 06:08 AM
-- Server version: 10.3.13-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `id3615754_rumahkos`
--

-- --------------------------------------------------------

--
-- Table structure for table `favorite`
--

CREATE TABLE `favorite` (
  `id_favorite` int(10) NOT NULL,
  `id_kos` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `favorite` enum('Ya','Tidak','','') COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kos`
--

CREATE TABLE `kos` (
  `id_kos` int(10) NOT NULL,
  `id_user` int(10) DEFAULT NULL,
  `nama_kos` varchar(50) NOT NULL,
  `harga` varchar(20) NOT NULL,
  `type` enum('Campuran','Putri','','') NOT NULL,
  `luas_kamar` varchar(10) NOT NULL,
  `fasilitas` text NOT NULL,
  `image` varchar(250) NOT NULL,
  `lng` varchar(100) NOT NULL,
  `lat` varchar(100) NOT NULL,
  `alamat` text NOT NULL,
  `kota` varchar(50) NOT NULL,
  `jml_kamar` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kos`
--

INSERT INTO `kos` (`id_kos`, `id_user`, `nama_kos`, `harga`, `type`, `luas_kamar`, `fasilitas`, `image`, `lng`, `lat`, `alamat`, `kota`, `jml_kamar`) VALUES
(2, 3, 'Contoh ', '500', 'Campuran', '6x6', 'WiFi ', 'https://nukeninkonoha.000webhostapp.com/uas/imgKost/image-87bbac39-4edf-4688-8a02-34a689077a2f.jpg', '115.025216', '-8.240461', 'Desa Pedawa', 'Singaraja ', 9),
(4, 4, 'Tes2', '400', 'Campuran', '4x4', 'Wifi', 'https://nukeninkonoha.000webhostapp.com/uas/imgKost/image-9bb8caf2-aa7b-4f0a-8c3a-3e4b2fe68dfd.jpg', '115.091625', '-8.114914', 'Singaraja', 'Singaraja', 6),
(5, 5, 'Rendy Kos', '500', 'Campuran', '2×4', 'Kamar Mandi Dalam', 'https://nukeninkonoha.000webhostapp.com/uas/imgKost/', '115.093052', '-8.111783', 'Singaraja', 'Singaraja', 10),
(6, 1, 'Contoh V2', '500', 'Campuran', '4x4', '$WIFI', 'https://nukeninkonoha.000webhostapp.com/uas/imgKost/image-3b85b8ec-8476-4bd8-abef-3fe4d81752ac.jpg', '115.102940', '-8.115915', 'banyuning', 'Singaraja', 7),
(8, 1, 'Gggg', '500', 'Campuran', '4x4', 'Wifi', 'https://nukeninkonoha.000webhostapp.com/uas/imgKost/image-9bb8caf2-aa7b-4f0a-8c3a-3e4b2fe68dfd.jpg', '115.025235', '-8.24057', 'B', 'Singaraja', 3),
(9, 1, 'Coba', '600', 'Putri', '5x5', 'Wifi', 'https://nukeninkonoha.000webhostapp.com/uas/imgKost/image-d8acad70-6856-4057-b7d0-5151d05abd39.jpg', '115.09958323091', '-8.1121161276966', 'Panji', 'Singaraja', 6),
(10, 10, 'Kossss', '567', 'Putri', 'Cc', 'Xxx', 'https://nukeninkonoha.000webhostapp.com/uas/imgKost/image-2c9bf100-b7d8-4f5c-938e-b31e73152649.jpg', '114.9838462472', '-8.207695397406', 'Fff', 'Sndjs', 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(32) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `nohp` varchar(12) NOT NULL,
  `image` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `email`, `password`, `nama`, `nohp`, `image`) VALUES
(1, 'nukenin.konoha@gmail.com', 'vicecity10', 'Eric Widhi Antara', '087863216757', 'https://nukeninkonoha.000webhostapp.com/uas/img/IMG_8843.JPG'),
(3, 'crashcyber20@gmail.com ', 'vicecity10', 'Eric Widhi Antara', '087863216757', 'https://nukeninkonoha.000webhostapp.com/uas/img/IMG_8843.JPG'),
(4, 'Tes@gmail.com', 'vicecity10', 'Eric', '08875557', 'https://nukeninkonoha.000webhostapp.com/uas/img/https://nukeninkonoha.000webhostapp.com/uas/img/image-4c13b1e9-819f-424e-91b6-788929680264.jpg'),
(5, 'Rhendy0188@gmail.Com', 'rendy', 'Rendy', '081935106970', 'https://nukeninkonoha.000webhostapp.com/uas/img/'),
(7, 'widhiadnyani24@gmail.com', 'Widhiloeloe24', 'Widhi Adnyani', '083129291376', 'https://nukeninkonoha.000webhostapp.com/uas/img/image-a97eef2d-baf5-42d0-b996-96dc4e00d6b1.jpg'),
(8, 'eric.widhi@gmail.com', 'vicecity10', 'Eric', '087863216757', 'https://nukeninkonoha.000webhostapp.com/uas/img/1528197160957.jpg'),
(9, 'Dithayadnya50@gmail.com', 'Wataboku123', 'Apa Aja Dah', '081337223168', 'https://nukeninkonoha.000webhostapp.com/uas/img/images (1).jpeg'),
(10, 'Rey', '123', 'rey', '555', 'https://nukeninkonoha.000webhostapp.com/uas/img/image-85cc9cb8-49b2-4599-afea-9de7741cd8cc.jpg'),
(11, '', '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`id_favorite`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_kos` (`id_kos`);

--
-- Indexes for table `kos`
--
ALTER TABLE `kos`
  ADD PRIMARY KEY (`id_kos`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `favorite`
--
ALTER TABLE `favorite`
  MODIFY `id_favorite` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kos`
--
ALTER TABLE `kos`
  MODIFY `id_kos` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favorite`
--
ALTER TABLE `favorite`
  ADD CONSTRAINT `favorite_ibfk_1` FOREIGN KEY (`id_kos`) REFERENCES `kos` (`id_kos`),
  ADD CONSTRAINT `favorite_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `id_kos` FOREIGN KEY (`id_kos`) REFERENCES `kos` (`id_kos`) ON DELETE CASCADE;

--
-- Constraints for table `kos`
--
ALTER TABLE `kos`
  ADD CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE,
  ADD CONSTRAINT `kos_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
