define(["pixi.min"],(PIXI)=>{
	const Graphics=PIXI.Graphics;
	return function(opponentList,scenes){
		let ht={};
		let playArea=new Graphics();
		playArea.beginFill(0xff0000,0.5);
		playArea.drawRect(0,0,805,1920);
		playArea.endFill();
		scenes.game.addChild(playArea);
		playArea.position.x=48;
		playArea.scale.set(1/game.config.scaleDiv);
		playArea.visible=false;
		ht.test=(point)=>{
			//check play area
			let hit=false;
			if(playArea.position.x+3>point.x||(playArea.position.x+playArea.width-3)<point.x)
				return true;
			opponentList.forEach((x)=>{
				if(x.test(point))
					hit=true;
			});
			return hit;
		}
		return ht;
	};
});