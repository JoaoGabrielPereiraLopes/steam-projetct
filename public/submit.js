const photo = document.getElementById("photo");
// Selecione o formulário corretamente
const form = document.getElementById('cadastramento');
form.addEventListener('submit', async (e) => {
    alert(document.getElementById('photo').value)
    e.preventDefault(); // Evita o envio padrão e recarregamento da página

    // Pegue os valores do formulário
    const radios = document.getElementsByClassName('Idade');
    const nome = document.getElementById("nome");
    const valor = document.getElementById("valor");
    const tag = document.getElementById("tag");
    const descricao = document.getElementById("descricao");
    let marcado = null;
    Array.from(radios).forEach(element => {
        if (element.checked) {
            marcado = element;
        }
    });
    if (marcado!=null){
        const formData = {
            idade: marcado.value,
            nome: nome.value,
            valor: valor.value,
            tag: tag.value,
            descricao: descricao.value,
            foto:photo.files
        };
        try {
            const response = await fetch('/registra-jogo', {
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
                marcado.checked=false
                nome.value=''
                valor.value=''
                tag.value=''
                descricao.value=''
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    else{
        document.getElementById('message').innerHTML = 'preencha todos os campos';
    }
});
