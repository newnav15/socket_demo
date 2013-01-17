
/**
 * Module dependencies.
 */

var express = require('express')
  , app = express()
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

server.listen(app.get('port'));

io.sockets.on('connection', function (socket) {
		var data="my data from server.....";
		console.log("emitting event now from server..........."+data);
		io.sockets.emit('myEvent', data);
		socket.on('clientEvent', function(data){
			console.log("client data received ==>"+ data);
			io.sockets.emit('myEvent', data);
		});
		
});	