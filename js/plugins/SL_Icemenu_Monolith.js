/*
* =============================================================================
* SL_Icemenu_Monolith.js
* Version: v1.0.0
* Language Version: Brazilian Portuguese (pt-BR)
* =============================================================================

* =============================================================================
* LICENSE: CC BY 4.0

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
 * @author Sir Lobo (Alex Lupóz)
 *
 * @param CustomFont
 * @text Font Name
 * @desc Put your custom font on wg_menu/fonts/ and type here the name exactly as it is there
 * @default Zector
 *
 * @param ColorTheme
 * @text Primary Theme Color (Hex)
 * @type text
 * @default 3e759c
 * @desc Change the primary color of the selectors (needs to be a hexadecimal color. Just numbers, 3 or 6 characters)
 *
 * @param UseArtwork
 * @type select
 * @option Yes
 * @value 0
 * @option No
 * @value 1
 * @default 0
 * @desc Allow to use 'artwork.png' on screen
 *
 * @param UseTitleAsImage
 * @type select
 * @option Yes
 * @value 0
 * @option No
 * @value 1
 * @default 0
 * @desc Allow to use 'gamelogo.png' instead title text
 *
 * @param HorizontalPosition
 * @type select
 * @option Left
 * @value 0
 * @option Center
 * @value 1
 * @option Right
 * @value 2
 * @default 2
 * @desc Set horizontal position of the menu
 *
 * @param VerticalPosition
 * @type select
 * @option Center
 * @value 1
 * @option Bottom
 * @value 2
 * @default 2
 * @desc Set vertical position of the menu
 *
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
    //Plugin Info & Settings
    const pluginName = "WG Ice Menu";
    const wgpath = '../../js/plugins/SL_Icemenu_Monolith/';

    //Params
    const parameters = PluginManager.parameters("SL_Icemenu_Monolith");

    const oParams = {
        CustomFont: String(parameters['CustomFont']),
        ColorTheme: String(parameters['ColorTheme']),
        HorizontalPosition: String(parameters['HorizontalPosition']),
        VerticalPosition: String(parameters['VerticalPosition']),
        UseTitleAsImage: String(parameters['UseTitleAsImage']),
        UseArtwork: String(parameters['UseArtwork'])
    };

    const ColorTheme = oParams.ColorTheme.substr(0,6);
    const oHorizontalPosition = parseInt(oParams.HorizontalPosition);
    const oVerticalPosition = parseInt(oParams.VerticalPosition);
    const oUseTitleAsImage = parseInt(oParams.UseTitleAsImage);
    const oUseArtwork = parseInt(oParams.UseArtwork);

    //Change Window Attributes
	let windowAttrs = Scene_Title.prototype.create;

    Scene_Title.prototype.create = function() {
        windowAttrs.call(this);

        this._commandWindow.opacity = 0;
        this._commandWindow.width = Graphics.width / 2;

        switch(oVerticalPosition)
        {
            case 1:
                this._commandWindow.y = this._commandWindow.width / 2 + 52;
                break;
            case 2:
                this._commandWindow.y = this._commandWindow.width;
                break;
           default:
                this._commandWindow.y = this._commandWindow.width / 2 + 52;
                break;
		}

        switch(oHorizontalPosition)
        {
            case 0:
                this._commandWindow.x = -20;
                break;
            case 1:
                this._commandWindow.x = Graphics.width / 2 / 2;
                break;
            case 2:
                this._commandWindow.x = Graphics.width - 280;
                break;
           default:
                this._commandWindow.x = Graphics.width / 2 / 2;
                break;
		}

		this._commandWindow.windowskin = ImageManager.loadSystem(wgpath + "img/menu_window");
        
        //Remove Content BackSprite
        this._commandWindow._contentsBackSprite.alpha = 0;
    }
	
	/*timeBG = document.createElement('img');
	timeBG.src = "wg_menu/img/unnamed2.jpg";
	document.body.appendChild(timeBG);
	timeBG.style.position = 'absolute';
	timeBG.style.zIndex = '99999';
	timeBG.setAttribute("id", "buttontestimg");*/

	//Cria os elementos que compõem o menu principal
	
	el_wrapperDiv = document.createElement('div');
	document.body.appendChild(el_wrapperDiv);
	el_wrapperDiv.setAttribute('id', 'MainMenuWrapper');
	el_wrapperDiv.classList.add('mmDisabled');
	
	function createMenuOptionButton(elName, buttonContentText){
		// let hash = 'mm_' + elName + '_' + Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
		let hash = 'mm_' + elName;
		
		el = document.createElement('button');
		
		el_wrapperDiv.appendChild(el);
		el.setAttribute('id', hash);
		el.setAttribute('class', 'mm_option');
		el.innerText = buttonContentText;
	}
	
	createMenuOptionButton('newGame', 'Novo Jogo');
	createMenuOptionButton('continue', 'Continuar');
	createMenuOptionButton('options', 'Opções');

	//Seta as configurações iniciais do menu
	function MenuInit(){
		let el = document.querySelector('[id^="mm_continue"]');

		const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
		
		Window_TitleCommand.prototype.makeCommandList = function() {
			//Desabilita o menu original
			/*_Window_TitleCommand_makeCommandList.call(this);
			this.addCommand('Novo Jogo', 'newGame');
			this.addCommand('Continuar', 'continue', DataManager.isAnySavefileExists());
			this.addCommand('Opções', 'options');*/
			
			//Verifica se há um arquivo de salvamento para a opção de CONTINUE
			if(!DataManager.isAnySavefileExists())
				el.classList.add('mmDisabled');
		};
		
		el_wrapperDiv.classList.remove('mmDisabled');
		el_wrapperDiv.classList.add('loaded');
	}
	
	//Inicia as configurações essenciais para o funcionamento do menu
	MenuInit();
	
	/**/
	
	//Adição do menu suspenso
	const mmCss = `
		<style>
		.loaded button
		{
			display: initial!important;
		}
		
		#MainMenuWrapper
		{
			margin-top: -1000px;
			margin-left: -1000px;
			display: none;
			position: absolute;
			animation: fadeIn 2s;
			z-index: -9999;
			
			padding: 0;
			
			/*background: rgb(0 0 0 / 25%);*/
			
			background: black;
			border: 2px solid yellow;
		}
		
		#MainMenuWrapper.loaded
		{
			z-index: 9;
			display: flex;
			width: 50%;
			height: auto;
			padding: 1em;
			margin: 0;
			margin-top: auto!important;
			margin-top: initial;
			margin-left: initial;
		}
		
		/* Alignment Classes */
		
		align-items: baseline;
		
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
		
		#MainMenuWrapper.mmDisabled
		{
			display: none;
			transition: 0.2s;
			animation: fadeIn 1.5s;
		}
		
		.mm_option.mmDisabled
		{
			user-select: none!important;
			pointer-events: none!important;
			filter: grayscale(0.5) brightness(0.75);
			opacity: 0.8;
		}
		</style>
	`;

	document.head.insertAdjacentHTML('beforeend', mmCss);
	el_wrapperDiv.classList.remove('mmDisabled');

	//Funções das opções
	function FNewGame(el){
		ToggleMainMenu();
		SceneManager.goto(Scene_Map);
	}
	
	function FContinueGame(el){
		if (DataManager.isAnySavefileExists()) {
			ToggleMainMenu();
			SceneManager.push(Scene_Load);
		}else{
			el.classList.add('mmDisabled');
		}
	}
	
	function FOptions(el){
		SceneManager.push(Scene_Options);
		ToggleMainMenu();
	}

	function ToggleMainMenu(){
		let el = document.querySelector('#MainMenuWrapper');
		
		if(el.classList.contains('mmDisabled'))
			el.classList.remove('mmDisabled');
		else
			el.classList.add('mmDisabled');
	}

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
	
	//Ao fechar o menu de opções (menu principal)
	const _Scene_Options_popScene = Scene_Options.prototype.popScene;
	
	Scene_Options.prototype.popScene = function() {
	  _Scene_Options_popScene.call(this); // Executa a ação padrão do fechamento do menu de opções
	  ToggleMainMenu();
	};
	
	/**/
	
    //If horizontal align
    Window_Command.prototype.itemTextAlign = function(){
        switch(oHorizontalPosition)
        {
            case 0:
                return 'left';
                break;
            case 2:
                return 'right';
                break;
           default:
                return 'center';
                break;
		}
    };
	
	//Listener do canvas
	setTimeout(function(){
		let gameCanvas = document.querySelector('#gameCanvas');
		let menuWrapper = document.querySelector('#MainMenuWrapper');

		function outputsize() {
			//Get all gameCanvas style properties
			let sizeOffset = '36'; //36px
			let canvasStyleCSS = gameCanvas.style.cssText;
			
			//Apply CSS to MainwenuWrapper from gameCanvasmenuWrapper and remove unnecessary properties
			menuWrapper.style.cssText = canvasStyleCSS;
			menuWrapper.style.removeProperty('position');
			menuWrapper.style.removeProperty('cursor');
			menuWrapper.style.removeProperty('z-index');
			
			//Apply the offset values to width and height got from gameCanvas CSS style
			let gameCanvas_W = menuWrapper.style.width;
			let gameCanvas_H = menuWrapper.style.height;

			//Remove attributes to avoid duplicated properties
			menuWrapper.style.removeProperty('width');
			menuWrapper.style.removeProperty('height');

			menuWrapper.style.setProperty('width', 'calc(' + gameCanvas_W + ' - ' + sizeOffset + 'px' + ')');
			menuWrapper.style.setProperty('height', 'calc(' + gameCanvas_H + ' - ' + sizeOffset + 'px' + ')');
		}
		
		outputsize();

		new ResizeObserver(outputsize).observe(gameCanvas);
	}, 350);
	
	/**/


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
    if(oUseTitleAsImage == 0)
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
            return "fonts/" + Utils.encodeURI(filename);
		}
        else
        {
            return wgpath + "fonts/" + oParams.CustomFont + ".ttf";
		}
    };

    
    /**/

    Scene_Title.prototype.UISprites= function(filename, xPos, yPos) {
        this._mPic = new Sprite();
        this._mPic.bitmap = ImageManager.loadSystem(wgpath + "img/" + filename);
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