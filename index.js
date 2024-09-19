const apiKey = 'AIzaSyCyMkAToVBW9DcALMUjCi_X6NrVeFOPE_M';
const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`;

function carregarFonte(fontFamily) {
    const existingLinks = document.querySelectorAll('link[rel="stylesheet"][data-font-family]');
    existingLinks.forEach(link => {
        if (link.getAttribute('data-font-family') !== fontFamily) {
            document.head.removeChild(link);
        }
    });

    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}&display=swap`;
    link.rel = 'stylesheet';
    link.setAttribute('data-font-family', fontFamily);
    document.head.appendChild(link);
}

function atualizarFontes() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const fontes = data.items.slice(0, 10);
            const dropdownMenu = document.querySelector('.dropdown-menu');

            dropdownMenu.innerHTML = '';

            fontes.forEach(fonte => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.classList.add('dropdown-item');
                a.href = "#";
                a.textContent = fonte.family;
                li.appendChild(a);
                dropdownMenu.appendChild(li);

                a.addEventListener('click', function () {
                    const fontFamily = fonte.family;
                    carregarFonte(fontFamily);
                    document.querySelector('.form-control').style.fontFamily = fontFamily;
                    atualizarTabelaComFonte(fontFamily);
                });
            });
        })
        .catch(error => console.error('Erro ao carregar as fontes:', error));
}

function atualizarTabelaComFonte(fontFamily) {
    const tabela = document.querySelector('.table');
    tabela.style.fontFamily = fontFamily; 

    const fonteCelula = document.querySelector('tbody tr:nth-child(2) td:nth-child(2)');
    fonteCelula.textContent = fontFamily;

    tratarTexto();
}

function tratarTexto() {
    const inputTexto = document.querySelector('.form-control').value;

    document.querySelectorAll('.table-dark tbody tr').forEach((row, index) => {
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

        valorCelula.style.fontFamily = document.querySelector('.form-control').style.fontFamily;
    });

    document.querySelectorAll('.table-secondary tbody tr').forEach((row, index) => {
        const valorCelula = row.querySelector('td:nth-child(2)');

        switch (index) {
            case 0: // startsWith('a')
                valorCelula.textContent = inputTexto.startsWith('a').toString();
                break;
            case 1: // endsWith('z')
                valorCelula.textContent = inputTexto.endsWith('z').toString();
                break;
            case 2: // replace('a', 'b')
                valorCelula.textContent = inputTexto.replaceAll('a', 'b');
                break;
            case 3: // slice(0, 5)
                valorCelula.textContent = inputTexto.slice(0, 5);
                break;
            case 4: // indexOf('e')
                valorCelula.textContent = inputTexto.indexOf('e');
                break;
            case 5: // includes('test')
                valorCelula.textContent = inputTexto.includes('test').toString();
                break;
        }
    });
}

function contarCaracteresRepetidos(texto) {
    const freq = {};
    for (let char of texto) {
        freq[char] = (freq[char] || 0) + 1;
    }
    return Object.values(freq).filter(c => c > 1).length;
}


document.addEventListener('DOMContentLoaded', atualizarFontes);
