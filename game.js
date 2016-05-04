//metrics
var quintusContainer = {width: 920, height: 685};
var lifeContainer = {y: 10, height: 40, marginBotton: 15, leftPadding:8, rightPadding: 8, upPadding: 15, downPadding: 15};
var tile = {width: 90, height: 90, margin: 25}; //the asset width and height
var pipeline = {wide: 28};

//colors
var firstColor  = "#ff7473";
var secondColor = "#ffc952";
var thirdColor  = "#34314c";
var forthColor  = "#47b8e0";
var grayColor   = "#EDECEC";

//data
var labelsTiles = [
					["Chegada\nda Família\nReal",
					"Criação da\nSecreataria\nNacional\nde Visa",
					"Criação do\nLabor. Cent. de\nCont. de\nDrogas e\nMedicamentos",
					"Promul-\ngação do\nCódigo de\nPosturas"],

					["Criação da\nInspetoria\nde Saúde\nPública do\nRJ",
					"Criação da\nANVISA",
					"Regulment-\ntação do\nCódgio\nNacional da\nSaúde",
					"Edição do\nDecreto-Lei\nn° 986/69"],

					["Promul-\ngação do\nCódigo de\nPosturas",
					"Criação do\nMinistério\nda Saúde",
					"Criação do\nLabor. Cent. de\nCont. de\nDrogas e\nMedicamentos",
					"Criação da\nSecretaria\nNacional de\nVISA"],

					["Realização\ndo primeiro\nCONAVISA",
					"Criação da\nSecretaria\nNacional de\nVISA",
					"Criação do\nINCOS",
					"Edição de\nLei n°\n6.467/77"]
				];
var wrongChoiceFeedback = "Apesar de ele ser um marco na história da vigilância sanitária, existem outros acontecimentos anteriores a este. Tente outro caminho. Caso prefira, revise no seu material didático o caminho mais correto.";
var rightPath 	= [	{row: 0, col: 0, feedback: ""},
					{row: 1, col: 0, feedback: "A criação da Inspetoria de Saúde Pública do Porto do Rio de Janeiro em 1820 foi um marco importante para a história da vigilância sanitária.\n\nContribuiu para o estabelecimento de normas para organizar a vida nas cidades, cujas práticas se espelharam no modelo europeu da polícia médica. Assim, passaram a ser objeto de regulamentação médica os vários aspectos da vida urbana da época, tais como: o isolamento de doentes portadores de moléstias “pestilenciais”, os cemitérios, gêneros alimentícios, açougues, matadouros, casas de saúde, medicamentos, entre outros."},
					{row: 2, col: 0, feedback: "A Câmara Municipal do Rio de Janeiro, em 1832, promulgou o Código de Posturas que estabelecia dentre outras normas, a prática da licença no controle das fábricas.\n\nDentre a promulgação de leis, estruturação e reformas de serviços sanitários e reorganização da estrutura do Estado, a intervenção sanitária veio sendo institucionalizada no país. Do período monárquico, passando pela transição para a República e acompanhando a instauração da nova ordem política, econômica e social no país, foi se conformando no interior da área da Saúde Pública, mas apartado de suas outras ações, um subsetor específico que hoje denominamos vigilância sanitária. A organização das ações desse subsetor amparou-se no “poder de polícia”, cuja face mais visível é a fiscalização e a aplicação de penalidades (BRASIL, 2011)."},
					{row: 2, col: 1, feedback: "A criação do Ministério da Saúde em 1953, a publicação da Lei 1.944/53 que tornou obrigatória a iodação do sal de cozinha com a finalidade de controlar o bócio endêmico, constituindo-se em uma das mais importantes iniciativas na área de alimentos com fins de controlar uma doença."},
					{row: 2, col: 2, feedback: "O Laboratório Central de Controle de Drogas e Medicamentos (LCCDM) foi criado em 1954 e se destacou como marco para criação da ANVISA."},
					{row: 1, col: 2, feedback: "A regulamentação do Código Nacional de Saúde, em 1961, atribuiu ao Ministério da Saúde a atuação na regulação de alimentos, estabelecimentos industriais e comerciais."},
					{row: 1, col: 3, feedback: "No final dos anos 60 o Decreto-Lei nº 986/69 estabeleceu as normas básicas para alimentos, recebendo influência do Codex Alimentarius internacional (Brasil, 2011)."},
					{row: 2, col: 3, feedback: "Em 1976, com a reestruturação do Ministério da Saúde, foi criada a Secretaria Nacional de Vigilância Sanitária, a partir da junção do Serviço Nacional de Fiscalização da Medicina e Farmácia e do Serviço de Saúde dos Portos. Segundo o Decreto n.º 79.056, de 30 de dezembro de 1976, em seu art.13º, caberia à nova secretaria “promover ou elaborar, controlar a aplicação e fiscalizar o cumprimento de normas e padrões de interesse sanitário relativos a portos, aeroportos, fronteiras, produtos médico-farmacêuticos, bebidas, alimentos e outros produtos ou bens, respeitadas as legislações pertinentes, bem como efetuar o controle sanitário das condições do exercício profissional relacionado com a saúde”. Sua estrutura denotava maior ênfase nas ações de controle da qualidade dos produtos de interesse da saúde: alimentos, cosméticos, saneantes domissanitários e medicamentos."},
					{row: 3, col:3, feedback: "A década de 70 foi marcada por importante revisão da legislação sanitária, com destaque para as Leis nº 5.991/73, nº 6.360/76, nº 6.368/76 (revogada pela Lei nº 11.343/2006), voltadas para a área de medicamentos, e a Lei nº 6.437/77, que estabelece o fluxo do processo administrativo-sanitário e configura as infrações sanitárias e as penalidades. Vale lembrar que este conjunto de leis, embora com algumas alterações, está em vigência até hoje (COSTA; ROZENFELD, 2000)."}
				];

