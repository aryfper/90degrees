define(["pixi.min","Tween","./intro","./menu","./game","./input"],(pixi,TWEEN,Intro,Menu,Gameplay,Input)=>{
	return function(game,resource,scenes){
		const 	Tween=TWEEN.Tween,
				view = game.app.view,
				scaleDiv=game.config.scaleDiv;
		let state=undefined;
		//setup work///////////////////////////////////
		//input
		let input=new Input();
			//intro//
		let intro=new Intro(game,resource,scenes);
		intro.onComplete=()=>{state=menu.loop;menu.BtnIn();};
			//menu//
		let menu=new Menu(game,resource,scenes);
		menu.BtnOut();
		menu.startGame=()=>{
			gameplay.reset();
			state=gameplay.loop;
			gameplay.setInput(input);
		};
			//Game//
		let gameplay=new Gameplay(game,resource,scenes);
		gameplay.backtomenu=()=>{
			input.resetHandler();
			t=new Tween(scenes.menu);
			t.to({alpha:1},1000).onComplete(()=>{
				gameplay.reset();
				state=menu.loop;
				menu.BtnIn();
				scenes.game.visible=false;
			}).onStart(()=>{
				scenes.menu.visible=true;
			}).start();
		};
		//end of setup/////////////////////////////////
		intro.play();
		//this is mu holi buk, human should never change this
		function loop(x){
			state?state():null;
			TWEEN.update();
		}
		//game.app.ticker.add((x)=>{TWEEN.update();});
		game.app.ticker.add(loop);
		//MU HULI BUK!!!///////////////////////////////
	};
});