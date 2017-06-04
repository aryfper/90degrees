requirejs.config({
	baseUrl: 'js/lib',
	paths:{
		utils:'../utils',
		jquery:'jquery-3.2.1.min'
	}
});

let game,resource,scenes;

require(["../gameinit","../resourceMaker","../sceneMaker","../gameloop"],(Game,resourceMaker,sceneMaker,gameloop)=>{
	game=new Game(oninit,onSetup,onSceneCreated);
	
	function oninit(game) {
		// body...
		console.log("Init DONE");
		resourceMaker(game);
	}

	function onSetup(res,ga) {
		// body...
		resource=res;
		scenes=sceneMaker(ga,resource);
	}

	function onSceneCreated(sc,ga) {
		// body...
		scenes=sc;
		game.app.ticker.add(updateFPS);
		gameloop(game,resource,scenes);
	}
	let lastTime=0;
	function updateFPS(){
		if(game.app.ticker.lastTime-lastTime>1000)
		{
			document.getElementById("fps").innerHTML=game.app.ticker.FPS;
			lastTime=game.app.ticker.lastTime;
		}
	}
});