//utils
var lastRow = labelsTiles.length-1;
var lastCol = labelsTiles[lastRow].length-1;

//state
var numberLives = 5;

//constants
var TILES_STATES = {
	LAST_CORRECT : 0,
	CORRECT : 1,
	POSSIBLE_ANSWER : 2,
	FADED: 3
};
var LAST_CORRECT_WILL_CHANGE_EVENT = "last_correct_will_change";

window.onload = function(){

	var Q = Quintus({development:true})
				.include("Sprites, Scenes, Touch, 2D, UI")
				.setup({
						width:  quintusContainer.width  ,
						height: quintusContainer.height,
						scaleToFit: true
					})
				.touch();

	//Extensions
	Tile = Q.UI.Button.extend('TileButton',{
		init: function(p, callback) {
			p.asset = "tilebg1.png";
			p.state = TILES_STATES.FADED;
			this._super(p,callback);
		},
		setState: function(state){
			this.p.state = state;
			this.callback = null;
			switch (state) {
		    	case TILES_STATES.CORRECT:
		    		this.p.asset = "tilebg4.png";
		    		break;
		    	case TILES_STATES.LAST_CORRECT:
		    		this.p.asset = "tilebg2.png";
		    		break;
		    	case TILES_STATES.POSSIBLE_ANSWER:
		    		this.p.asset = "tilebg3.png";
		    		break;
		    	default:
		    		this.p.asset = "tilebg1.png";
		    }
		}
	});

	TileLabel = Q.UI.Text.extend('TileLabel',{
		init: function(p) {
			p.weight=200;
			p.size=12;
			p.align="center";
			this._super(p);
		}
	});

	PipeLine = Q.UI.Container.extend('PipeLine',{
		init: function(p,defaults, defaultProps) {
			this._super(p,defaults, defaultProps);
			this.p.fill =  thirdColor;
		    this.p.radius =  0;
		    this.p.cx = 0;
		    this.p.cy = 0;
		}
	});

	Q.Sprite.extend("Heart", {
	  init: function(p) {
	  	p.asset = p.asset? p.asset: "full_heart.png";
	    this._super(p);
	  }
	});

	//Load assets
	Q.load(["tilebg1.png","tilebg2.png","tilebg3.png","tilebg4.png","empty_heart.png","full_heart.png"],function(){
		Q.stageScene("level1");
	});

	//Scene level1
	Q.scene("level1",function(stage){
		Q.state.reset({"score":0, "lives": 5});

		//setup UI
		setUpLives(stage);
		setUpBoard(stage);

		//Listen to event
		stage.on(LAST_CORRECT_WILL_CHANGE_EVENT, function(location){

			score = Q.state.get("score");
			//The user's click triggered the event
			if(score>0){
				showRightChoiceModal(rightPath[score].feedback);
			}

			var previousLastCorrect = Q.state.get("last_correct");
			if(previousLastCorrect) {
				var previousLocation = {row:previousLastCorrect.row,col:previousLastCorrect.col};
				updateLastCorrect(previousLocation,true,stage);
				updatePipelineRightPath(previousLocation, location);
			}
			updateLastCorrect(location, false, stage);

		});

		stage.trigger(LAST_CORRECT_WILL_CHANGE_EVENT,{row: 0, col: 0});

		var index = findIndex(0,0);
		var firstTile = Q("TileButton").at(index);
	});

	/** Updates last correct tile and the tiles around it
	*	isNew: used to define if it's the current "last correct" or the previous one
	*/
	function updateLastCorrect(location, isPreviousLocation, stage){
		var index = findIndex(location.row,location.col);
		var lastCorrect = Q("TileButton").at(index);

		if (isPreviousLocation){
			changeOptionsFor(location, true);
			lastCorrect.setState(TILES_STATES.CORRECT);
		}else{
			//if it's last tile, end of game
			if(location.row == lastRow && location.col == lastCol){
				lastCorrect.setState(TILES_STATES.CORRECT);
			}else{
				lastCorrect.setState(TILES_STATES.LAST_CORRECT);
				Q.state.set("last_correct",location);
				changeOptionsFor(location);
			}
		}
	}

	/** Update the pipeline between two tiles to indicate as correct path
	*/
	function updatePipelineRightPath(previousLastCorrect, currentLastCorrect){
		var pipeline;
		if(currentLastCorrect.row >= previousLastCorrect.row){
		  	pipeline = findPipelineBetween(previousLastCorrect,currentLastCorrect);
		}else{
			pipeline = findPipelineBetween(currentLastCorrect,previousLastCorrect);
		}
		pipeline.p.fill = "#47b8e0";
	}

	/** Find tiles around the tile in location and change their state based on their current state and the fade parameter
	*/
	function changeOptionsFor(location, fade){
		var possibilities = [ Q("TileButton").at(findIndex(location.row-1,location.col)),
							  Q("TileButton").at(findIndex(location.row+1,location.col)),
							  Q("TileButton").at(findIndex(location.row,location.col-1)),
							  Q("TileButton").at(findIndex(location.row,location.col+1)) ];

		for (var i = 0; i < possibilities.length; i++) {
			var possibility = possibilities[i];

			if(possibility){
				//Show is option if it's faded and fade is false
				if(possibility.p.state == TILES_STATES.FADED && !fade){
					possibility.setState(TILES_STATES.POSSIBLE_ANSWER);
					possibility.callback = callbackForOption;
				}
				//if it's POSSIBLE_ANSWER and not a CORRECT state and fade is true, fade it
				if(possibility.p.state == TILES_STATES.POSSIBLE_ANSWER && fade){
					possibility.setState(TILES_STATES.FADED);
					possibility.callback = null;
				}
			}
		}
	}

	function callbackForOption() {
		var score = Q.state.get("score");
		var isCorrectOption = rightPath[score+1].row == this.p.row && rightPath[score+1].col == this.p.col;

		if(isCorrectOption){
			Q.state.inc("score",1);
			this.stage.trigger(LAST_CORRECT_WILL_CHANGE_EVENT,{row: this.p.row, col: this.p.col});
		}else{
			Q.state.dec("lives",1);
			showWrongChoiceModal();
			this.setState(TILES_STATES.FADED);
		}
	}

	/** Find the right index to be used in Q("TileButton").at(index)
	*/
	function findIndex(row, col){
		if(row < 0 || col < 0 || row > lastRow || col>lastCol){
			return -1;
		}

		var index = row*labelsTiles.length + (col);
		return index;
	}

	/** Find the right pipeline using the "before" and "after" properties of a pipeline
	*/
	function findPipelineBetween(tile1, tile2){
		var pipelines =  Q("PipeLine").items;
		for (var i = 0; i < pipelines.length; i++) {
			var pipeline = pipelines[i];
			if (pipeline.p.before.row == tile1.row && pipeline.p.before.col == tile1.col &&
				pipeline.p.after.row == tile2.row && pipeline.p.after.col == tile2.col ){
				return pipeline;
			}
		}
	}

	function setUpLives(stage){
		var labelRightMargin = 12;
		var heartMargin = 5;
		var heartWidth = 21;
		var heartHeight = 18;

		var triesLabel = new Q.UI.Text({
	      label: "Tentativas:",
	      color: firstColor,
	      size: 16
	    });

		var lifeContainerWidth = lifeContainer.leftPadding+triesLabel.p.w+labelRightMargin+(numberLives-1)*(heartWidth+heartMargin+lifeContainer.rightPadding);
		var lifeContainerHeight = lifeContainer.upPadding+triesLabel.p.h+lifeContainer.downPadding;

		var container = stage.insert(new Q.UI.Container({
			      border: 2,
			      stroke: "red",
			      fill: "white",
			      y: lifeContainer.y+lifeContainerHeight/2,
			      x: (Q.width/2),
			      h: lifeContainerHeight,
			      w: lifeContainerWidth
		   		}));

	   	triesLabel.p.x = container.p.x - container.p.w/2 + triesLabel.p.w/2 + lifeContainer.leftPadding;
	   	triesLabel.p.y = container.p.y;
	    stage.insert(triesLabel);

	    for (var i = 0; i < numberLives; i++) {
	    	var x = lifeContainer.leftPadding+triesLabel.p.x+triesLabel.p.w/2+labelRightMargin+((heartWidth+heartMargin)*i);
	    	stage.insert(new Q.Heart({x: x , y: container.p.y}));
	    }

	    Q.state.on("change.lives",function (lives){
	    	var heart = Q("Heart").at(lives);
	    	heart.p.asset = "empty_heart.png";
	    	if(lives==0){
	    		console.log("Game Over");
	    	}

	    });
	}

	function setUpBoard(stage){

		var boardWidth = (labelsTiles.length * tile.width) + ((labelsTiles.length+1) * tile.margin);
		var boardHeight = (labelsTiles.length * tile.height) + ((labelsTiles.length+1) * tile.margin);
		var boardX = (Q.width/2)-(boardWidth/2);

		var board = stage.insert(new Q.UI.Container({
			      fill: grayColor,
			      x: boardX > 0 ? boardX : tile.margin,
			      y: lifeContainer.y+lifeContainer.height+lifeContainer.marginBotton,
			      h: boardHeight,
			      w: boardWidth,
			      cx:0,
			      cy:0
		   		}));

		var firstTile = {x:board.p.x+tile.margin, y: board.p.y+tile.margin};

		for (var row = 0; row < labelsTiles.length; row++) {
			for (var col = 0; col < labelsTiles[row].length; col++) {
			   var tileX = firstTile.x+((tile.width+tile.margin)*col);
			   var tileY = firstTile.y+((tile.height+tile.margin)*row);


			   var tileButton = new Tile({x: tileX+tile.width/2, y: tileY+tile.height/2, row: row, col: col});

			   var label = new TileLabel({x: tileButton.p.w/2-(tile.width/2),
			   							y: tileButton.p.h/2-(tile.height/2),
			   							label: labelsTiles[row][col]});

			   stage.insert(tileButton);
			   stage.insert(label,tileButton);

			   //horizontal pipeline
			   if(col<labelsTiles[row].length-1){
				   var pipeLineX  = board.p.x+tile.margin+tile.width+((tile.width+tile.margin)*col);
				   var pipeLineY = board.p.y+tile.margin+tile.height/2-pipeline.wide/2+((tile.height+pipeline.wide)*row);

				   stage.insert(new PipeLine({
										      x: pipeLineX,
										      y: pipeLineY,
										      h: pipeline.wide,
										      w: tile.margin,
										      before: {row:row, col:col},
										      after: {row:row,col:col+1}

				   				}));
			   }
			   //vertical pipeline
			   if(row<labelsTiles.length-1){
			   		var verticalPipeLineX  = board.p.x+tile.margin+tile.width/2-pipeline.wide/2+((tile.width/2+tile.margin+tile.width/2)*col);
			   		var verticalPipeLineY  = board.p.y+tile.margin+tile.height+((tile.height+tile.margin)*row);
			   		stage.insert(new PipeLine({
										      x: verticalPipeLineX,
										      y: verticalPipeLineY,
										      h: tile.margin,
										      w: pipeline.wide,
										      before: {row: row, col: col},
										      after: {row:row+1, col:col}
				   				}));
			   }
			}
		}
	}

	function showWrongChoiceModal(){
		showModal(wrongChoiceFeedback);
	}

	function showRightChoiceModal(feedback){
		showModal(feedback);
	}

	function showModal(feedback){
		var customModal = 	 $('<div class="custom-modal modal fade">'+
		    				 	'<div class="modal-dialog">'+
		    				 		'<div class="modal-content">' +
						    			'<div class="modal-header">'+
						    				'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
						    				'<h4 class="modal-title">Feedback</h4>'+
						    			'</div>' +
						    			'<div class="modal-body">'+
						    				'<p>' + feedback + '</p>'+
						    			'</div>' +
						    			'<div class="modal-footer">' +
						    				'<button type="button" class="btn btn-customized" data-dismiss="modal">Ok</button>' +
						    			'</div>'+
						    		'</div>'+
						    	'</div>'+
						      '</div>');

	    $('body').append(customModal);
	    $('.custom-modal').modal();

	    $('.custom-modal').on('hidden.bs.modal', function(){
	        $('.custom-modal').remove();
	    });
	}


};
