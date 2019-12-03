window.$=HTMLElement.prototype.$=function(selector){
	return(this==window?document:this).querySelectorAll(selector);
}
var tetris={
	RN:20,//行数
	CN:10,//列数
	CSIZE:26,//每个格子宽高
	OFFSET_X:15,
	OFFSET_Y:15,
	pg:null,//保存游戏主界面对象
	currShape:null,//正在保存正在移动的图形
	nextShape:null,
	// interval:100,
	timer:null,
	wall:[],
	state:1,
	R:1,
	O:0,
	P:2,
	IMG_O:"0000.jpg",
	IMG_P:"02.jpg",
	SCORES:[0,5,10,20,40],
	score:0,
	lines:0,
	levels:1,
	i:4,
	init:function(){        //初始化
	    this.pg=$(".playground")[0];
 	    this.currShape=this.randomShape();
	    this.nextShape=this.randomShape();
	       for(var i=0;i<this.RN;this.wall[i++]=[]);
	       this.paintShape();
	       this.timer=setInterval(function(){
		tetris.drop();
		tetris.paint();
	       },400);
	    document.onkeydown=function(){
		var e=window.event||arguments[0];
		switch(e.keyCode){
			case 37: tetris.moveL();break;
			case 39: tetris.moveR();break;
			case 40: tetris.drop();break;
			case 38:tetris.rotateR();break;
			case 65: tetris.rotateR();break;
			case 68: tetris.rotateL();break;
			case 80: tetris.gamePause();break;
			case 83: tetris.gameStart();break;
			case 87: tetris.speed();
		}
	    }
 	},
	speed:function(){   
      	$(".play div")[0].innerHTML="&emsp;&emsp;&emsp;当前速度：每块"+tetris.i+"秒";
      	tetris.i=(tetris.i/1.2).toFixed(4);
      	tetris.init();
   
 	},
 	vioce:function(){
 		mid=new Array()
        mid[1]="1.mp3"
 		document.getElementById("sound").src=mid[1];
 	},
 	rotateR:function(){
 		if(this.state==1){
 			this.currShape.rotateR();
            if(!this.canMove()){
 		    this.currShape.rotateL();
 		    }
 		}
 	},
 	rotateL:function(){
 		if(this.state==1){
 			this.currShape.rotateL();
            if(!this.canMove()){
 		    this.currShape.rotateR();
 		    }
 		}
 	},
 	moveL:function(){
 		if(this.state==1){
 		   this.currShape.moveL();
           if(!this.canMove()){
 		   this.currShape.moveR();
 		   }
 		}	 
 	},
 	moveR:function(){	
 		if(this.state==1){
 		  this.currShape.moveR();
           if(!this.canMove()){
 		   this.currShape.moveL();
 		
 		   }
 		}
 	},
	drop:function(){
		if(this.state==1){
			if(this.canDrop()){
 			    this.currShape.drop();
 		    }
 		    else{
 		        this.landIntoWall();
 		        var ln=parseInt(this.deleteLines());
 		        this.score+=this.SCORES[ln]
 		        this.lines+=ln;
 		        (this.score>=10)&&(this.levels=2);
 		        (this.score>=60)&&(this.levels=3);
 		        (this.score>=90)&&(this.levels=4);
 		        (this.score>=150)&&(this.levels=5);
 		        (this.score>=200)&&(this.levels=6);
 		        (this.score>=300)&&(this.levels=7);
 		        (this.score>=500)&&(this.levels=8);
 		       
 		        if(tetris.gameOver()){
 			        this.gameStart();
 		        }
 	            else{ 
 		            this.currShape=this.nextShape;
	                this.nextShape=this.randomShape();
 		        }
 	        }
	    }
	    else if(this.state==2){
 			this.paint;
	    }
	    else if(this.state==0){
	    	clearInterval(this.timer);
	    	this.timer=null;
	    	tetris.init();
 			this.paint;

	    }
 	},	
 	landIntoWall: function(){
       for (var i=0;i<this.currShape.cells.length;i++){
    	this.wall[this.currShape.cells[i].row][this.currShape.cells[i].col]=this.currShape.cells[i];
    }
	},
 	canDrop:function(){
         for (var i=0;i<this.currShape.cells.length;i++){
         	if(this.currShape.cells[i].row==tetris.RN-1
         		||this.wall[this.currShape.cells[i].row+1][this.currShape.cells[i].col]){
         		return false;
         	}
         }
         return true;
 	},
 	canMove:function(){
         for (var i=0;i<this.currShape.cells.length;i++){
         	if(this.currShape.cells[i].col==-1
         		||this.currShape.cells[i].col==tetris.CN
         		||this.wall[this.currShape.cells[i].row][this.currShape.cells[i].col]
         		){
         		return false;
         	}  
         }
         return true;
 	},
	randomShape:function(){
		switch(parseInt(Math.random()*6)){
			case 0: return new O();
			case 1: return new T();
			case 2: return new I();
			case 3: return new S();
			case 4: return new Z();
			case 5: return new L();
			case 6: return new J();
		}
	},
	paint:function(){
      this.pg.innerHTML=this.pg.innerHTML.replace(/<img(.*?)>/g,"");
      this.paintShape();
      this.paintWall();
      this.paintNextShape();
      this.paintScore();
      this.paintState();
 	},
 	paintState: function(){
     var img=new Image();
     switch(this.state){
     case this.O:
     (img.src=this.IMG_O)&&$(".playground ")[0].appendChild(img);break;
     case this.P:
     (img.src=this.IMG_P)&&$(".playground p")[4].appendChild(img);
     }
      
 	},
	paintShape:function(){//绘制当前图形的方法
	    var cells=this.currShape.cells;
	        for (var i=0;i<cells.length;i++){
	            var x=cells[i].col*this.CSIZE+this.OFFSET_X;
                var y=cells[i].row*this.CSIZE+this.OFFSET_Y;
                var img= new Image();
                img.src=cells[i].img;
                    img.style.left=x+"px";
                    img.style.top=y+"px";
            this.pg.appendChild(img);
	}},
	paintNextShape:function(){//绘制下一代图形的方法
	    var cells=this.nextShape.cells;
	        for (var i=0;i<cells.length;i++){
	           var x=(cells[i].col+10)*this.CSIZE+this.OFFSET_X;
               var y=(cells[i].row+1)*this.CSIZE+this.OFFSET_Y;
               var img= new Image();
               img.src=cells[i].img;
               img.style.left=x+"px";
               img.style.top=y+"px";
               this.pg.appendChild(img);
	}},
	paintWall:function(){
	    for (var r=0;r<this.RN;r++){
		    for(var c=0;c<this.CN;c++){
			  var cell=this.wall[r][c];
			  if(cell){
				var x=this.wall[r][c].col*this.CSIZE+this.OFFSET_X;
                var y=this.wall[r][c].row*this.CSIZE+this.OFFSET_Y;
                var img= new Image();
                img.src=cell.img;
                img.style.left=x+"px";
                img.style.top=y+"px";
                this.pg.appendChild(img);
			}
		}
	}},
	paintScore:function(){
     $(".playground span")[0].innerHTML=this.score;
     $(".playground  span")[1].innerHTML=this.lines;
     $(".playground  span")[2].innerHTML=this.levels;
	},
	deleteLines:function(){
        for(var i=0,lines=0;i<this.RN;i++){
    	    if(this.isFull(i)){
    		this.deleteLine(i);
    		lines++;
    	}
        }
        return lines;
	},
	isFull:function(row){
        for(var c=0;c<this.CN;c++){
        if(!this.wall[row][c]){
        	return false;
        }
        }
        return true;
	},
	deleteLine:function(row){
     // this.wall.splice(row,1);
     this.wall.unshift([]);
     for(var r=row;r>0;r--){
     	for(var c=0;c<tetris.CN;c++){
     		if(this.wall[r][c]){
     		this.wall[r][c].row++;
     	}
     	}
     	
     }
	},
	gamePause:function(){
		if(tetris.state==1){
			tetris.state=this.P;
 			
		}
		else if(this.state==2){
            this.state=1;
		}
	},
	gameStart:function(){
		if(this.state==0){
		    this.state=1;
		}
		else if(this.state==1){
            this.state=0;
		}
	},
	gameOver:function(){

		for (var i=0;i<this.currShape.cells.length;i++){
		    if(this.currShape.cells[i].row==0
         	 &&this.wall[this.currShape.cells[i].row+1][this.currShape.cells[i].col]){
             return true;
	        }  
	    }
	}
}


window.onload=function(){
	tetris.init();
}