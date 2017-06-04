/* helper.js
 * 
 * Kumpulan helper seperti alias, helper function
 */
let Application,loader,Sprite,Text,Container;
let setAnchorCenter,introMaker;

 define(["pixi.min"],function(PIXI){
 	Application=PIXI.Application,
	loader = PIXI.loader,
	Sprite = PIXI.Sprite,
	Text = PIXI.Text,
	Container = PIXI.Container;

	setAnchorCenter=function(o){
		o.anchor.set(0.5,0.5);
	}

	introMaker={
		items:[],
		now:0,
		lastTime:0,
		addItems:function(x,st=1500,cv=0.02){
			x.fadeIn=true;
			x.lastTime=0;
			x.st=st;
			x.cv=cv;
			this.items.push(x);
		},
		onDone:()=>{},
		draw:function(){
			if(this.now<this.items.length){
				if(this.items[this.now].fadeIn){
					if(this.items[this.now].alpha<1){
						this.items[this.now].alpha+=this.items[this.now].cv;
					}
					else{
						this.items[this.now].fadeIn=false;
						this.items[this.now].lastTime=app.ticker.lastTime;
					}
				}
				else{
					if(app.ticker.lastTime-this.items[this.now].lastTime>this.items[this.now].st){
						if(this.items[this.now].alpha>0){
							this.items[this.now].alpha-=this.items[this.now].cv;
						}
						else{
							this.now++;
						}
					}
				}
			}
			else
			{
				this.onDone();
			}
			this.lastTime=app.ticker.lastTime;
		}
	};
 });