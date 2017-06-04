define(["pixi.min","Tween","./utils/util","./opponent"],(pixi,TWEEN,util,OpponentProc)=>{
	return function(game,resource,scene){
		const 	Tween=TWEEN.Tween,
				view = game.app.view,
				scaleDiv=game.config.scaleDiv,
				character=scene.game.character,
				gameScene=scene.game,
				filters=PIXI.filters,
				Container=PIXI.Container,
				Text=PIXI.Text;
		let gameplay={};
		let scrollspeed;
		let scorenow;
		let a=1.0005;
		let paused;
		let gameover;
		let oppProc=new OpponentProc(game,resource,scene);
		window.opproc=oppProc;
		gameplay.reset=()=>{
			gameScene.reset();
			let t=new Tween();
			scrollspeed=1;
			scorenow=0;
			gameScene.scoreChange(Math.floor(scorenow));
			paused=false;
			blurfilter.enabled=paused;
			pausedScreen.visible=paused;
			blurfilter.enabled=paused;
			gameover=false;
			resource.gameOverText.visible=false;
			oppProc.reset();
		};
		//window.resetGame=gameplay.reset;
		//let hitTester=new HitTester(game,resource,scene);
		gameplay.loop=()=>{
			if(!gameover){
				if(!paused){
					//hit test here
					if(oppProc.hitTest(character.head)){
						gameover=true;
						resource.gameOverText.visible=true;
					}
					//end of hit test
					oppProc.run(scrollspeed);
					character.setV(scrollspeed);
					character.run();
					resource.background.tilePosition.y+=scrollspeed;
					scorenow+=scrollspeed;
					gameScene.scoreChange(Math.floor(scorenow));
					if(scrollspeed<11){
						scrollspeed*=a;
					}
				}
			}
		};
		////PAUSE BTN
		let pauseH,pauseL;
		pauseH=(new Tween(resource.pausebtn.scale)).to({x:1/scaleDiv*1.2,y:1/scaleDiv*1.2},250).easing(TWEEN.Easing.Exponential.Out);
		pauseL=(new Tween(resource.pausebtn.scale)).to({x:1/scaleDiv,y:1/scaleDiv},250).easing(TWEEN.Easing.Exponential.Out);
		resource.pausebtn.onHover=()=>{
			pauseH.start();
		};
		resource.pausebtn.onLeave=()=>{
			pauseL.start();
		};
		let blurfilter=new filters.BlurYFilter(5);
		blurfilter.enabled=false;
		//window.bf=blurfilter;
		character.shape.filters=[blurfilter];
		resource.background.filters=[blurfilter];
		resource.gameTopShade=[blurfilter];
		gameScene.opponent.filters=[blurfilter];
		let bi=(new Tween(blurfilter)).to({blur:8},500).onStart(()=>{blurfilter.blur=0;blurfilter.enabled=true;bo.stop();});
		let bo=(new Tween(blurfilter)).to({blur:0},500).onStart(()=>{blurfilter.blur=8;bi.stop();}).onComplete(()=>{blurfilter.enabled=false;});
		//pause screen
		let pausedScreen=new Container();
		let pauseText=new Text("Paused!",{
			align:"center",
			fontSize:40,
			fontStyle:"bold",
			dropShadow:true,
			dropShadowAlpha:0.75,
			dropShadowDistance:3,
			dropShadowBlur:1,
			fill:0xffffff
		});
		let pauseResume=new Text("Resume",{
			align:"center",
			dropShadow:true,
			dropShadowAlpha:0.75,
			dropShadowDistance:3,
			dropShadowBlur:1,
			fill:0xffffff
		});
		let pauseToMenu=new Text("Back",{
			align:"center",
			dropShadow:true,
			dropShadowAlpha:0.75,
			dropShadowDistance:3,
			dropShadowBlur:1,
			fill:0xffffff
		});
		util.setAnchorCenter(pauseText);
		util.setAnchorCenter(pauseResume);
		util.setAnchorCenter(pauseToMenu);
		pauseText.position.y=(-40);
		pauseToMenu.position.y=40;
		pausedScreen.addChild(pauseText);
		pausedScreen.addChild(pauseResume);
		pausedScreen.addChild(pauseToMenu);
		gameScene.addChild(pausedScreen);
		util.setToCenterView(pausedScreen,view);
		//set to btn
		util.setToBtn(pauseResume);
		util.setToBtn(pauseToMenu);
		pauseResume.onHover=()=>{
			pauseResume.tint=0xff0000;
		};
		pauseResume.onLeave=()=>{
			pauseResume.tint=0xffffff;
		};
		pauseResume.onClick=()=>{
			resource.pausebtn.onClick();
		};
		pauseToMenu.onHover=()=>{
			pauseToMenu.tint=0xff0000;
		};
		pauseToMenu.onLeave=()=>{
			pauseToMenu.tint=0xffffff;
		};
		gameplay.backtomenu=undefined;
		pauseToMenu.onClick=()=>{
			gameplay.backtomenu();
		};

		pausedScreen.visible=false;
		//indow.ps=pausedScreen;
		//let pauseTweenIn=new Tween(pausedScreen);
		resource.pausebtn.onClick=()=>{
			if(paused){
				paused=false;
				bo.start();
			}else{
				paused=true;
				bi.start();
			}
			pausedScreen.visible=paused;
			blurfilter.enabled=paused;
		};

		gameplay.setInput=(i)=>{
			i.resetHandler();
			i.onKeyDown((e)=>{
				console.log(e);
				if(!gameover)
				{
					switch(e.keyCode){
						case 13:
						character.turnNinty();
						break;
						case 32:
						character.turnNinty();
						break;
						case 49:
						resource.pausebtn.onClick();
						break;
					}
				}else{
					gameplay.backtomenu();
				}
			});
			i.onMouseDown(()=>{
				if(!gameover){
					if(!paused){
						character.turnNinty();
					}
				}
				else{
					gameplay.backtomenu();
				}
			});
		}

		return gameplay;
	}
});