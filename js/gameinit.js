define(["jquery","pixi.min"],($,PIXI)=>{
	return function(i,s,c){
		const Application=PIXI.Application;
		let app=new Application({
			width:360,
			height:640,
			view:$("#mycanvas")[0],
			antialias:true,
			transparent:false
			,backgroundColor:0x000000
		});
		require(['utils/scaleToWindow'],function(){
				function resizehandler(){
					const 	view=game.app.view,
							config=game.config;
					app.scalenum=scaleToWindow(app.view);
					config.scaleDiv=config.desainHeight<config.desainWidth?config.desainHeight/view.height:config.desainWidth/view.width;
					console.info("Scale Divider: ",config.scaleDiv);
				}
				resizehandler();
				$(window).resize(resizehandler);
		});
		let game={};
		game.app=app;

		//atur config neng kene
		game.config={
			desainWidth:1080,
			desainHeight:1920,
			author:"Ardiningrum Project"
		};
		//end

		//callback here, because we love that \^_^/
		game.event={};
		game.event.onInit=i;
		game.event.onSetup=s;
		game.event.onSceneCreated=c;

		if(game.event.onInit)
			game.event.onInit(game);
		return game;
	}
});