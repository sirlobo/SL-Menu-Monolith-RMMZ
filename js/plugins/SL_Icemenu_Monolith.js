(function() {
    // Função para criar o elemento "container_menu" e inserir o conteúdo HTML
    function createContainerMenu() {
        var containerMenu = document.createElement('div');
        containerMenu.id = 'container_menu';
        containerMenu.style.position = 'absolute';

        document.body.appendChild(containerMenu);
        insertHtmlContent(containerMenu);

        // Obter width e height do #gameVideo
        var gameVideo = document.getElementById('gameVideo');
        if (gameVideo) {
            var initialWidth = gameVideo.clientWidth;
            var initialHeight = gameVideo.clientHeight;

            // Atualizar a escala do "container_menu" quando a janela for redimensionada
            window.addEventListener('resize', function() {
                updateMenuScale(containerMenu, initialWidth, initialHeight);
            });

            // Atualizar a escala do "container_menu" após 350 milissegundos
            setTimeout(function() {
                updateMenuScale(containerMenu, initialWidth, initialHeight);
            }, 350); // Atraso de 350 milissegundos (0.35 segundos)
        } else {
            console.error('Erro: Não foi possível encontrar o elemento "gameVideo".');
        }
    }

    // Função para inserir o conteúdo HTML
    function insertHtmlContent(containerMenu) {
        var htmlContent = `
            <style>
                body {
                    margin: 0;
                    padding: 0;
                }
                #container_menu {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    z-index: 9999; /* Certifique-se de que o container_menu esteja acima de outros elementos */
                }
				
				.btn
				button,
				input[type="button"],
				.btn:hover
				button:hover,
				input[type="button"]:hover
				{
					transition: 0.2s;
				}
				
                .button {
                    padding: 1em;
                    background-color: #b3d1f3; /* Cor azul claro pouco saturado */
                    color: #fff;
                    font-size: 16px;
                    cursor: pointer;
                    text-align: center; /* Centralizar o texto nos botões */
					border: 0 none;
					outline: 0;
                }
                .button:hover {
                    background-color: #0000cc; /* Cor azul claro pouco saturado */
                }
            </style>
            <div id="container_menu">
                <!-- Coloque aqui os três botões -->
                <button class="button">Botão 1</button>
                <button class="button">Botão 2</button>
                <button class="button">Botão 3</button>
            </div>
        `;

        containerMenu.insertAdjacentHTML('beforeend', htmlContent);
    }

    // Função para atualizar a escala do "container_menu" com base no #gameVideo
    function updateMenuScale(containerMenu, initialWidth, initialHeight) {
        var gameVideo = document.getElementById('gameVideo');
        if (gameVideo) {
            var currentWidth = gameVideo.clientWidth;
            var currentHeight = gameVideo.clientHeight;

            var scaleX = currentWidth / initialWidth;
            var scaleY = currentHeight / initialHeight;

            var scaleFactor = Math.min(scaleX, scaleY);
            containerMenu.style.transform = 'scale(' + scaleFactor + ')';
            containerMenu.style.width = initialWidth * scaleFactor + 'px';
            containerMenu.style.height = initialHeight * scaleFactor + 'px';

            // Atualizar a posição do "container_menu" com base na posição do #gameVideo
            var gameVideoRect = gameVideo.getBoundingClientRect();
            containerMenu.style.left = gameVideoRect.left + 'px';
            containerMenu.style.top = gameVideoRect.top + 'px';
        }
    }

	setTimeout(function() {
		// Verificar se estamos no menu principal antes de criar o "container_menu" e inserir o conteúdo HTML
		if (SceneManager._scene instanceof Scene_Title){
			// Aguardar 350 milissegundos antes de criar o "container_menu"
			
				createContainerMenu();
			
		} else {
			console.error('Erro: Não é possível criar o elemento HTML fora da cena do menu principal.');
		}
	}, 350);
})();