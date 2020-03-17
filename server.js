/**

Klausimai:
"Type": "Testas", "Atviras"
"Dalykas": "Lietuviu", "Anglu", "IT", "Fizika", "Matematika", "Istorija"

"Testas":
"Klausimas": "";
"Variantai": [.., .., .., ..];
"Atsakymas:" [..];


"Atviras":
"Klausimas": "";
 "Atsakymas": "";Jei -1, tai nenustatytas atsakymas


*/

function SukurkKlausima(type, dalykas, klausimas, variantai, atsakymas){
	var ret = {Type: type, Dalykas: dalykas, Klausimas: klausimas, Variantai: variantai, Atsakymas: atsakymas};
	return ret;
}

function PridekKlausima(klausimas){
	visiKlausimai.klausimai.push(klausimas);
}

function PridekTesta(pavadinimas, testas){
	testai.visiTestai.push(testas);
}
// Adomas ir Ieva. 
function SukurkTesta(numeriai){

	var testas = [];

	for(var i = 0; i < numeriai.length; i++){
		if(numeriai[i] < 0 || numeriai[i] >= visiKlausimai.length){
			console.log("Nekorektiskas testas");
			return [];
		}
		testas.push(visiKlausimai.klausimai[numeriai[i]]);
	}
	return testas;
}

function KlausimaImeskIFaila(ka){
	var ls = JSON.stringify(ka);
	fs.writeFile('visiKlausimai.json', ls, 'utf8', NepavykoIrasyti); // write it back 
}
function TestaImeskIFaila(ka){
	var ls = JSON.stringify(ka);
	fs.writeFile('testai.json', ls, 'utf8', NepavykoIrasyti); // write it back 
}
function SimplifyTests(test){
	var Return = [];
	for(var i = 0; i < test.length; i++){
		var Plus = {'Name': test[i].Name, 'Hidden': test[i].Hidden};
		Return.push(Plus);
	}
	return Return;
}

function NepavykoIrasyti(err){
	if(err) console.log('NEPAVYKO IRSYTI + ' + err);
	else {
		console.log("Iraseme i faila");
	}
}

function IrasinekKlausimusIrTestus(){
	KlausimaImeskIFaila(visiKlausimai);
	TestaImeskIFaila(testai);

}
setInterval(IrasinekKlausimusIrTestus, 30000);

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var fs = require('fs');
var visiKlausimai = require('./visiKlausimai.json');
var testai = require('./testai.json');

users = [];
connections = [];
names = [];

server.listen(process.env.PORT || 3000);
console.log('Serveris veikia');

app.get('/teacher', function(req, res){
	res.sendFile(__dirname + '/teacher.html');
});
app.get('/klausimai', function(req, res){
	res.sendFile(__dirname + '/klausimai.html');
});
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
app.get('/testai', function(req, res){
	res.sendFile(__dirname + '/testai.html');
});
app.get('/mainFunctions.js', function(req, res){
	res.sendFile(__dirname + '/mainFunctions.js');
});
app.get('/testas', function(req, res){
	res.sendFile(__dirname + '/testas.html');
});


//var klausimas1 = SukurkKlausima("Testas", "Lietuviu", "Kiek man metu?", ["0", "1", "2", "3"], 0);
//var klausimas2 = SukurkKlausima("Testas", "Matematika", "Kiek 2+2?", ["0", "7", "8", "4"], 3);
//var klausimas3 = SukurkKlausima("Testas", "Anglu", "What is my name?", ["Augustinas", "Justinas", "John", "Prick"], 2);

//PridekKlausima(klausimas1);
//PridekKlausima(klausimas2);
//PridekKlausima(klausimas3);

io.sockets.on('connection', function(socket){

	var Vardas = "";

	connections.push(socket);
	
	console.log('Connected: Connected to ' + connections.length + ' connections');
	
	socket.on('disconnect', function(data){ // Atsijungia
		connections.splice(connections.indexOf(socket), 1); 
	});

	socket.on('vardas', function(data){
		console.log('Atejo vardas ' + data + ' is ' + socket.id);
		Vardas = data;
		socket.emit('faze2', true);
	});
	socket.on('pridekTesta', function(data){
		testai.visiTestai.push(data);
	});
	socket.on('AskForQuestions', function(){
		socket.emit('GetAllQuestions', visiKlausimai.klausimai);
	});
	socket.on('EditQuestion', function(data){
		visiKlausimai.klausimai[data.index] = data.question;
		socket.emit('QuestionSaved');
	});
	socket.on('RemoveQuestion', function(data){
		visiKlausimai.klausimai[data].Hidden = 1;
	});
	socket.on('AddNewQuestion', function(data){
		var PastIndex = data.pastIndex;
		var Question = data.question;
		visiKlausimai.klausimai.push(Question);
		socket.emit('SavedNewQuestion', {newIndex: visiKlausimai.klausimai.length-1, oldIndex:PastIndex});
	});
	socket.on('AskForAllTests', function(){
		socket.emit('GetAllTests', SimplifyTests(testai.visiTestai));
	});
	socket.on('DeleteTest', function(data){
		testai.visiTestai[data].Hidden = 1;
	});
	socket.on('AskForATest', function(data){
		socket.emit('GetTheTest', testai.visiTestai[data]);
	});
	socket.on('AddNewQuestionToTest', function(data){
		testai.visiTestai[data.testIndex].Questions.push(data.question);
		socket.emit('NewQuestionToTestAdded', {'newIndex': testai.visiTestai[data.testIndex].Questions.length-1, 'pastIndex': data.pastIndex});
	});
	socket.on('DeleteQuestionFromTest', function(data){
		testai.visiTestai[data.testIndex].Questions[data.questionIndex].Hidden = 1;
	});
	socket.on('EditQuestionInTest', function(data){
		testai.visiTestai[data.testIndex].Questions[data.questionIndex] = data.question;
	});
	socket.on('ChangeTime', function(data){
		testai.visiTestai[data.index].Time = data.time;
	});
	socket.on('ChangeName', function(data){
		testai.visiTestai[data.index].Name = data.name;
	});
	
});
