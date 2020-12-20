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

function getPath(where, data){
    var links = {
        1: 'testai',
        2: 'testas',
        3: 'answers',
        4: 'checkAnswer',
        5: 'klausimai'
    };

    var ret = [];
    if(where == 1){ // testai
        ret.push({word: "Pradžia", link: links[1]});
    }
    if(where == 2){
        if(testai.visiTestai[data.CurrentTest] == null) return [];
        ret.push({word: "Pradžia", link: links[1]});
        ret.push({word: "Testas „" + testai.visiTestai[data.CurrentTest].Name + "“", link: links[2]});
    }
    if(where == 3){
        if(testai.visiTestai[data.CurrentTest] == null) return [];
        ret.push({word: "Pradžia", link: links[1]});
        ret.push({word: "Testas „" + testai.visiTestai[data.CurrentTest].Name + "“", link: links[2]});
        ret.push({word: "Rezultatai", link: links[3]});
    }
    if(where == 4){
        if(testai.visiTestai[data.CurrentTest] == null) return [];
        if(answers.answers[data.AnswerToCheck].Name == null) return [];
        ret.push({word: "Pradžia", link: links[1]});
        ret.push({word: "Testas „" + testai.visiTestai[data.CurrentTest].Name + "“", link: links[2]});
        ret.push({word: "Rezultatai", link: links[3]});
        ret.push({word: "Mokinio " + answers.answers[data.AnswerToCheck].Name + " rezultatas", link: links[4]});
    }
    if(where == 5){
        ret.push({word: "Pradžia", link: links[1]});
        ret.push({word: "Duomenų bazė", link: links[5]});
    }
    return ret;
}

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

function findTestByNum(num){
	for(var i = 0; i < testai.visiTestai.length; i++){
		if(testai.visiTestai[i].Code == num) return testai.visiTestai[i];
	}
	return [];
}
function KlausimaImeskIFaila(ka){
	var ls = JSON.stringify(ka);
	fs.writeFile('visiKlausimai.json', ls, 'utf8', NepavykoIrasyti); // write it back
}
function LoginsImeskIFaila(ka){
	var ls = JSON.stringify(ka);
	fs.writeFile('logins.json', ls, 'utf8', NepavykoIrasyti); // write it back
}
function TestaImeskIFaila(ka){
	var ls = JSON.stringify(ka);
	fs.writeFile('testai.json', ls, 'utf8', NepavykoIrasyti); // write it back
}
function AtsakymaImeskIFaila(ka){
	var ls = JSON.stringify(ka);
	fs.writeFile('answers.json', ls, 'utf8', NepavykoIrasyti); // write it back
}

