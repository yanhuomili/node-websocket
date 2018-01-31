var timer = null;
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
	port: 8181
});
wss.on('connection', function(ws) {//监听websocket链接
	console.log('client connected');
	ws.on('message', function(message) {//监听客户端发过来的信息
		console.log(JSON.parse(message));
		var newObj=JSON.parse(message);
		var obj1={}
		clearInterval(timer);
		//接收到客户端发送过来的信息之后，定时向客户端返回数据，
		//当再次受到客户端发过来的信息时，又开始重新计算向客户端返回数据
		timer = setInterval(function() {
			for(var item in newObj){
				console.log(item,newObj[item])
				obj1[item]=newObj[item]+(Math.random()*4-2)
			}
			ws.send(JSON.stringify(obj1));//给客户端发送信息
		}, 1000)
	});
});

console.log('listen at localhost 8181')