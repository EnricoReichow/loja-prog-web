USE lojaprogweb;

CREATE TABLE `lojaprogweb`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `productName` VARCHAR(200) NOT NULL,
  `price` FLOAT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `productName_UNIQUE` (`productName` ASC) VISIBLE);

INSERT INTO products (productName, price)
VALUES ('Raquete Vermelha Wilson', 959.99);

INSERT INTO products (productName, price)
VALUES ('Raquete B&W Wilson', 1090.00);

INSERT INTO products (productName, price)
VALUES ('Bola Premium Wilson', 249.99);

INSERT INTO products (productName, price)
VALUES ('Bola Standard Wilson', 139.99);

INSERT INTO products (productName, price)
VALUES ('Raquete Rosa BT Iniciante Wilson', 539.50);

INSERT INTO products (productName, price)
VALUES ('Raquete BT Profissional Nox Gianotti', 1039.00);

SELECT * FROM products;

#-------------

CREATE TABLE `lojaprogweb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(200) NOT NULL,
  `userEmail` VARCHAR(200) NOT NULL,
  `userPassword` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `userEmail_UNIQUE` (`userEmail` ASC) VISIBLE);

INSERT INTO users (userName, userEmail, userPassword)
VALUES ('Marcos Silva', 'marcos@gmail.com', 'marcos123');

SELECT * FROM users;

#-------------

CREATE TABLE `lojaprogweb`.`adm` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `admName` VARCHAR(200) NOT NULL,
  `admEmail` VARCHAR(200) NOT NULL,
  `admPassword` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `admEmail_UNIQUE` (`admEmail` ASC) VISIBLE);
  
INSERT INTO adm (admName, admEmail, admPassword)
VALUES ('Administrador', 'adm@breakpoint.com', 'adm123');

SELECT * FROM adm;

#------------

CREATE TABLE `lojaprogweb`.`carrinhoDeCompras` (
  `idItemNoCarrinho` INT NOT NULL AUTO_INCREMENT,
  `idProduct` INT NOT NULL,
  PRIMARY KEY (`idItemNoCarrinho`),
  UNIQUE INDEX `idItemNoCarrinho_UNIQUE` (`idItemNoCarrinho` ASC) VISIBLE,
  FOREIGN KEY (`idProduct`) REFERENCES `lojaprogweb`.`products` (`id`),
  CONSTRAINT `fk_carrinho_product` FOREIGN KEY (`idProduct`)
    REFERENCES `lojaprogweb`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

INSERT INTO carrinhoDeCompras (idProduct)
VALUES (2);

SELECT * FROM carrinhoDeCompras;