const apiKey = 'AIzaSyCyMkAToVBW9DcALMUjCi_X6NrVeFOPE_M';
const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`;

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
        });
      })
      .catch(error => console.error('Erro ao carregar as fontes:', error));
}

