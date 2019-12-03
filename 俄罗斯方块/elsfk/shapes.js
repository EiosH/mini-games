function Cell(row,col,img){
	this.row=row;
	this.col=col;
	this.img=img;
	if(!Cell.prototype.drop){
		Cell.prototype.drop=function(){
			this.row++;
		}
	}
	if(!Cell.prototype.moveR){
		Cell.prototype.moveR=function(){
			this.col++;
		}
	}
	if(!Cell.prototype.moveL){
		Cell.prototype.moveL=function(){
			this.col--;
		}
	}

}
function State(r0,c0,r1,c1,r2,c2,r3,c3){
    this.r0=r0;
    this.c0=c0;
    this.r1=r1;
    this.c1=c1;
    this.r2=r2;
    this.c2=c2;
    this.r3=r3;
    this.c3=c3;
}
function Shape(img,orgi){
    this.img=img;
    this.orgi=orgi;
    this.states=[];
    this.state_i=0;
	if(!Shape.prototype.drop){
		Shape.prototype.drop=function(){
			for(var i=0;i<this.cells.length;i++) {
				this.cells[i].drop();
			}
	
		}
	}
	if(!Shape.prototype.moveR){
		Shape.prototype.moveR=function(){
			for(var i=0;i<this.cells.length;i++) {
				this.cells[i].moveR();
			}
	
		}
	}
	if(!Shape.prototype.moveL){
		Shape.prototype.moveL=function(){
			for(var i=0;i<this.cells.length;i++) {
				this.cells[i].moveL();
			}
	
		}
	}
	if(!Shape.prototype.rotateR){
		Shape.prototype.rotateR=function(){
			this.state_i++;
			this.state_i>=this.states.length&&(this.state_i=0);

		    var orgr=this.cells[orgi].row;
			var orgc=this.cells[orgi].col;
			var state=this.states[this.state_i];
			for(var i=0;i<this.cells.length;i++){
				this.cells[i].row=orgr+state["r"+i]
				this.cells[i].col=orgc+state["c"+i]
			}
		}
	}
	if(!Shape.prototype.rotateL){
		Shape.prototype.rotateL=function(){
			this.state_i--;
			this.state_i<0&&(this.state_i=this.states.length-1);
			var state=this.states[this.state_i];
		    var orgr=this.cells[orgi].row;
			var orgc=this.cells[orgi].col;
			for(var i=0;i<this.cells.length;i++){
				this.cells[i].row=orgr+state["r"+i]
				this.cells[i].col=orgc+state["c"+i]
			}
		}
	}
}
function O(){
	Shape.call(this,"1.jpg",null);
	if(!Shape.prototype.isPrototypeOf(O.prototype)){
	Object.setPrototypeOf(O.prototype,Shape.prototype);
	}
	this.cells=[
	new Cell(0,4,this.img),new Cell(0,5,this.img),new Cell(1,4,this.img),new Cell(1,5,this.img)
	];
}
function I(){
	Shape.call(this,"2.jpg",1);
	if(!Shape.prototype.isPrototypeOf(I.prototype)){
	Object.setPrototypeOf(I.prototype,Shape.prototype);
	}
	this.cells=[
	new Cell(0,3,this.img),new Cell(0,4,this.img),new Cell(0,5,this.img),new Cell(0,6,this.img)
	];
    this.states[1]=new State(-1,0,0,0,1,0,2,0);
	this.states[0]=new State(0,1,0,0,0,-1,0,-2);
}
function T(){
	Shape.call(this,"4.jpg",1);
	if(!Shape.prototype.isPrototypeOf(T.prototype)){
	Object.setPrototypeOf(T.prototype,Shape.prototype);
	}
	this.cells=[
	new Cell(0,3,this.img),new Cell(0,4,this.img),new Cell(0,5,this.img),new Cell(1,4,this.img)
	];  
	    this.states[0]=new State(0,-1,0,0,0,1,1,0);
		this.states[1]=new State(-1,0,0,0,1,0,0,-1);
    	this.states[2]=new State(0,1,0,0,0,-1,-1,0);
    	this.states[3]=new State(1,0,0,0,-1,0,0,1);
}
function S(){
	Shape.call(this,"5.jpg",3);
	if(!Shape.prototype.isPrototypeOf(S.prototype)){
	Object.setPrototypeOf(S.prototype,Shape.prototype);
	}
	this.cells=[
	new Cell(0,4,this.img),new Cell(0,5,this.img),new Cell(1,3,this.img),new Cell(1,4,this.img)
	];
	this.states[0]=new State(-1,0,-1,1,0,-1,0,0);
    this.states[1]=new State(0,1,1,1,-1,0,0,0);
}
function L(){
	Shape.call(this,"6.jpg",1);
	if(!Shape.prototype.isPrototypeOf(L.prototype)){
	Object.setPrototypeOf(L.prototype,Shape.prototype);
	}
	this.cells=[
	new Cell(0,4,this.img),new Cell(1,4,this.img),new Cell(2,4,this.img),new Cell(2,5,this.img)
	];
	this.states[0]=new State(-1,0,0,0,1,0,1,1);
    this.states[1]=new State(0,-1,0,0,0,1,-1,1);
    this.states[2]=new State(1,0,0,0,-1,0,-1,-1);
    this.states[3]=new State(0,-1,0,0,0,1,-1,1);
}
function J(){
	Shape.call(this,"7.jpg",1);
	if(!Shape.prototype.isPrototypeOf(J.prototype)){
	Object.setPrototypeOf(J.prototype,Shape.prototype);
	}
	this.cells=[
	new Cell(0,5,this.img),new Cell(1,5,this.img),new Cell(2,5,this.img),new Cell(2,4,this.img)
	];
	this.states[0]=new State(0,-1,0,0,0,1,-1,1);
    this.states[1]=new State(1,0,0,0,-1,0,-1,1);
    this.states[2]=new State(0,1,0,0,0,-1,1,-1);
    this.states[3]=new State(-1,0,0,0,1,0,1,-1);
}
function Z(){
	Shape.call(this,"3.jpg",1);
	if(!Shape.prototype.isPrototypeOf(Z.prototype)){
	Object.setPrototypeOf(Z.prototype,Shape.prototype);
	}
	this.cells=[
	new Cell(0,3,this.img),new Cell(0,4,this.img),new Cell(1,4,this.img),new Cell(1,5,this.img)
	];
	this.states[0]=new State(0,-1,0,0,1,0,1,1);
    this.states[1]=new State(-1,0,0,0,0,-1,1,-1);
}
console.log(O)
console.log(Z)
