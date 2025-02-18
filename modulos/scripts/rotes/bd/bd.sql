
CREATE TABLE COMIDA(
    ID INTEGER PRIMARY KEY,
    Preparo NUMERIC,
    Preco NUMERIC,
    Nome text
);

CREATE TABLE ingredientes(
    ID integer PRIMARY KEY,
    Nome text
);

CREATE TABLE IngredienteComida (
    comida INTEGER,
    ingrediente INTEGER,
    FOREIGN KEY (comida) REFERENCES COMIDA(ID),
    FOREIGN KEY (ingrediente) REFERENCES ingredientes(ID)
);

CREATE TABLE intolerancia(
    ID INTEGER PRIMARY KEY,
    Nome Text,
    Ingredientes INTEGER,
    FOREIGN KEY(Ingredientes) REFERENCES ingredientes(ID)
);
CREATE TABLE Usuario(
    ID INTEGER PRIMARY KEY,
    nome text
);
CREATE TABLE intoleranciaUsuario(
    Usuario integer,
    Intolerancia INTEGER,
    FOREIGN KEY(Usuario) REFERENCES Usuario(ID),
    FOREIGN KEY(Intolerancia) REFERENCES intolerancia(ID)
);