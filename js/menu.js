define(["pixi.min","Tween"],(pixi,TWEEN)=>{

	return function(game,resource,scene){
		const 	Tween=TWEEN.Tween,
				view = game.app.view,
				scaleDiv=game.config.scaleDiv;

		let menu={};
		menu.loop=()=>{scene.menu.animate();};
		//tween (hover,leave)
		let playH,playL,playC,aboutH,aboutL,about,C,scoreH,scoreL,scoreC;
		playH=(new Tween(resource.playbtn.scale)).to({x:1/scaleDiv*1.2,y:1/scaleDiv*1.2},250).easing(TWEEN.Easing.Exponential.Out);
		playL=(new Tween(resource.playbtn.scale)).to({x:1/scaleDiv,y:1/scaleDiv},250).easing(TWEEN.Easing.Exponential.Out);

		aboutH=(new Tween(resource.aboutbtn.scale)).to({x:1/scaleDiv*1.2,y:1/scaleDiv*1.2},250).easing(TWEEN.Easing.Exponential.Out);
		aboutL=(new Tween(resource.aboutbtn.scale)).to({x:1/scaleDiv,y:1/scaleDiv},250).easing(TWEEN.Easing.Exponential.Out);

		scoreH=(new Tween(resource.scorebtn.scale)).to({x:1/scaleDiv*1.2,y:1/scaleDiv*1.2},250).easing(TWEEN.Easing.Exponential.Out);
		scoreL=(new Tween(resource.scorebtn.scale)).to({x:1/scaleDiv,y:1/scaleDiv},250).easing(TWEEN.Easing.Exponential.Out);
		
		//menu in tween
		let menuIn=(()=>{
			let logoIn=new Tween(resource.logo.position);
			logoIn.to({y:170},1000).easing(TWEEN.Easing.Elastic.Out).onStart(()=>{resource.logo.position.y=-resource.logo.height;});
			let aboutIn=new Tween(resource.aboutbtn.position);
			aboutIn.to({x:310},1000).easing(TWEEN.Easing.Elastic.Out).onStart(()=>{resource.aboutbtn.position.x=view.width+resource.aboutbtn.width;});
			let scoreIn=new Tween(resource.scorebtn.position);
			scoreIn.to({x:50},1000).easing(TWEEN.Easing.Elastic.Out).onStart(()=>{resource.scorebtn.position.x=-resource.scorebtn.width});
			let playIn=new Tween(resource.playbtn.scale);
			playIn.to({x:1/scaleDiv,y:1/scaleDiv},1000).easing(TWEEN.Easing.Elastic.Out).onStart(()=>{resource.playbtn.scale.set(0);resource.playbtn.visible=true;}).delay(800);
			let menuIn=new Tween();
			menuIn.onStart(()=>{logoIn.start();aboutIn.start();scoreIn.start();playIn.start();});
			return menuIn;
		})();
		//menu out tween
		let menuOut=(()=>{
			let logoOut=new Tween(resource.logo.position);
			logoOut.to({y:-resource.logo.height},1000).easing(TWEEN.Easing.Elastic.In).onStart(()=>{resource.logo.position.set(game.app.view.width/2,170);});
			let aboutOut=new Tween(resource.aboutbtn.position);
			aboutOut.to({x:view.width+resource.aboutbtn.width},1000).easing(TWEEN.Easing.Elastic.In).onStart(()=>{resource.aboutbtn.position.set(310,580);});
			let scoreOut=new Tween(resource.scorebtn.position);
			scoreOut.to({x:-resource.scorebtn.width},1000).easing(TWEEN.Easing.Elastic.In).onStart(()=>{resource.scorebtn.position.set(50,580);});
			let PlayOut=new Tween(resource.playbtn.scale);
			PlayOut.to({x:0,y:0},1000).easing(TWEEN.Easing.Elastic.In).onStart(()=>{resource.playbtn.scale.set(1/scaleDiv);}).onComplete(()=>{resource.playbtn.visible=false;});
			let menuOut=new Tween();
			menuOut.onStart(()=>{logoOut.start();aboutOut.start();scoreOut.start();PlayOut.start();});
			return menuOut;
		})();
		menu.BtnOut=()=>{
			menuOut.start();
		};
		menu.BtnIn=()=>{
			menuIn.start();
		};
		//window.menu=menu;
		resource.playbtn.onHover=()=>{
			playH.start();
		};
		resource.playbtn.onLeave=()=>{
			playL.start();
		};
		menu.startGame=()=>{};
		resource.playbtn.onClick=()=>{
			//change to game scene
			menuOut
				.onComplete(()=>{
					let t=new Tween(scene.menu);
					t
						.to({alpha:0})
						.onStart(()=>{scene.game.visible=true;})
						.onComplete(()=>{scene.menu.visible=false;menu.startGame()})
						.start();
						menuOut.onComplete(()=>{});
				}).start();
		};
		resource.aboutbtn.onHover=()=>{
			aboutH.start();
		};
		resource.aboutbtn.onLeave=()=>{
			aboutL.start();
		};
		let showAbout=false;
		resource.aboutbtn.onClick=()=>{
			//Maybe this is the most ugly code in the world, but i love this code just the way it is. XD
			if(showAbout){
				let t=(new Tween(resource.aboutText.scale))
						.to({x:0,y:0},1000).easing(TWEEN.Easing.Elastic.In)
						.onComplete(()=>{
							resource.aboutText.visible=false;
							(new Tween(resource.aboutbtn.position))
							.to({x:view.width+resource.aboutbtn.width},1000)
							.easing(TWEEN.Easing.Elastic.Out).start().chain(menuIn)
							.onComplete(()=>{resource.aboutbtn.tint=0x00A2FA;});
						}).start();
				showAbout=false;
			}
			else{
				let t=new Tween();
				t
					.onStart(()=>{
						resource.aboutText.visible=true;
						resource.aboutText.scale.set(0);
						menuOut.start();
					}).start();
				let abtTin=
							(new Tween(resource.aboutText.scale))
							.to({x:1,y:1},1000).easing(TWEEN.Easing.Elastic.Out);
				menuOut.onComplete(()=>{
					(new Tween(resource.aboutbtn.position))
					.to({x:310},1000)
					.easing(TWEEN.Easing.Elastic.Out).start().chain(abtTin);
					resource.aboutbtn.tint=0xff0000;
					menuOut.onComplete(()=>{});
				});
			showAbout=true;
			}
		};

		resource.scorebtn.onHover=()=>{
			scoreH.start();
		};
		resource.scorebtn.onLeave=()=>{
			scoreL.start();
		};
		resource.scorebtn.onClick=()=>{
			console.log("click");
		};

		return menu;
	}
});