define({
	setAnchorCenter:(o)=>{
		o.anchor.set(0.5,0.5);
	},
	setToCenterView:(o,v)=>{
		o.position.set(v.width/2,v.height/2);
	},
	scaleWithDiv:(o,d)=>{
		o.scale.set(1/d);
	},
	setToBtn:(o,mc,mo,ml)=>{
		o.interactive=true;
		o.buttonMode=true;
		let dummy=()=>{};
		o.onClick=mc?mc:dummy;
		o.onHover=mo?mo:dummy;
		o.onLeave=ml?ml:dummy;
		o.on("mousedown",()=>{o.onClick();});
		o.on("mouseover",()=>{o.onHover();});
		o.on("mouseout",()=>{o.onLeave();});
	},
	randBetween:(a,b)=>{
		return Math.floor(Math.random()*(a-b))+b;
	},
	opReset:(x)=>{
		x.position.y=-x.height/2;
	},
	distanceTwoPoint:(pointA,pointB)=>{
		return Math.sqrt(Math.pow(Math.max(pointA.x,pointB.x)-Math.min(pointA.x,pointB.x),2)+Math.pow(Math.max(pointA.y,pointB.y)-Math.min(pointA.y,pointB.y),2));
	}
});