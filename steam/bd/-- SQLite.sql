-- SQLite
-- SQLite
CREATE TABLE genero(
 Id INTEGER PRIMARY KEY,
  Nome TEXT NOT NULL);
CREATE TABLE jogo(
    Id INTEGER PRIMARY KEY,
    Valor INTEGER,
    Nome TEXT,
    Tag INTEGER,
    idade_minima TEXT,
    FOREIGN KEY (Tag) REFERENCES tag(Id));
CREATE TABLE jogo_biblioteca (
    JOGO INTEGER,
    BIBLIOTECA INTEGER,
    PRIMARY KEY (JOGO, BIBLIOTECA)
);
CREATE TABLE usuario(
    Id INTEGER PRIMARY KEY,
    Nome text,
    Nascimento DATETIME,
    Cpf text,
    Nickname text
);