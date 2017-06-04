define(['jquery'],function($) {
	
	return{
		/*
		Keyboard:function(keyCode){
			let key={};
			key.code=keyCode;
			key.isDown=false;
			key.isUp=true;
			key.press=undefined;
			key.release=undefined;
			key.downHandler=event=>{
				if(event.keyCode===key.code){
					if(key.isUp&&key.press) key.press();
					key.isDown=true;
					key.isUp=false;
				}
				event.preventDefault();
			};
			key.upHandler=event=>{
				if(event.keyCode===key.code){
					if(key.isDown&&key.release) key.release();
					key.isDown=false;
					key.isUp=true;
				}
				event.preventDefault();
			};
			window.addEventListener(
				"keydown",key.downHandler.bind(key),false
				);
			
			window.addEventListener(
				"keyup",key.upHandler.bind(key),false
				);

			return key;
		},
		*/
		//new keyboard using jquery
		Keyboard:function(code,down,up){
			let handler={
				onDown:down,
				onUp:up,
				enabled:false,
				timeStamp:0,
				code:code,
				enable:function(){
					if(!this.enabled){
						this.enabled=true;
						$(window).keydown({caller:this},function(event){
							if(event.which===event.data.caller.code){
								if(event.timeStamp-event.data.caller.timeStamp>50){
									if(event.data.caller.onDown){
										event.data.caller.onDown();
									}
								}
							}
							event.data.caller.timeStamp=event.timeStamp;
							event.preventDefault();
						});
					}
				},
				disable:function(){
					if(this.enabled){
						$(window).off("keydown");
						this.enabled=false;
					}
				}
			};
			return handler;
		},
		Mouse:function(element){
			return "assign MOUSE";
		},
		Touch:function(element){
			return "assign Touch";
		}
	}
});