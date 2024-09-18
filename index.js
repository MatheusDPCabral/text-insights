const apiKey = 'AIzaSyCyMkAToVBW9DcALMUjCi_X6NrVeFOPE_M';
const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`;

// Função para atualizar as fontes
function atualizarFontes() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const fontes = data.items.slice(0, 10);
            const dropdownMenu = document.querySelector('.dropdown-menu');

            dropdownMenu.innerHTML = ''; // Limpar menu antes de adicionar novas fontes

            fontes.forEach(fonte => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.classList.add('dropdown-item');
                a.href = "#";
                a.textContent = fonte.family;
                li.appendChild(a);
                dropdownMenu.appendChild(li);

                // Aplicar a fonte selecionada ao input de texto e à tabela
                a.addEventListener('click', function () {
                    const fontFamily = fonte.family;
                    
                    // Aplicar a fonte ao campo de entrada e à tabela
                    document.querySelector('.form-control').style.fontFamily = fontFamily;
                    atualizarTabelaComFonte(fontFamily);
                });
            });
        })
        .catch(error => console.error('Erro ao carregar as fontes:', error));
}

// Função para atualizar a tabela com a nova fonte
function atualizarTabelaComFonte(fontFamily) {
    const tabela = document.querySelector('.table');
    tabela.style.fontFamily = fontFamily; // Atualiza a fonte da tabela
    
    // Atualizar a tabela com o nome da fonte selecionada
    const fonteCelula = document.querySelector('tbody tr:nth-child(2) td:nth-child(2)');
    fonteCelula.textContent = fontFamily;

    // Atualizar os valores na tabela
    tratarTexto();
}

// Função para contar caracteres repetidos
function contarCaracteresRepetidos(texto) {
    const freq = {};
    for (let char of texto) {
        freq[char] = (freq[char] || 0) + 1;
    }
    return Object.values(freq).filter(c => c > 1).length;
}

// Função para tratar o texto e atualizar os valores na tabela
function tratarTexto() {
    const inputTexto = document.querySelector('.form-control').value;

    // Preenchendo a tabela com as análises
    document.querySelectorAll('tbody tr').forEach((row, index) => {
        const valorCelula = row.querySelector('td:nth-child(2)');

        switch (index) {
            case 0: // Tamanho do texto
                valorCelula.textContent = inputTexto.length;
                break;
            case 1: // Fonte (atualizada dinamicamente)
                valorCelula.textContent = document.querySelector('.form-control').style.fontFamily || '@default';
                break;
            case 2: // Maiúsculo
                valorCelula.textContent = inputTexto.toUpperCase();
                break;
            case 3: // Minúsculo
                valorCelula.textContent = inputTexto.toLowerCase();
                break;
            case 4: // String Reversa
                valorCelula.textContent = inputTexto.split('').reverse().join('');
                break;
            case 5: // Quantidade de caracteres repetidos
                valorCelula.textContent = contarCaracteresRepetidos(inputTexto);
                break;
        }

        // Aplicar a fonte a todos os valores da tabela
        valorCelula.style.fontFamily = document.querySelector('.form-control').style.fontFamily;
    });
}

// Inicializar o dropdown de fontes ao carregar a página
document.addEventListener('DOMContentLoaded', atualizarFontes);
