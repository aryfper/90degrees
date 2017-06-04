define(["pixi.min","./utils/util"],(PIXI,util)=>{
	return function(game,cb/*argv: resource,gameobj*/){
		const 	loader=game.app.loader,
				config=game.config,
				onSetup=cb?cb:game.event.onSetup,
				Text=PIXI.Text;

		let resource={};

		loader
			//game
			.add("centerline","assets/center_lin.png")
			.add("garis-pembatas","assets/garis_v.png")
			.add("marker","assets/mark.png")
			.add("pausebtn","assets/pause.png")
			.add("topshade","assets/topshade.png")
			//menu
			.add("menubg","assets/home.png")
			.add("bubbles","assets/buble.png")
			.add("cloud","assets/cloud.png")
			.add("logo","assets/logo.png")
			.add("playbtn","assets/play-button.png")
			.add("scorebtn","assets/trophy.png")
			.add("aboutbtn","assets/about-xxl.png")
				//Opponent
			.add("op1","assets/op/op1.png")
			.add("op2","assets/op/op2.png")
			.add("op3l","assets/op/op3-l.png")
			.add("op3r","assets/op/op3-r.png")
			.add("op4","assets/op/op4.png")
			.add("op5","assets/op/op5.png")
			//intro
			.add("introA","assets/introA.png")
			.add("introB","assets/introB.png");
		loader.load(setup);

		function setup(l,res){
			const 	TilingSprite=PIXI.extras.TilingSprite,
					view=game.app.view,
					stage=game.app.stage,
					ticker=game.app.ticker,
					Graphics=PIXI.Graphics,
					Sprite=PIXI.Sprite,
					Container=PIXI.Container,
					renderer=game.app.renderer;
/////////////////////////////////////////////////////////////////////////////////////
			/*
				BAGIAN GAME
			*/
			//center line
			let centerline=new TilingSprite(
									res["centerline"].texture,
									res.centerline.texture.width/config.scaleDiv,
									view.height
							);
			centerline.tileScale.set(1/config.scaleDiv);
			util.setAnchorCenter(centerline);
			util.setToCenterView(centerline,view);
			//resource.centerline=centerline;
			//batas
			let pembatas={};
			pembatas.kanan=new Sprite(res["garis-pembatas"].texture);
			pembatas.kanan.scale.set(1/config.scaleDiv);
			pembatas.kanan.position.x=315;
			pembatas.kiri=new Sprite(res["garis-pembatas"].texture);
			pembatas.kiri.scale.set(1/config.scaleDiv);
			pembatas.kiri.position.x=25;
			//resource.pembatas=pembatas;
			//marka
			let marka={};
			marka.kanan=new TilingSprite(
										res["marker"].texture,
										res["marker"].texture.width/config.scaleDiv,
										view.height
										);
			marka.kanan.scale.x*=-1;
			marka.kanan.tileScale.set(1/config.scaleDiv);
			marka.kanan.position.x=360;
			marka.kanan.tilePosition.y+=200;
			marka.kiri=new TilingSprite(
										res["marker"].texture,
										res["marker"].texture.width/config.scaleDiv,
										view.height
										);
			marka.kiri.tileScale.set(1/config.scaleDiv);
			marka.kiri.tilePosition.y+=80;
			//game white bg
			let gameBg=new Graphics();
			gameBg.beginFill(0xffffff,1);
			gameBg.drawRect(0,0,game.app.view.width,game.app.view.height);
			gameBg.endFill();
			//resource.marka=marka;
			let bgcon=new Container();
			bgcon.cacheAsBitmap=true;
			bgcon.addChild(gameBg);
			bgcon.addChild(centerline);
			bgcon.addChild(marka.kiri);
			bgcon.addChild(marka.kanan);
			bgcon.addChild(pembatas.kiri);
			bgcon.addChild(pembatas.kanan);
			let bg=renderer.generateTexture(bgcon,PIXI.SCALE_MODES.LINEAR);
			//console.log(bg);
			resource.background=new TilingSprite(
									bg,
									bg.width,
									bg.height
							);
			bgcon.destroy({children:true});
			resource.gameTopShade=new Sprite(res["topshade"].texture);
			util.scaleWithDiv(resource.gameTopShade,config.scaleDiv);
			resource.pausebtn=new Sprite(res["pausebtn"].texture);
			util.scaleWithDiv(resource.pausebtn,config.scaleDiv);
			//oponent
			resource.op={};
			resource.op.op1=new Sprite(res["op1"].texture);
			util.scaleWithDiv(resource.op.op1,config.scaleDiv);
			resource.op.op2=new Sprite(res["op2"].texture);
			util.scaleWithDiv(resource.op.op2,config.scaleDiv);
			resource.op.op3l=new Sprite(res["op3l"].texture);
			util.scaleWithDiv(resource.op.op3l,config.scaleDiv);
			resource.op.op3r=new Sprite(res["op3r"].texture);
			util.scaleWithDiv(resource.op.op3r,config.scaleDiv);
			resource.op.op4=new Sprite(res["op4"].texture);
			util.scaleWithDiv(resource.op.op4,config.scaleDiv);
			resource.op.op5=new Sprite(res["op5"].texture);
			util.scaleWithDiv(resource.op.op5,config.scaleDiv);

			resource.gameOverText=new Text("Game Over!",
			{
				align:"center",
				fill:0xffffff,
				fontSize:40,
				dropShadow:true,
				dropShadowAlpha:0.75,
				dropShadowDistance:3,
				dropShadowBlur:1
			});
			util.setAnchorCenter(resource.gameOverText);
			util.setToCenterView(resource.gameOverText,view);
			

///////////////////////////////////////////////////////////////////////////////////
			/*
				BAGIAN MENU

			.add("menubg","assets/home.png")
			.add("bubbles","assets/buble.png")
			.add("cloud","assets/cloud.png")
			.add("logo","assets/rocket.png")
			.add("playbtn","assets/play-button.png")
			.add("scorebtn","assets/trophy.png")
			.add("aboutbtn","assets/about-xxl.png");

			*/
			resource.menubg=new Sprite(res["menubg"].texture);
			util.scaleWithDiv(resource.menubg,config.scaleDiv);
			resource.bubbles=[undefined,undefined,undefined,undefined];
			for (var i = 0; i < 4; i++) {
				resource.bubbles[i]=new Sprite(res["bubbles"].texture);
				util.scaleWithDiv(resource.bubbles[i],config.scaleDiv);
				util.setAnchorCenter(resource.bubbles[i]);
			}
			resource.clouds=[undefined,undefined,undefined];
			for (var i = 0; i < 4; i++) {
				resource.clouds[i]=new Sprite(res["cloud"].texture);
				util.scaleWithDiv(resource.clouds[i],config.scaleDiv);
				util.setAnchorCenter(resource.clouds[i]);
			}
			resource.logo=new Sprite(res["logo"].texture);
			util.scaleWithDiv(resource.logo,config.scaleDiv);
			util.setAnchorCenter(resource.logo);
			resource.playbtn=new Sprite(res["playbtn"].texture);
			//util.scaleWithDiv(resource.playbtn,config.scaleDiv);
			util.setAnchorCenter(resource.playbtn);
			resource.scorebtn=new Sprite(res["scorebtn"].texture);
			util.scaleWithDiv(resource.scorebtn,config.scaleDiv);
			util.setAnchorCenter(resource.scorebtn);
			resource.aboutbtn=new Sprite(res["aboutbtn"].texture);
			util.scaleWithDiv(resource.aboutbtn,config.scaleDiv);
			util.setAnchorCenter(resource.aboutbtn);
			//menu about
			resource.aboutText=new Text(
				"90 Degree\n\nBy:\nBayu Setiawan\nArif Permadi\nAldhi Marwanto\nRedha Safara\n\nCredits:\npixijs\nrequirejs\ntweenjs\njquery",
				{
					fill:0xffffff,
					align:"center",
					fontSize:40,
					dropShadow:true,
					dropShadowAlpha:0.75,
					dropShadowDistance:3,
					dropShadowBlur:1
				}
			);
			util.setAnchorCenter(resource.aboutText);
///////////////////////////////////////////////////////////////////////////////////////
			//BAGIAN INTRO
			resource.introbg=new Graphics();
			resource.introbg.beginFill(0x000000,1);
			resource.introbg.drawRect(0,0,game.app.view.width,game.app.view.height);
			resource.introbg.endFill();
			resource.introA=new Sprite(res["introA"].texture);
			util.scaleWithDiv(resource.introA,config.scaleDiv);
			resource.introB=new Sprite(res["introB"].texture);
			util.scaleWithDiv(resource.introB,config.scaleDiv);
			if(onSetup){
				onSetup(resource,game);
			}
		}
	}
});