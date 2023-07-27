/*
* =============================================================================
* SL_Icemenu_Monolith.js
* Version: v1.1.1
* Language Version: Brazilian Portuguese (pt-BR)
* =============================================================================

* =============================================================================
* LICENSE: PERSONAL

* > Attribution
* You must give appropriate credit, provide a link to the license,
* and indicate if changes were made. You may do so in any reasonable manner,
* but not in any way that suggests the licensor endorses you or your use.

* > No additional restrictions
* You may not apply legal terms or technological
* measures that legally restrict others from doing anything the license permits.

* > YOU CANNOT MODIFY THIS SCRIPT AND DISTRIBUTE A NEW SCRIPT BASED ON THIS AND GIVE CREDIT TO YOURSELF WITHOUT CITING THE ORIGINAL AUTHOR

=============================================================================
*/

/*:
 * @plugindesc SL Icemenu Monolith (Old "WG Icemenu v1.0") | Custom Menu for RMMV/RMMZ
 *
 *
 * @author Sir Lobo (Alex Lupóz)
 *
 *
 * @param MainSettings
 * @text Main Settings
 *
 *
 * @param OtherPreferences
 * @text Other preferences
 *
 *
 * @param CustomFont
 * @text Font name
 * @parent OtherPreferences
 * @dir js/plugins/SL_Icemenu_Monolith/fonts/
 * @desc Please, see the ITEM #1 at README.txt to know how you can configure
 * @default Zector
 *
 *
 * @param ColorTheme
 * @text Primary Theme Color (Hex)
 * @parent MainSettings
 * @type text
 * @default 3e759c
 * @desc Change the primary color of the selectors (needs to be a hexadecimal color. Just numbers, 3 or 6 characters)
 *
 *
 * @param UseArtwork
 * @text Use float artwork
 * @parent MainSettings
 * @type boolean
 * @default true
 * @desc Allow to use 'artwork.png' on screen
 *
 *
 * @param UseTitleAsImage
 * @text Image as title
 * @type boolean
 * @parent OtherPreferences
 * @default true
 * @desc Allow to use 'gamelogo.png' instead default title with text
 *
 *
 * @param EffectFadeDelay
 * @parent OtherPreferences
 * @text Delay on start
 * @type select
 *
 * @option 0.3s
 * @value 0.3s
 *
 * @option 0.5s
 * @value 0.5s
 *
 * @option 0.75s
 * @value 0.75s
 *
 * @option 1s
 * @value 1s
 *
 * @option 2s
 * @value 2s
 *
 * @option 3s
 * @value 3s
 *
 * @option 4s
 * @value 4s
 *
 * @option 5s
 * @value 5s
 *
 * @default 0.3s
 * @desc Delay time in seconds
 *
 *
 * @param HorizontalPosition
 * @text Horizontal position
 * @parent MainSettings
 * @type select
 * @option Left
 * @value Left
 * @option Center
 * @value Center
 * @option Right
 * @value Right
 * @default Left
 * @desc Set HORIZONTAL position of the menu
 *
 *
 * @param VerticalPosition
 * @text Vertical position
 * @parent MainSettings
 * @type select
 * @option Top
 * @value Top
 * @option Center
 * @value Center
 * @option Bottom
 * @value Bottom
 * @default Bottom
 * @desc Set VERTICAL position of the menu
 *
 *
 * @param MenuStyle
 * @text Menu style
 * @parent MainSettings
 * @type select
 * @option Vertical Aligned
 * @value Vertical Aligned
 * @option Horizontal Centered
 * @value Horizontal Centered
 * @option Vertical Cascade (Ascendent)
 * @value Vertical Cascade Ascendent
 * @option Vertical Cascade (Descendent)
 * @value Vertical Cascade Descendent
 * @default Vertical Aligned
 * @desc Set the menu style elements
 * -------------------------------------------------------------------------
 * @help
 //=========================================================================
 //  SIR LOBO ICE MENU 1.x.x
 //=========================================================================
 *	
 *	First, put the folder "SL_Icemenu_Monolith" in the default RMMMV/RMMZ plugins's folder
 *	Then copy "SL_Icemenu_Monolith.js" file to the plugins folder
 *	
 *  If you desire to change the font, just:
 *
 *  -Put your custom font on folder "SL_Icemenu_Monolith/fonts/"
 *  -Change the value from param "Font Name" with the same name of your ".ttf"
 *  -Don't insert the file extension
 *
 *  -------------------------------------------------------------------------
 *  Default Font Name: Zector
 *  -------------------------------------------------------------------------
 * YOU CANNOT MODIFY THIS SCRIPT AND DISTRIBUTE A NEW SCRIPT BASED ON THIS AND GIVE CREDIT TO YOURSELF WITHOUT CITING THE ORIGINAL AUTHOR
 *
 *  LICENSE: CC BY 4.0
 * > Attribution
 * You must give appropriate credit, provide a link to the license,
 * and indicate if changes were made. You may do so in any reasonable manner,
 * but not in any way that suggests the licensor endorses you or your use.
 *
 * > No additional restrictions
 * You may not apply legal terms or technological
 * measures that legally restrict others from doing anything the license permits.
 *
//=========================================================================
//  Contact Me
//=========================================================================
*
* Username on forums: Sir Lobo
*
* Forum Link: https://centrorpg.com/index.php?action=profile;u=8629
*
* Made with Love by Sir Lobo
* Hope this plugin helps! Keep Howling
* Special thanks to Comuns Team
*/

