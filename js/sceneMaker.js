define(["pixi.min","./character","./utils/util"],(PIXI,Character,util)=>{
	return function(game,resource) {
		const 	Container = PIXI.Container,
				view = game.app.view,
				Point = PIXI.Point,
				config=game.config
				stage=game.app.stage,
				Text=PIXI.Text;
		let scenes={};
		//game scene
			//add bg
		scenes.game=new Container();
		scenes.game.addChild(resource.background);
			//character
		scenes.game.character=new Character(
				new Point(view.width/2,view.height*2/3),
				1,
				view.height
			);
		resource.character=scenes.game.character;
		scenes.game.addChild(scenes.game.character.shape);
		let score=new Text(" 0000000000",
			{
				align:"left",
				fill:0xffffff,
				fontSize:25,
				dropShadow:true,
				dropShadowAlpha:0.75,
				dropShadowDistance:3,
				dropShadowBlur:1
			});
		scenes.game.scoreChange=(s)=>{
			let lz=10-s.toString().length;
			score.text=undefined;
			for(let i=lz;i>0;i--){
				score.text+="0";
			}
			score.text+=s;
			return score.text;
		}
		score.position.set(-2,5);
		resource.pausebtn.position.set(320,25);

		///OPPONENT
		scenes.game.opponent=new Container();
		for(x in resource.op){
			scenes.game.opponent.addChild(resource.op[x]);
			util.setAnchorCenter(resource.op[x]);
			resource.op[x].position.x=view.width/2;
			util.opReset(resource.op[x]);
		}
		let playArea=new Graphics();
		playArea.beginFill(0xff0000,1);
		playArea.position.set(48,0);
		playArea.drawRect(0,0,805,1920);
		playArea.endFill();
		playArea.scale.set(1/game.config.scaleDiv);
		scenes.game.opponent.mask=playArea;
		window.op=resource.op;
		//op fix here
		resource.op.op4.scale.set(0.34);
		resource.op.op3l.position.x=90;
		resource.op.op3r.position.x=270;
		//add opponent to game scene HERE
		scenes.game.addChild(scenes.game.opponent);
		//END OF OPPONENT

		scenes.game.addChild(resource.gameTopShade);
		scenes.game.addChild(resource.pausebtn);
		util.setToBtn(resource.pausebtn);
		util.setAnchorCenter(resource.pausebtn);
		scenes.game.addChild(score);
		resource.gameOverText.visible=false;
		scenes.game.addChild(resource.gameOverText);

			//scene method
		scenes.game.reset=()=>{
			scenes.game.character.reset();
		};

		//MENU SCENE
		let menu=new Container();
		scenes.menu=menu;
		//add item to container
			//menu bg
		menu.addChild(resource.menubg);
		resource.menubg.scale.set(1/config.scaleDiv);
			//bubbles
		resource.bubbles.forEach((bubble)=>{
			//console.log(bubble);
			menu.addChild(bubble);
			bubble.scale.set(1/config.scaleDiv);
			util.setAnchorCenter(bubble);
			bubble.vy=1;
			bubble.play=()=>{
				if((bubble.position.y-=(bubble.vy*bubble.scale.y))<(-bubble.height)){
					bubble.resetProp();
				}
			};
			bubble.resetProp=()=>{
				bubble.scale.set(Math.random()/2);
				bubble.vy=util.randBetween(7,15);
				bubble.position.set((Math.random()*game.app.view.width),game.app.view.height+bubble.height);
			};
			bubble.resetProp();
		});
		resource.bubbles.animate=()=>{
			resource.bubbles.forEach((bubble)=>{bubble.play();});
		};
			//clouds
		resource.clouds.forEach((x)=>{
			menu.addChild(x);
			x.scale.set(1/config.scaleDiv);
			util.setAnchorCenter(x);
			x.vx=1;
			x.play=()=>{
				if((x.position.x+=(x.vx*x.scale.x))>game.app.view.width+x.width){
					x.resetProp();
				}
			};
			x.resetProp=()=>{
				x.scale.set(Math.random()/2);
				x.vx=util.randBetween(4,10);
				x.position.set(-x.width/2,util.randBetween(x.height,game.app.view.height*0.25));
			};
			x.resetProp();

		});
		resource.clouds.animate=()=>{
			resource.clouds.forEach((x)=>{x.play();});
		};
			//logo
		menu.addChild(resource.logo);
		resource.logo.scale.set(1/config.scaleDiv);
		resource.logo.position.set(game.app.view.width/2,170);
			//playbtn
		menu.addChild(resource.playbtn);
		util.setToCenterView(resource.playbtn,game.app.view);
		resource.playbtn.position.y+=15;
		resource.playbtn.scale.set(1/config.scaleDiv);
		util.setToBtn(resource.playbtn);

			//scorebtn
		menu.addChild(resource.scorebtn);
		resource.scorebtn.scale.set(1/config.scaleDiv);
		resource.scorebtn.position.set(50,580);
		util.setToBtn(resource.scorebtn);
			//aboutbtn
		menu.addChild(resource.aboutbtn);
		resource.aboutbtn.scale.set(1/config.scaleDiv);
		resource.aboutbtn.position.set(310,580);
		resource.aboutbtn.tint=0x00A2FA;
		util.setToBtn(resource.aboutbtn);

			//MENU ABOUT
		util.setToCenterView(resource.aboutText,game.app.view);
		menu.addChild(resource.aboutText);
		resource.aboutText.visible=false;
			//MENU SCENE METHOD
		menu.animate=()=>{
			resource.bubbles.animate();
			resource.clouds.animate();
		};
		//INTRO
		let intro=new Container();
		scenes.intro=intro;
		intro.addChild(resource.introbg);
		intro.addChild(resource.introB);
		intro.addChild(resource.introA);
		intro

		//ADDING TO SCENES TO GAME AND SET ALL VISIBLE TO FALSE
		stage.addChild(scenes.game);
		scenes.game.visible=false;
		stage.addChild(scenes.menu);
		scenes.menu.visible=false;
		stage.addChild(scenes.intro);
		scenes.intro.visible=false;
		if(game.event.onSceneCreated)
			game.event.onSceneCreated(scenes,game);
		return scenes;
	}
});