define(["pixi.min"],(PIXI)=>{
	const	Point = PIXI.Point;
			Graphics = PIXI.Graphics;
	return function(initpoint,v,va){
		let c={};
		c.initpoint=initpoint;
		c.head=new Point(c.initpoint.x,c.initpoint.y);
		c.trails=[new Point(c.initpoint.x,c.initpoint.y)];
		c.shape=new Graphics();
		let velocity=v;
		c.setV=(v)=>{
			velocity=velocity>0?v:-v;
		};
		c.maxY=va;
		c.run=()=>{
			//speed
			c.head.x+=velocity;
			//shape
			c.shape.clear();
			c.shape.lineStyle(5,0xff0000,0.8);
			c.shape.moveTo(c.head.x,c.head.y);
			for(let i=c.trails.length-1;i>=0;i--){
				if(c.trails[i].y>c.maxY&&c.trails[i+1]){
					if(c.trails[i+1].y>c.maxY){
						c.trails.splice(i,1);
					}
				}
				c.trails[i].y+=Math.abs(velocity);
				c.shape.lineTo(c.trails[i].x,c.trails[i].y);
			}
		};
		c.turnNinty=()=>{
			velocity*=-1;
			c.trails.push(new Point(c.head.x,c.head.y));
		};
		c.reset=()=>{
			c.head=new Point(c.initpoint.x,c.initpoint.y);
			c.trails.splice(0,c.trails.length-1);
			c.trails=[new Point(c.initpoint.x,c.initpoint.y)];
			c.shape.clear();
		}
		return c;
	}
});