function SimplifyTests(test, name){
	var Return = [];
	for(var i = 0; i < test.length; i++){
		if(test[i].Belongs != name) continue;
		var Plus = {'Name': test[i].Name, 'Hidden': test[i].Hidden, 'RealIndex': i};
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
function getTestNameByCode(code){
	for(var i = 0; i < testai.visiTestai.length; i++){
		if(testai.visiTestai[i].Code == code) return testai.visiTestai[i].Name;
	}
	return "";
}
function GetCode(){

	while(true){
		var code = Math.round((Math.random()*10000)) ; var is = 1;
		for(var i = 0; i < testai.visiTestai.length; i++){
			if(testai.visiTestai[i].Code == code) is = 0;
		}
		if(is == 1) return code;
	}
}
function existsCreds(name, pass){
	for(var i = 0; i < logins.logins.length; i++){
		if(logins.logins[i].username == name && logins.logins[i].password == pass) return true;
	}
	return false;
}

function FindAnswers(code){
	var ret = [];
	for(var i = 0; i < answers.answers.length; i++){
		var psh = {answer: -1, index: -1, realIndex: -1};
		if(answers.answers[i].Code != code) continue;
		psh.answer = answers.answers[i];
		psh.realIndex = i;
		ret.push(psh);
	}
	return ret;

}
function ProcessAnswer(answer){
	var correct = 0; var wrong = 0; var dvej = 0;
	for(var i = 0; i < answer.Answers.length; i++){
		if(answer.Answers[i].ChoAnswer == answer.Answers[i].CorAnswer && answer.Answers[i].ChoAnswer != ""){
			answer.Answers[i].IsCorr = 1;
			correct++;
		}else{
			answer.Answers[i].IsCorr = 0;
			wrong++;
		}
		if(answer.Answers[i].CorAnswer == ""){ answer.Answers[i].IsCorr = 2; dvej = 1;}
	}
	answer.Percentage = (correct *1.0) / (correct+wrong + 0.0);
	if(dvej == 0) answer.Status = "Checked";
	return answer;

}
function Recalculate(ind){
	var r = 0, w = 0;
	var dvej = 0;
	for(var i = 0; i < answers.answers[ind].Answers.length; i++){
		if(answers.answers[ind].Answers[i].IsCorr == 1) r++;
		else w++;
		if(answers.answers[ind].Answers[i].IsCorr == 2) dvej++;
	}
	if(dvej == 0) answers.answers[ind].Status = "Checked";
	answers.answers[ind].Percentage = (r+0.0)/(r+w+0.0);

}
function IrasinekKlausimusIrTestus(){
	KlausimaImeskIFaila(visiKlausimai);
	TestaImeskIFaila(testai);
	LoginsImeskIFaila(logins);
	AtsakymaImeskIFaila(answers);

}
setInterval(IrasinekKlausimusIrTestus, 30000);

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var fs = require('fs');
var visiKlausimai = require('./visiKlausimai.json');
var testai = require('./testai.json');
var logins = require('./logins.json');
var answers = require('./answers.json');
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
	res.sendFile(__dirname + '/login.html');
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
app.get('/testavimas', function(req, res){
	res.sendFile(__dirname + '/testavimas.html');
});
app.get('/answers', function(req, res){
	res.sendFile(__dirname + '/answers.html');
});
app.get('/checkAnswer', function(req, res){
	res.sendFile(__dirname + '/checkAnswer.html');
});
app.get('/login', function(req, res){
	res.sendFile(__dirname + '/login.html');
});
app.get('/allStyle.css', function(req, res){
	res.sendFile(__dirname + '/allStyle.css');
});
app.get('/nav.html', function(req, res){
	res.sendFile(__dirname + '/nav.html');
});

app.get('/TrueButton.png', function(req, res){
	res.sendFile(__dirname + '/TrueButton.png');
});
app.get('/FalseButton.png', function(req, res){
	res.sendFile(__dirname + '/FalseButton.png');
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
	socket.on('AskForAllTests', function(data){
		if(existsCreds(data.username, data.password))
			socket.emit('GetAllTests', SimplifyTests(testai.visiTestai, data.username));
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
	socket.on('AddNewTest', function(data){
		if(!existsCreds(data.username, data.password)) return;
		testai.visiTestai.push({Belongs: data.username, Name: '', Questions: [],  Time:250, Code:GetCode()});
		socket.emit('GetNewTest', {Name: '', newIndex: testai.visiTestai.length-1});
	});
	socket.on('GiveTest', function(data){
		var ret = findTestByNum(data.testId);
		socket.emit('GetStudentATest', ret);
	});
	socket.on('NewAnswers', function(data){
		answers.answers.push(ProcessAnswer(data));
		socket.emit('AnswerReceived');
	});
	socket.on('GetAnswersByCode', function(data){
		socket.emit('SendAnswersByCode', {answers: FindAnswers(data), name: getTestNameByCode(data)});
	});
	socket.on('CheckValidity', function(data){
		if(data.index == null){
			socket.emit('GetValidity', {valid: existsCreds(data.username, data.password), username: data.username, password:data.password});
		}else{
			if(data.index >= testai.visiTestai.length) {
				socket.emit('GetValidity', {valid: false});
				return;
			}
			if(!existsCreds(data.username, data.password)) {
				socket.emit('GetValidity', {valid: false});
				return ;
			}
			var belongs = testai.visiTestai[data.index].Belongs;
			if(belongs == data.username) socket.emit('GetValidity', {valid: true});
			else socket.emit('GetValidity', {valid: false});
		}

	});
	socket.on('GiveToCheckAnswer', function (data){
		if(data.index >= answers.answers.length) return;
		console.log(data.index + " ir " + data.testIndex);
		if(answers.answers[data.index].Code != testai.visiTestai[data.testIndex].Code) return;
		socket.emit('TakeToCheckAnswer', answers.answers[data.index]);
	});
	socket.on('ChangeAnswerCorr', function (data){
		answers.answers[data.ansInd].Answers[data.ind].IsCorr = data.val;
		Recalculate(data.ansInd);
		// answers.answers[data.ansInd] = ProcessAnswer(answers.answers[data.ansInd]);
	});
    socket.on('GiveMenu', function(data){
        socket.emit('GetMenu', getPath(data.where, data.data));
    });
});
