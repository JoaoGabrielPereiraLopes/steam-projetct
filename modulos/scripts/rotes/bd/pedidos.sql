CREATE TABLE Pedidos(
    ID INTEGER PRIMARY KEY,
    comida INTEGER,
    Usuario INTEGER,
    pronto BOOLEAN,
    FOREIGN KEY(comida) REFERENCES COMIDA(ID),
    FOREIGN KEY(Usuario) REFERENCES Usuario(ID)
);