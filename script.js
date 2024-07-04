async function cadastrarUsuario() {
    const nome = document.getElementById('nome').value;
    const response = await fetch('/cadastrar_usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome })
    });

    const mensagens = document.getElementById('mensagens');
    mensagens.innerHTML = ''; // Limpa mensagens anteriores

    if (response.ok) {
        const p = document.createElement('p');
        p.textContent = 'Produto cadastrado com sucesso!';
        p.classList.add('sucesso'); // Classe para estilo de sucesso
        mensagens.appendChild(p);
        document.getElementById('nome').value = '';
    } else {
        const p = document.createElement('p');
        p.textContent = 'Erro ao cadastrar produto.';
        p.classList.add('erro'); // Classe para estilo de erro
        mensagens.appendChild(p);
    }

    carregarUsuarios(); 
}

async function carregarUsuarios() {
    const response = await fetch('/buscar_usuario');
    if (response.ok) {
        const usuarios = await response.json();
        const lista = document.getElementById('usuarios');
        lista.innerHTML = '';
        usuarios.forEach(usuario => {
            const li = document.createElement('li');
            li.innerHTML = `${usuario.id} - ${usuario.nome} <button onclick="deletarUsuario(${usuario.id})">Deletar</button>`;
            lista.appendChild(li);
        });
        mostrarListaUsuarios();
    } else {
        const mensagens = document.getElementById('mensagens');
        const p = document.createElement('p');
        p.textContent = 'Erro ao carregar produto.';
        p.classList.add('erro');
        mensagens.appendChild(p);
    }
}

async function deletarUsuario(id) {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
        const response = await fetch(`/deletar_usuario/${id}`, { method: 'DELETE' });
        const mensagens = document.getElementById('mensagens');
        mensagens.innerHTML = '';

        if (response.ok) {
            const p = document.createElement('p');
            p.textContent = 'Produto deletado com sucesso!';
            p.classList.add('sucesso');
            mensagens.appendChild(p);
        } else {
            const p = document.createElement('p');
            p.textContent = 'Erro ao deletar produto.';
            p.classList.add('erro');
            mensagens.appendChild(p);
        }

        carregarUsuarios();
    }
}

// Inicialização
carregarUsuarios();
