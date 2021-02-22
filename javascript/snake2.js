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
	startGame();
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
	time=setInterval("move()",3000);
}

function drawGamepanel(){
	document.getElementById("snakeTable").innerHTML="";//清空游戏面板
	for(var i=0;i<row;i++){
			var tr=dce("tr");
			var tr_data=[];
		for(var j=0;j<col;j++){
			var td=dce("td");
			var text=document.createTextNode(i+","+j);
			td.style.border="1px solid blue";
			td.appendChild(text);
			tr.appendChild(td);
			tr_data[j]=td;//存到了数组当中
		}
		gameData[i]=tr_data;
		document.getElementById("snakeTable").appendChild(tr);
	}
	console.log(gameData);
}
var snake=[[3,3],[3,4],[3,5]];//初始化3节蛇
function drawSnake(){
	for(var i=0;i<snake.length;i++){
		var snake_row=snake[i][0];
		var snake_col=snake[i][1];
		gameData[snake_row][snake_col].style.background="green";
	}
	
}

var food=[5,1];
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
	snake1=snake;
}

function white(){
	snake=""
	drawSnake();
}

var direction=1;//1-左；-1-右；2-上；-2-下；
var tail=[];
function move(){
	white();
	snake1[snake1.length-1][0]=snake1[snake1.length-1][0];
	snake1[snake1.length-1][1]=snake1[snake1.length-1][1]-1;
	
	for (var i=snake1.length-2;i>=0;i--){
		snake1[i+1][0]=snake1[i][0];
		snake1[i+1][1]=snake1[i][1];
		
	}
	//处理蛇头位置
	if(direction==1){
		if(snake1[0][1]==0){
			snake1[0][0]=snake1[0][0];
			snake1[0][1]=col-1;
		}else{
		snake1[0][0]=snake1[0][0];
		snake1[0][1]=snake1[0][1]-1;
		}
	}
	snake=snake1;
	drawSnake();
	
}







