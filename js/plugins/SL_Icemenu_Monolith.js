(function() {
	//Método que inicializa e seta os parâmetros, funções e métodos essenciais
	function Initialize()
	{
		//Adiciona "overflow: hidden" na tag <body> para evitar o aparecimento de barras de rolagem durante o escalonamento do "container_menu"
		document.body.style.setProperty('overflow', 'hidden');
	}
	
	Initialize();
	
	//Variáveis globais para guardar o tamanho inicial do #gameVideo
	var initialWidth, initialHeight;

	//Método para criar o elemento "container_menu" e inserir o conteúdo HTML
	function createContainerMenu() {
		var containerMenu = document.createElement('div');
		containerMenu.id = 'container_menu';
		containerMenu.style.position = 'absolute';

		document.body.appendChild(containerMenu);
		insertHtmlContent(containerMenu);

		// Obter width e height do #gameVideo
		var gameVideo = document.getElementById('gameVideo');
		if (gameVideo) {
			initialWidth = gameVideo.clientWidth;
			initialHeight = gameVideo.clientHeight;

			// Atualizar a escala do "container_menu" quando a janela for redimensionada
			window.addEventListener('resize', function() {
				updateMenuScale(containerMenu, gameVideo);
			});

			// Atualizar a escala do "container_menu" após 350 milissegundos
			setTimeout(function() {
				updateMenuScale(containerMenu, gameVideo);
			}, 350); // Atraso de 350 milissegundos (0.35 segundos)
		} else {
			console.error('Erro: Não foi possível encontrar o elemento "gameVideo".');
		}
	}

	// Método para inserir o conteúdo HTML
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
					pointer-events: none; /* Impede que o container_menu intercepte eventos do mouse */
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
					transition: 0.2s;
				}
				.button:hover {
					background-color: #0000cc; /* Cor azul claro pouco saturado */
				}
			</style>
			<div id="container_menu">
				<!-- Coloque aqui os três botões -->
				<div id="container_menu">
					<button class="button">Botão 1</button>
					<button class="button">Botão 2</button>
					<button class="button">Botão 3</button>
				<div>
			</div>
		`;

		containerMenu.insertAdjacentHTML('beforeend', htmlContent);
	}

	// Método para atualizar a escala do "container_menu" com base no #gameVideo
	function updateMenuScale(containerMenu, gameVideo) {
		if (gameVideo) {
			var currentWidth = gameVideo.clientWidth;
			var currentHeight = gameVideo.clientHeight;

			var scaleX = currentWidth / initialWidth;
			var scaleY = currentHeight / initialHeight;

			var scaleFactor = Math.max(scaleX, scaleY);

			// Ajuste para manter o tamanho exato do #gameVideo sem criar barras de rolagem
			var adjustedWidth = initialWidth * scaleFactor;
			var adjustedHeight = initialHeight * scaleFactor;

			// Definir o tamanho do "container_menu" e desativar as barras de rolagem
			containerMenu.style.width = adjustedWidth + 'px';
			containerMenu.style.height = adjustedHeight + 'px';
			containerMenu.style.overflow = 'hidden';

			// Atualizar a escala do conteúdo interno de "container_menu" (botões, etc.)
			containerMenu.style.transform = 'scale(' + scaleFactor + ')';

			// Posicionamento do "container_menu" para alinhá-lo corretamente com o #gameVideo
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