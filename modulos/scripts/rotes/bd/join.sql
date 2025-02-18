SELECT ingredientes.Nome,Comida.Nome
FROM IngredienteComida
JOIN COMIDA ON IngredienteComida.comida = COMIDA.ID
JOIN ingredientes ON IngredienteComida.ingrediente = ingredientes.ID;

SELECT ingredientes.Nome
FROM intolerancia
JOIN ingredientes ON intolerancia.Ingredientes = ingredientes.ID;

SELECT intolerancia.Ingredientes,Usuario.ID
FROM intoleranciaUsuario
JOIN intolerancia ON intoleranciaUsuario.Intolerancia = ingredientes.ID
JOIN Usuario ON intoleranciaUsuario.Usuario = Usuario.ID;