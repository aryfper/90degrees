define(["pixi.min","./utils/util","./hitTest"],(PIXI,util,HitTester)=>{
	return function(game,resource,scene){
		const view=game.app.view;

		let opponentProc={};
		//opponent collection
		let arOpp=[];
		//for(x in resource.op){arOpp.push(resource.op[x]);}
		arOpp.push(resource.op.op1);
		arOpp.push(resource.op.op5);
		opponentProc.getOpponents=()=>{return arOpp;};
		//
		let targetOp;
		function oppRandomizer() {
			targetOp=Math.floor(Math.random()*arOpp.length);
		}
		function resetPos(){
			util.opReset(arOpp[targetOp]);
			oppRandomizer();
		}
		opponentProc.run=(v)=>{
			if(arOpp[targetOp].position.y>arOpp[targetOp].height/2+view.height){
				resetPos();
			}
			arOpp[targetOp].position.y+=v;
		};
		opponentProc.reset=()=>{
			arOpp.forEach((x)=>{
				util.opReset(x);
			});
			resource.op.op4.position.y-=10;
			oppRandomizer();
		};
		opponentProc.reset();
		//HIT TEST///////////////////////////////
		resource.op.op1.test=(point)=>{
			/*
			let dy=Math.max(point.y,resource.op.op1.position.y)-Math.min(point.y,resource.op.op1.position.y);
			let dx=Math.max(point.x,resource.op.op1.position.x)-Math.min(point.x,resource.op.op1.position.x);
			if(dy<resource.op.op1.height/2&&dx<resource.op.op1.width/2){
				let limY=(resource.op.op1.width/2)-dx;
				return limY<=0;
			}
			*/
			function sign(a,b,c){
				return ((a.x-c.x)*(b.y-c.y))-((b.x-c.x)*(a.y-c.y));
			}
			let v1={x:resource.op.op1.position.x-resource.op.op1.width/2,y:resource.op.op1.position.y},
				v2={x:resource.op.op1.position.x,y:resource.op.op1.position.y+resource.op.op1.height/2},
				v3={x:resource.op.op1.position.x+resource.op.op1.width/2,y:resource.op.op1.position.y};
			let b1=sign(point,v1,v2)<0,
				b2=sign(point,v2,v3)<0,
				b3=sign(point,v3,v1)<0;
			return ((b1==b2)&&(b2==b3));
		};
		resource.op.op2.test=(point)=>{

		};
		resource.op.op3l.test=(point)=>{

		};
		resource.op.op3r.test=(point)=>{

		};
		resource.op.op4.test=(point)=>{

		};
		resource.op.op5.test=(point)=>{
			//circle hit test
			let d=util.distanceTwoPoint(point,resource.op.op5.position);
			return (d<resource.op.op5.height/2);
			/////////////////////////////////////////
		};

		let hitTester=new HitTester(arOpp,scene);
		opponentProc.hitTest=(point)=>{
			return hitTester.test(point);	
		};
		///////////////////////////////////////////
		return opponentProc;
	};
});