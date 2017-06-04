define(()=>{
	return function(ele){
		let keydown=undefined;
		let mousedown=undefined;
		this.onKeyDown=(f)=>{
			keydown=f;
		};
		this.onMouseDown=(f)=>{
			mousedown=f;
		};
		if(ele===undefined)
			ele=window;
		ele.addEventListener("mousedown",(e)=>{
			if(mousedown){
				mousedown(e);
			}
		},false);
		ele.addEventListener("keydown",(e)=>{
			if(keydown){
				keydown(e);
			}
		},false);

		this.resetHandler=()=>{
			keydown=undefined;
			mousedown=undefined;
		};

		return this;
	}
});