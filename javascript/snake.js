function dce(name){
	return document.createElement(name);
}//把脚本创建元素的代码进行封装

function addEle(parent,child){
	parent.appendChild(child);
}//进行封装 但是我没用这个函数


var gameData=[];//所有数据存在一个数组里
var col="";
var row="";
var time;
function initRC(){
	var r=document.getElementById("row").value
	var c=document.getElementById("col").value;
	if(r!="" && c!=""){
	row=r;
	col=c;
	time=setInterval("startGame()",1000);
	}else{
		alert("请输入行数和列数");
	}
	console.log("r="+r);
	console.log("c="+c);
}
function startGame(){
	drawGamepanel();//画游戏面板
	drawSnake();//画蛇
	drawFood();//画食物
	drawWall();//画墙
	move();//移动
	//是否碰撞问题
	eatFood();//碰到食物
	eatWall();//碰到墙了
	eatSelf();//碰到自己
}

function drawGamepanel(){
	document.getElementById("snakeTable").innerHTML="";//清空游戏面板
	for(var i=0;i<row;i++){
			var tr=dce("tr");
			var tr_data=[];
		for(var j=0;j<col;j++){
			var td=dce("td");
			var text=document.createTextNode(i+","+j);
			td.style.border="0px solid blue";
			td.appendChild(text);//注释掉这一行可以让面板中不显示数组
			tr.appendChild(td);
			tr_data[j]=td;//存到了数组当中
		}
		gameData[i]=tr_data;
		document.getElementById("snakeTable").appendChild(tr);
	}
	//console.log(gameData);
}
var snake=[[3,3],[3,4],[3,5]];//初始化3节蛇
var tail=[];
function drawSnake(){
	for(var i=0;i<snake.length;i++){
		var snake_row=snake[i][0];
		var snake_col=snake[i][1];
		gameData[snake_row][snake_col].style.background="green";
	}
	
	//alert(snake1);
	//alert(snake);
	
}

var food=[5,1];
function makeFood(){
	var food_row=parseInt(Math.random()*(row-1));//random可以生成0-1的随机数
	var food_col=parseInt(Math.random()*(col-1));
	
	var f1=false;//代表不能生在原来的食物地方
	if(food[0]==food_row && food[1]==food_col){
		f1=true;
	}
	
	var f2=false;//代表不能生在蛇的身体上
	for(var i=0;i<snake.length;i++){
		var snake_row=snake[i][0];
		var snake_col=snake[i][1];
		if(food_row==snake_row && food_col==snake_col){
			f2=true;
			break;
		}
	}
	
	var f3=false;//代表不能生在墙上
	for(var i=0;i<wall.length;i++){
		var wall_row=wall[i][0];
		var wall_col=wall[i][1];
		if(food_row==wall_row && food_col==wall_col){
			f3=true;
			break;
		}
	}
	if (f1 || f2 || f3){
		makeFood();//递归
	}else{
	food[0]=food_row;
	food[1]=food_col;
			
	}
}
function drawFood(){
	
		var food_row=food[0];
		var food_col=food[1];
		gameData[food_row][food_col].style.background="yellow";
	
}
var wall=[[7,0],[7,1],[7,2],[7,3],[7,4]];
function drawWall(){
	for(var i=0;i<wall.length;i++){
		var wall_row=wall[i][0];
		var wall_col=wall[i][1];
		gameData[wall_row][wall_col].style.background="gray";
	}
}
var direction=1;//1-左；-1-右；2-上；-2-下；
function changeDirection(d){
	if((direction+d)!=0){
	direction=d;
	}//也就是之前在向左的话，按向右没反应；之前向上的话，按向下没反应
}
function move(){
	//原来写的是tail=snake[snake.length-1];这是传了对象，没传过去数据内容
	tail[0]=snake[snake.length-1][0];
	tail[1]=snake[snake.length-1][1];
	for (var i=snake.length-2;i>=0;i--){
		snake[i+1][0]=snake[i][0];
		snake[i+1][1]=snake[i][1];
		
	}//蛇的身体
	//处理蛇头位置
	if(direction==1){
		if(snake[0][1]==0){
			snake[0][0]=snake[0][0];
			snake[0][1]=col-1;
		}else{
		snake[0][0]=snake[0][0];
		snake[0][1]=snake[0][1]-1;
		}
	}else if(direction==-1){
		if(snake[0][1]==col-1){
			snake[0][0]=snake[0][0];
			snake[0][1]=0;
		}else{
		snake[0][0]=snake[0][0];
		snake[0][1]=snake[0][1]+1;
		}
	}else if(direction==2){
		if(snake[0][0]==0){
			snake[0][0]=row-1;
			snake[0][1]=snake[0][1];
		}else{
		snake[0][0]=snake[0][0]-1;
		snake[0][1]=snake[0][1];
		}
	}else if(direction==-2){
		if(snake[0][0]==row-1){
			snake[0][0]=0;
			snake[0][1]=snake[0][1];
		}else{
		snake[0][0]=snake[0][0]+1;
		snake[0][1]=snake[0][1];
		}
	}
}


//当键按下时——命名函数
//用键盘控制蛇的方向
document.onkeydown=function(){
	var key=event.keyCode;//把键盘上每个按键所代表的值传回
	//alert(key);w=87;s=83;a=65;d=68
	switch(key){
		case 87:changeDirection(2);
		break;
		case 83:changeDirection(-2);
		break;
		case 65:changeDirection(1);
		break;
		case 68:changeDirection(-1);
		break;
	}
}
var score=0;
function eatFood(){
	var snakeHead_row=snake[0][0];
	var snakeHead_col=snake[0][1];
	var food_row=food[0];
	var food_col=food[1];
	if (snakeHead_row==food_row &&food_col==snakeHead_col){
		//吃了
		//蛇长一节 尾巴接在蛇身上
		snake[snake.length]=tail;
		score=score+1;
		document.getElementById("score").innerHTML=score;
		console.log(score);
		tail=[];//吃完之后，蛇尾清空
		//在产生一个食物
		//alert(snake);
		makeFood();
	}
}
function eatWall(){
	for(var i=0;i<wall.length;i++){
		var wall_row=wall[i][0];
		var wall_col=wall[i][1];
		if(snake[0][0]==wall_row && snake[0][1]==wall_col){
			setTimeout("alert('Game Over')",1000);//两秒后执行这个函数
			clearInterval(time);
			break;
		}
	}
}
function eatSelf(){
	for(var i=1;i<snake.length;i++){
		var snake_row=snake[i][0];
		var snake_col=snake[i][1];
		if(snake[0][0]==snake_row && snake[0][1]==snake_col){
			setTimeout("alert('You eat yourself. Gameover')",1000);//两秒后执行这个函数
			clearInterval(time);
			break;
		}
	}
} 

function changeBack(p){
	if(p==0){
	document.getElementById("snakeTable").style.backgroundImage="url(images/天线宝宝.jpg)";
	
	}else {
	document.getElementById("snakeTable").style.backgroundImage="url(images/白敬亭.jpg)";
			
	}
	//document.getElementById("snakeTable").style.backgroundSize = "400px 500px";
	
}