(() => {
	//-----------------------------------------------------------------------------------//
	// Inicia o plugin e configura o essencial
	//-----------------------------------------------------------------------------------//
	
    const pluginName = "SL Icemenu Monolith";

    const slpath = function(firstSubfolder = '', secondSubfolder = ''){
		let plugin_path_rel = '../../js/plugins/SL_Icemenu_Monolith/';

		firstSubfolder = (typeof firstSubfolder === 'string' && arguments.length == 0 && firstSubfolder != '') ?  '' : firstSubfolder + '/';
		secondSubfolder = (typeof secondSubfolder === 'string' && arguments.length == 0 && secondSubfolder != '') ?  '' : secondSubfolder + '/';
		
		return plugin_path_rel + firstSubfolder + secondSubfolder;
	}
	
	//-----------------------------------------------------------------------------------//
	// Define e configura os parâmetros
	//-----------------------------------------------------------------------------------//

    const parameters = PluginManager.parameters("SL_Icemenu_Monolith");

    const oParams = {
        CustomFont: String(parameters['CustomFont']),
        EffectFadeDelay: String(parameters['EffectFadeDelay']),
        ColorTheme: String(parameters['ColorTheme']),
        HorizontalPosition: String(parameters['HorizontalPosition']),
        VerticalPosition: String(parameters['VerticalPosition']),
        MenuStyle: String(parameters['MenuStyle']),
        UseTitleAsImage: String(parameters['UseTitleAsImage']),
        UseArtwork: String(parameters['UseArtwork'])
    };

	function parseDelayFloat(delayParam){
		let parsedParam = parseFloat(delayParam);
		let res = 300;
		
		switch(parsedParam)
		{
			case 0.3:
				res = 300;
				break;
			case 0.5:
				res = 500;
				break;
			case 0.75:
				res = 750;
				break;
			case 1:
				res = 1000;
				break;
			case 2:
				res = 2000;
				break;
			case 3000:
				res = 3000;
				break;
			case 4:
				res = 4000;
				break;
			case 5:
				res = 5000;
				break;
		}
	
		return res;
	}

    const ColorTheme = oParams.ColorTheme.substr(0,6);
    const oEffectFadeDelay = parseDelayFloat(oParams.EffectFadeDelay);
    const oHorizontalPosition = oParams.HorizontalPosition.toLowerCase();
    const oVerticalPosition = oParams.VerticalPosition.toLowerCase();
    const oMenuStyle = oParams.MenuStyle.toLowerCase();
    const oUseTitleAsImage = oParams.UseTitleAsImage.toLowerCase();
    const oUseArtwork = oParams.UseArtwork.toLowerCase();

	//-----------------------------------------------------------------------------------//
	// Manipulação da janela original (remover ou ocultar)
	//-----------------------------------------------------------------------------------//
	
	//Desabilita a interação no canvas original para evitar conflitos
	setTimeout(function(){
		document.querySelector('#gameCanvas').classList.add('#gameCanvasSub');
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
	
	//-----------------------------------------------------------------------------------//
	// Condições especiais de classes
	//-----------------------------------------------------------------------------------//

	const countMenuStyle = oMenuStyle.split(' ');
	var oMenuStyle_variation = oMenuStyle.trim().replace(' ','');

	//Menu style | Vertical Cascade (Ascendent and Descendent)
	var cssProps_verticalcascade = '';

	if(oMenuStyle.split(' ').length > 2){
		oMenuStyle_variation = 'verticalcascade_' + countMenuStyle[2];
		
		function cssSpc_verticalcascade(){
			let cssSpc_verticalcascadeArr = [];
			
			for(let i = 0; i < oMenuStyle.split(' ').length; i++){
				cssSpc_verticalcascadeArr.push(`
					#MainMenuWrapper.oMenuStyle--` + oMenuStyle_variation + ` > .mm_option:nth-child(` + (i + 1) + `)
					{
						margin-left: ` + (i) + `em;
					}
				`);
			}
			
			cssProps_verticalcascade = cssSpc_verticalcascadeArr.join('\n');
		}
		
		cssSpc_verticalcascade();
	}
	
	//-----------------------------------------------------------------------------------//
	// Criação dos elementos que compõem o menu principal
	//-----------------------------------------------------------------------------------//
	
	//Cria o container principal do menu
	elementHTML_container = document.createElement('div');
	document.body.appendChild(elementHTML_container);
	elementHTML_container.setAttribute('id', 'MainMenuContainer');
	
	//Cria o wrapper dos botões da navegação
	elementHTML_wrapper = document.createElement('div');
	elementHTML_container.appendChild(elementHTML_wrapper);
	elementHTML_wrapper.setAttribute('id', 'MainMenuWrapper');
	elementHTML_wrapper.setAttribute('class', 'oMenuStyle--' + oMenuStyle_variation);
	
	//Adiciona as classes necessárias
	let mm_container_classes_align_v = 'alignment__vertical--bottom'; //default vertical
	let mm_container_classes_align_h = 'alignment__horizontal--left'; //default horizontal

	elementHTML_container.classList.add('mmDisabled');
	
	//Verifica os parâmetros de posicionamento para adicionar as classes corretas (vertical e horizontal)
	switch(oVerticalPosition)
	{
		case 'top':
			mm_container_classes_align_v = 'alignment__vertical--top';
			break;
		case 'center':
			mm_container_classes_align_v = 'alignment__vertical--center';
			break;
		case 'bottom':
			mm_container_classes_align_v = 'alignment__vertical--bottom';
			break;
	   default:
			mm_container_classes_align_v = '';
			break;
	}

	switch(oHorizontalPosition)
	{
		case 'left':
			mm_container_classes_align_h = 'alignment__horizontal--left';
			break;
		case 'center':
			mm_container_classes_align_h = 'alignment__horizontal--center';
			break;
		case 'right':
			mm_container_classes_align_h = 'alignment__horizontal--right';
			break;
	}
	
	//Adiciona as classes de posicionamento obtidas para setar a posição do menu
	elementHTML_container.classList.add(mm_container_classes_align_v);
	elementHTML_container.classList.add(mm_container_classes_align_h);
	
	var buttonsArrayIndex = [];

	//Método para criar os elementos de botões interativos do menu principal
	function createMenuOptionButton(elName, buttonContentText){
		let hash = 'mm_' + elName;
		
		let elementHTML_optBtn = document.createElement('button');
		
		elementHTML_wrapper.appendChild(elementHTML_optBtn);
		elementHTML_optBtn.setAttribute('id', hash);
		elementHTML_optBtn.setAttribute('class', 'mm_option');
		elementHTML_optBtn.innerText = buttonContentText;
		
		buttonsArrayIndex.push(elementHTML_optBtn);
	}

	//Chama a função para cada um dos botões de opções (baseadas no menu padrão com as opções de "Novo Jogo", "Continuar", "Opções")
	createMenuOptionButton('newGame', 'Novo Jogo');
	createMenuOptionButton('continue', 'Continuar');
	createMenuOptionButton('options', 'Opções');

	//Seta as configurações iniciais do menu
	function MenuInit(){
		let el = document.querySelector('[id^="mm_continue"]');

		const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
		
		//Desabilita o menu original
		Window_TitleCommand.prototype.makeCommandList = function() {
			
			//Verifica se há um arquivo de salvamento para a opção de CONTINUE
			if(!DataManager.isAnySavefileExists())
				el.classList.add('mmDisabled');
		};
		
		setTimeout(function(){
			elementHTML_container.classList.remove('mmDisabled');
			elementHTML_container.classList.add('loaded');
		}, 300);
	}
	
	//Inicia as configurações essenciais para o funcionamento do menu
	MenuInit();

	//-----------------------------------------------------------------------------------//
	// Adição do CSS
	//-----------------------------------------------------------------------------------//

	const mmCss = `
		<style>
		#gameCanvasSub
		{
			user-select: none!important;
			pointer-events: none!important;
		}
		
		.loaded button
		{
			display: initial!important;
		}
		
		#MainMenuContainer
		{
			margin-top: -1000px;
			margin-left: -1000px;
			display: none;
			position: absolute;
			animation: fadeIn 2s;
			z-index: -9999;
			
			padding: 0;
			
			/*background: rgb(0 0 0 / 25%);*/
			/*background: black;*/
			
			background: none;
			
			/*border: 2px solid yellow;*//*debug resize container based on canvas */
		}
		
		#MainMenuContainer.loaded
		{
			z-index: 9;
			display: flex;
			width: 50%;
			height: auto;
			margin: 0;
			margin-top: auto!important;
			margin-top: initial;
			margin-left: initial;
		}	
		
		#MainMenuWrapper
		{
			display: flex;
			background: black;
			width: 35%;
		}
		
		/*-----------------------------------------------------------------------------------*/
		/* Menu Style Variations
		/*-----------------------------------------------------------------------------------*/
		
		#MainMenuWrapper.oMenuStyle--verticalaligned_descendent
		{
			flex-direction: column;
		}	
		
		#MainMenuWrapper.oMenuStyle--verticalcascade_ascendent
		{
			flex-direction: column;
			
			`
			
			+
			
			cssProps_verticalcascade
			
			+
			
			`
		}
		
		/*-----------------------------------------------------------------------------------*/
		/* Alignment Classes
		/*-----------------------------------------------------------------------------------*/
		
		/* Horizontal */
		
		.alignment__horizontal--left
		{
			justify-content: flex-start;
		}
		
		.alignment__horizontal--right
		{
			justify-content: flex-end;
		}
		
		.alignment__horizontal--center
		{
			justify-content: center;
		}

		/* Vertical */
		
		.alignment__vertical--top
		{
			align-items: flex-start;
		}
		
		.alignment__vertical--bottom
		{
			align-items: flex-end;
		}
		
		.alignment__vertical--center
		{
			align-items: center;
		}
		
		/* Alignment Classes */
		
		@keyframes fadeIn
		{
			from{opacity: 0;}
			to{opacity: 1;}
		}

		.mm_option
		{
			color: white!important;
			background: #` + ColorTheme + `!important;
			
			padding: 1em;
			
			border: 0;
			
			transition: 0.1s;
			
			margin: 0.5em 0.25em;
		}
		
		.mm_option:hover
		{
			filter: brightness(0.75);
			transition: 0.1s;
			scale: 2;
		}
		
		#MainMenuContainer.mmDisabled
		{
			display: none;
			transition: 0.2s;
			animation: fadeIn ` + oEffectFadeDelay +`s;
		}
		
		.mm_option.mmDisabled
		{
			user-select: none!important;
			pointer-events: none!important;
			filter: grayscale(0.5) brightness(0.75);
			opacity: 0.8;
		}
		
		/**/
		
		.mm_gamelogo
		{
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			max-width: fit-content;
		}
		</style>
	`;

	//Insere o CSS criado na área de renderização
	document.head.insertAdjacentHTML('beforeend', mmCss);
	
	//Habilita o container do menu para interação
	elementHTML_container.classList.remove('mmDisabled');

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
	
	//-----------------------------------------------------------------------------------//
	// Configura a gamelogo
	//-----------------------------------------------------------------------------------//
	
	const gamelogo_filename = slpath('img') + 'gamelogo--shadow-blur.png';

	function createGamelogo(){
		let elementID = 'mm_' + 'gamelogo_main';
		
		elementHTML_imgLogo = document.createElement('img');
		
		elementHTML_container.appendChild(elementHTML_imgLogo);
		elementHTML_imgLogo.setAttribute('id', elementID);
		elementHTML_imgLogo.setAttribute('class', 'mm_gamelogo');
		elementHTML_imgLogo.setAttribute('src', gamelogo_filename);
	}
	
	createGamelogo(); //Executa o método responsável por criar o elemento <img> que abrigará a gamelogo
	
	//-----------------------------------------------------------------------------------//
	// Listeners
	//-----------------------------------------------------------------------------------//
	
	//Listener dos botões do menu (chamam um evento/script/função específico do próprio RMMZ )
	document.querySelectorAll('.mm_option').forEach(item => {
		item.addEventListener('click', event => {
			var targetElement = event.target || event.srcElement;
			let elClass = targetElement.getAttribute('id');
			
			switch(elClass)
			{
				case 'mm_newGame':
					FNewGame(targetElement);
				break;
				case 'mm_continue':
					FContinueGame(targetElement);
				break;
				case 'mm_options':
					FOptions(targetElement);
				break;
			}
		})
	})
	
	/**/
	
	//Ao fechar o menu de opções (menu principal), o menu é mostrado novamente
	const _Scene_Options_popScene = Scene_Options.prototype.popScene;
	
	Scene_Options.prototype.popScene = function() {
	  _Scene_Options_popScene.call(this); // Executa a ação padrão do fechamento do menu de opções
	  ToggleMainMenu();
	};

	//Listener de redimensionamento do game canvas
	setTimeout(function(){
		let gameCanvas = document.querySelector('#gameCanvas');
		let menuContainer = document.querySelector('#MainMenuContainer');

		function outputsize() {
			//Get all gameCanvas style properties
			let sizeOffset = '36'; //36px
			let canvasStyleCSS = gameCanvas.style.cssText;
			
			//Apply CSS to "MainMenuContainer" from "gameCanvas" and remove unnecessary properties
			menuContainer.style.cssText = canvasStyleCSS;
			menuContainer.style.removeProperty('position');
			menuContainer.style.removeProperty('cursor');
			menuContainer.style.removeProperty('z-index');
			
			//Apply the offset values to width and height got from gameCanvas CSS style
			let gameCanvas_W = menuContainer.style.width;
			let gameCanvas_H = menuContainer.style.height;

			//Remove attributes to avoid duplicated properties
			menuContainer.style.removeProperty('width');
			menuContainer.style.removeProperty('height');

			menuContainer.style.setProperty('width', 'calc(' + gameCanvas_W + ' - ' + sizeOffset + 'px' + ')');
			menuContainer.style.setProperty('height', 'calc(' + gameCanvas_H + ' - ' + sizeOffset + 'px' + ')');
		}
		
		outputsize();

		new ResizeObserver(outputsize).observe(gameCanvas);
	}, 300);

	//--------------------------BUG---------------------------------------//
	
    //Cursor BackSprite Width
    /*Object.defineProperty(Window.prototype, "innerWidth", {
        get: function() {
            return Math.max(0, Graphics.width / 2 - 32);
        },
        configurable: true
    });*/
	
	//--------------------------BUG---------------------------------------//

    //Stop Cursor Blinking
    Window.prototype._makeCursorAlpha = function() {
        const baseAlpha = this.contentsOpacity / 255;
        return baseAlpha;
    };

    //Delete Any Title
    if(oUseTitleAsImage)
    {
        Scene_Title.prototype.drawGameTitle = function()
        {
            const x = 20;
            const y = Graphics.height / 4;
            const maxWidth = Graphics.width - x * 2;
            const text = '';
            const bitmap = this._gameTitleSprite.bitmap;
            bitmap.fontFace = $gameSystem.mainFontFace();
            bitmap.outlineColor = "black";
            bitmap.outlineWidth = 8;
            bitmap.fontSize = 72;
            bitmap.drawText(text, x, y, maxWidth, 48, "center");
        };
    }
    else
    {
        Scene_Title.prototype.drawGameTitle = function()
        {
            const x = 20;
            const y = 65;
            const maxWidth = Graphics.width - x * 2;
            const text = $dataSystem.gameTitle;
            const bitmap = this._gameTitleSprite.bitmap;
            bitmap.fontFace = $gameSystem.mainFontFace();
            bitmap.outlineColor = "black";
            bitmap.outlineWidth = 8;
            bitmap.fontSize = 72;
            bitmap.drawText(text, x, y, maxWidth, 48, "center");
        };
    }

    //Change Font
    FontManager.makeUrl = function(filename)
    {
        if(oParams.CustomFont == null || oParams.CustomFont == "")
        {
            return slpath('fonts') + Utils.encodeURI(filename);
		}
        else
        {
            return slpath('fonts') + oParams.CustomFont + '.ttf';
		}
    };
	
    /**/

    Scene_Title.prototype.UISprites= function(filename, xPos, yPos) {
        this._mPic = new Sprite();
        this._mPic.bitmap = ImageManager.loadSystem(slpath('img') + filename);
        this._mPic.x = xPos;
        this._mPic.y = yPos;
        this.addChild(this._mPic);
    }

    let MenuMovingPics = Scene_Title.prototype.create;

    Scene_Title.prototype.create = function() {
        MenuMovingPics.call(this);

        switch(oUseTitleAsImage)
        {
            case 0:
                this.UISprites("gamelogo", 0, 0);
                break;
            default:
                //
                break;
		}

        switch(oUseArtwork)
        {
            case 0:
                this.UISprites("artwork", 0, 0);
                break;
            default:
                //
                break;
		}
    }

    /**/

    Window.prototype.update = function() {
    if (this.active) {
        this._animationCount++;
    }
    for (const child of this.children) {
        if (child.update) {
            child.update();
        }
    }
};
})();