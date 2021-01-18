-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema groupomania
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema groupomania
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `groupomania` DEFAULT CHARACTER SET utf8 ;
USE `groupomania` ;

-- -----------------------------------------------------
-- Table `groupomania`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `groupomania`.`users` ;

CREATE TABLE IF NOT EXISTS `groupomania`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(255) NULL,
  `lastName` VARCHAR(255) NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `isAdmin` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `groupomania`.`articles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `groupomania`.`articles` ;

CREATE TABLE IF NOT EXISTS `groupomania`.`articles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(120) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `users_id` INT NOT NULL,
  `image` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_articles_users_idx` (`users_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_articles_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `groupomania`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `groupomania`.`sharings`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `groupomania`.`sharings` ;

CREATE TABLE IF NOT EXISTS `groupomania`.`sharings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `articles_id` INT NOT NULL,
  `content` VARCHAR(255) NULL,
  PRIMARY KEY (`id`, `users_id`, `articles_id`),
  INDEX `fk_users_has_articles_articles1_idx` (`articles_id` ASC) VISIBLE,
  INDEX `fk_users_has_articles_users1_idx` (`users_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_users_has_articles_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `groupomania`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_articles_articles1`
    FOREIGN KEY (`articles_id`)
    REFERENCES `groupomania`.`articles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;