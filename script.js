// Função para consumir a API e popular a seção de serviços
document.addEventListener("DOMContentLoaded", function () {
    const servicesGrid = document.getElementById('servicesGrid');

    // Função para buscar os serviços
    async function fetchServices() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();

            const services = data.slice(0, 10);

            // Inserindo os serviços no grid
            services.forEach(service => {
                const card = document.createElement('div');
                card.className = 'service-card';
                card.innerHTML = `
                    <h4>${service.title}</h4>
                    <p>${service.body}</p>
                `;
                servicesGrid.appendChild(card);
            });
        } catch (error) {
            console.error('Erro ao buscar serviços:', error);
        }
    }

    fetchServices();
});




// Função para buscar depoimentos de uma API
async function buscarTestemunhos() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        if (!response.ok) throw new Error('Erro na rede');
        const comentarios = await response.json();

        // Adaptar dados para o formato esperado
        return comentarios.map(comentario => ({
            nome: comentario.name,
            // Usando uma imagem padrão de placeholder
            foto: `https://via.placeholder.com/80`, // Imagem padrão
            depoimento: comentario.body
        }));
    } catch (error) {
        console.error('Erro ao buscar depoimentos:', error);
        return [];
    }
}

// Função para renderizar os testemunhos
async function renderizarTestemunhos() {
    const container = document.getElementById('testemunhos-container');
    const testemunhos = await buscarTestemunhos();

    // Limitar a 10 depoimentos
    const depoimentosLimitados = testemunhos.slice(0, 20);

    // Se não houver depoimentos, exibir mensagem
    if (depoimentosLimitados.length === 0) {
        container.innerHTML = '<p>Nenhum depoimento disponível.</p>';
        return;
    }

    depoimentosLimitados.forEach(testemunho => {
        const div = document.createElement('div');
        div.classList.add('testemunho');
        div.setAttribute('data-aos', 'fade-up'); // Animação AOS
        div.innerHTML = `
            <img src="${testemunho.foto}" alt="${testemunho.nome}">
            <h3>${testemunho.nome}</h3>
            <p>${testemunho.depoimento}</p>
        `;
        container.appendChild(div);
    });
}

// Inicializar AOS
AOS.init();

// Chamar a função para renderizar os testemunhos
renderizarTestemunhos();




// Slider com Swiper.js
const swiper = new Swiper('.swiper-container', {
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// Animações com AOS.js
AOS.init();




// Inicialize o EmailJS
(function () {
    emailjs.init("vSNGUP7LTSgmytz-h");
})();

document.getElementById('contato-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const mensagem = document.getElementById('mensagem').value;

    // Validação simples
    if (!nome || !email || !telefone || !mensagem) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    try {
        const response = await emailjs.send("service_casadecultura", "template_3i45hgg", {
            name: nome,
            email: email,
            phone: telefone,
            message: mensagem,
        });

        document.getElementById('resultado').innerHTML = "Mensagem enviada com sucesso!";
        document.getElementById('contato-form').reset(); // Limpa o formulário
    } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        document.getElementById('resultado').innerHTML = "Erro ao enviar mensagem. Tente novamente.";
    }
});