(function() {
	//------------------------------------------------------------------------------------------------------------------------//
	// INICIALIZAÇÃO
	// Executa e seta o essencial para funcionamento e/ou inicialização do sistema
	//------------------------------------------------------------------------------------------------------------------------//
	
    const pluginName = "SL Icemenu Monolith";

	//ID exclusiva do plugin
	const PluginID = 'SLICMLT';
	const mainContainerID = PluginID + '_container'.toString();

    //Caminho padrão do plugin para pastas de recursos
    const slpath = function(firstSubfolder = '', secondSubfolder = ''){
		let plugin_path_rel = '../../js/plugins/SL_Icemenu_Monolith/';

		firstSubfolder = (typeof firstSubfolder === 'string' && arguments.length == 0 && firstSubfolder != '') ?  '' : firstSubfolder + '/';
		secondSubfolder = (typeof secondSubfolder === 'string' && arguments.length == 0 && secondSubfolder != '') ?  '' : secondSubfolder + '/';
		
		return plugin_path_rel + firstSubfolder + secondSubfolder;
	}

	//Método que inicializa e seta os parâmetros, funções e métodos essenciais
	function Initialize()
	{
		//Adiciona "overflow: hidden" na tag <body> para evitar o aparecimento de barras de rolagem durante o escalonamento do "container_menu"
		document.body.style.setProperty('overflow', 'hidden');

		//-----------------------------------------------------------------------------------//
		// Manipulação da janela original (remover ou ocultar)
		//-----------------------------------------------------------------------------------//
		
		//Desabilita a interação no canvas original para evitar conflitos
		setTimeout(function(){
			document.querySelector('#gameCanvas').classList.add('interactionDisabled');
		},350);
		
		//Remove o menu de opções original
		let windowAttrs = Scene_Title.prototype.create;

	    Scene_Title.prototype.create = function() {
	        windowAttrs.call(this);

	        this._commandWindow.opacity = 0;
	        this._commandWindow.width = 0;
	        this._commandWindow.height = 0;
			this._commandWindow.x = -2000;
			this._commandWindow.y = -2000;

			this._commandWindow.windowskin = ImageManager.loadSystem(slpath('img') + 'menu_window');
	        
	        //Remove Content BackSprite
	        this._commandWindow._contentsBackSprite.alpha = 0;
	    }
	}
	
	Initialize();
	
	//------------------------------------------------------------------------------------------------------------------------//
	// MANIPULAÇÃO DOS ELEMENTOS DE CONTAINER-MESTRE
	// O container-mestre é usado em todos os plugins de interface que precisam ser escalonados proporcionalmente
	//------------------------------------------------------------------------------------------------------------------------//

	//Variáveis globais para guardar o tamanho inicial do #gameVideo
	var initialWidth, initialHeight;

	//Método para criar o elemento "container_menu" e inserir o conteúdo HTML
	function createContainerMenu() {
		var containerMenu = document.createElement('div');
		containerMenu.id = mainContainerID;
		containerMenu.classList.add('mm_containerMenu');
		containerMenu.classList.add('invisible');

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
		var cssContent = `
			<style>
				body
				{
					margin: 0;
					padding: 0;
				}

				.interactionDisabled
				.btn[class*="disabled"],
				.btn:disabled
				{
					pointer-events: none!important;
					user-select: none!important;
				}

				.invisible
				{
					display: none!important;
				}

				/**/

				.mm_containerMenu
				{
					position: absolute;
				}

				.mm_containerMenu:not(.invisible)
				{
					animation: fadeIn 2s;
				}
				
				#` + mainContainerID + `
				{
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					gap: 10px;
					z-index: 9999; /* Certifique-se de que o container_menu esteja acima de outros elementos */
					pointer-events: none; /* Impede que o container_menu intercepte eventos do mouse */
					
					animation: fadeIn 0.5s;
				}
				
				.btn:not(.disabled),
				.interactive
				{
					pointer-events: all!important;
				}
				
				/**/

				#` + mainContainerID + ` .wrapper__menu--item
				{
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
				
				#` + mainContainerID + ` .wrapper__menu--item:hover
				{
					background-color: #0000cc; /* Cor azul claro pouco saturado */
				}

				/* CSS ANIMATIONS */

				@keyframes fadeIn
				{
					from{opacity: 0;}
					to{opacity: 1;}
				}
			</style>
		`;
		
		var htmlContent = `
			<div class="wrapper">
				<div class="wrapper__menu">
					<button class="btn wrapper__menu--item">Botão 1</button>
					<button class="btn wrapper__menu--item">Botão 2</button>
					<button class="btn wrapper__menu--item">Botão 3</button>
				<div>
			</div>
		`;

		document.head.insertAdjacentHTML('beforeend', cssContent); //Insert CSS styles on <head>
		containerMenu.insertAdjacentHTML('beforeend', htmlContent); //Insert HTML elements

		/**/

		//Fade in to turn on the elements
		setTimeout(()=>{containerMenu.classList.remove('invisible');},350);
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
	
	//------------------------------------------------------------------------------------------------------------------------//
	// MANIPULAÇÃO DOS MÓDULOS DO PLUGIN
	// A partir daqui, ficam os métodos modulares para criar e manipular outros elementos relativos ao plugin
	//------------------------------------------------------------------------------------------------------------------------//

	setTimeout(function() {
		// Verificar se estamos no menu principal antes de criar o "container_menu" e inserir o conteúdo HTML
		if (SceneManager._scene instanceof Scene_Title){
			// Aguardar 350 milissegundos antes de criar o "container_menu"
			createContainerMenu();
		} else {
			console.error('Erro: Não é possível criar o elemento HTML fora da cena do menu principal.');
		}
	}, 1000);
	
	//-----------------------------------------------------------------------------------//
	// Funções das opções
	//-----------------------------------------------------------------------------------//
	
	//Novo novo
	function FNewGame(el){
		ToggleMainMenu(); //Esconde o menu principal
		SceneManager.goto(Scene_Map);
	}
	
	//Continuar
	function FContinueGame(el){
		if (DataManager.isAnySavefileExists()) {
			ToggleMainMenu(); //Esconde o menu principal
			SceneManager.push(Scene_Load); //Chama a cena de carregamento de saves
		}else{
			el.classList.add('mmDisabled'); //Botão desabilitado caso não existe arquivo de save
		}
	}
	
	//Opções
	function FOptions(el){
		SceneManager.push(Scene_Options);
		ToggleMainMenu(); //Esconde o menu principal ao abrir o menu de opções do menu principal
	}

	//Alterna a visibilidade do menu quando necessário
	function ToggleMainMenu(){
		let el = document.querySelector('#MainMenuContainer');
		
		if(el.classList.contains('mmDisabled'))
			el.classList.remove('mmDisabled');
		else
			el.classList.add('mmDisabled');
	}
})();