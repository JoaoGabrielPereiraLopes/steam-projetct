const photo = document.getElementById("photo");
const form = document.getElementById('cadastramento');
let foto = ''; // Variável global para armazenar o Base64

// Evento para processar a imagem selecionada
photo.addEventListener('change', (event) => {
    const file = event.target.files[0]; // Pega o arquivo selecionado
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            base64 = e.target.result; // Armazena o Base64 na variável global
            console.log('Base64 da imagem:', base64); // Verifique o Base64 no console
        };
        reader.readAsDataURL(file); // Converte o arquivo para Base64
    }
});

// Evento para envio do formulário
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário

    // Coletando os dados do formulário
    const radios = document.getElementsByClassName('Idade');
    const nome = document.getElementById("nome");
    const valor = document.getElementById("valor");
    const tag = document.getElementById("tag");
    const descricao = document.getElementById("descricao");

    let marcado = null;
    Array.from(radios).forEach(element => {
        if (element.checked) {
            marcado = element.value; // Pega o valor do rádio marcado
        }
    });

    // Validação dos campos
    if (!marcado || !nome.value || !valor.value || !tag.value || !descricao.value || !base64) {
        document.getElementById('message').innerHTML = 'Por favor, preencha todos os campos.';
        return;
    }

    // Montando os dados para envio
    const formData = {
        idade: marcado,
        nome: nome.value,
        valor: valor.value,
        tag: tag.value,
        descricao: descricao.value,
        foto: base64 // Base64 da imagem
    };

    try {
        const response = await fetch('/gamesend/registra-jogo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        const messageEl = document.getElementById('message');
        messageEl.innerHTML = result.message;

        if (result.status !== 'failed') {
            // Limpa os campos após o envio bem-sucedido
            form.reset();
            foto = ''; // Reseta a variável foto
        }
    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
    }
});
