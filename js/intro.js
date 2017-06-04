define(["pixi.min","Tween"],(pixi,TWEEN)=>{

	return function(game,resource,scene){
		const 	Tween=TWEEN.Tween,
				view = game.app.view;

		let intro={};
		intro.scene=scene.intro;
		resource.introA.alpha=0;
		resource.introB.alpha=0;
		let introTween=new Tween(resource.introA);
		introTween.delay(1000).to({alpha:1.0},1000).onStart(()=>{scenes.intro.visible=true;});
		let introATweenFadeout=new Tween(resource.introA);
		introATweenFadeout.delay(2000).to({alpha:0.0},1000);
		let introBTween=new Tween(resource.introB);
		introBTween.to({alpha:1.0},1000);
		let introBTweenFadeout=new Tween(resource.introB);
		introBTweenFadeout.delay(2000).to({alpha:0.0},1000);
		let introDone=new Tween(scenes.intro.position);
		intro.onComplete=null;
		introDone.to({y:view.height},1000)
			.onStart(()=>{
				scenes.menu.visible=true;
			})
			.onComplete(()=>{
				scenes.intro.visible=false;
				if(intro.onComplete)
					intro.onComplete();
			})
			.easing(TWEEN.Easing.Exponential.In);
		//urutan introTween->introAFadeout->introBTween->introBFadeout->introdone
		introTween.chain(introATweenFadeout.chain(introBTween.chain(introBTweenFadeout.chain(introDone))));
		//loop
		intro.loop=()=>{};
		intro.play=()=>{
			introTween.start();
		};
		return intro;
	}
});