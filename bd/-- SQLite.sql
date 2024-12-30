-- Tabela de Gêneros
CREATE TABLE genero (
    Id INTEGER PRIMARY KEY,
    Nome TEXT NOT NULL
);

-- Tabela de Jogos
CREATE TABLE jogo (
    Id INTEGER PRIMARY KEY,
    Valor NUMERIC NOT NULL,
    Nome TEXT NOT NULL UNIQUE,
    Tag INTEGER,
    Idade_Minima INTEGER NOT NULL,
    Descricao TEXT,
    FOREIGN KEY (Tag) REFERENCES genero(Id)
);

-- Tabela de Associação Jogo-Biblioteca
CREATE TABLE jogo_biblioteca (
    Jogo INTEGER NOT NULL,
    Biblioteca INTEGER NOT NULL,
    PRIMARY KEY (Jogo, Biblioteca),
    FOREIGN KEY (Jogo) REFERENCES jogo(Id),
    FOREIGN KEY (Biblioteca) REFERENCES usuario(Id)
);

-- Tabela de Usuários
CREATE TABLE usuario (
    Id INTEGER PRIMARY KEY,
    Nome TEXT NOT NULL,
    Nascimento DATE NOT NULL,
    Cpf TEXT NOT NULL UNIQUE,
    Nickname TEXT NOT NULL UNIQUE
);
