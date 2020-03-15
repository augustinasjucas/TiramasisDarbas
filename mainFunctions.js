var socket = io.connect();

var Dictionary = {};

Dictionary['QuestionIsOpen'] = 'Klausimas yra atviras';
Dictionary['EditQuestion'] = 'Redaguoti klausimą';
Dictionary['Unspecified'] = 'Nenurodytas';
Dictionary['Question'] = 'Klausimas';
Dictionary['ChoosingOptions'] = 'Pasirinkimo variantai';
Dictionary['Answer'] = 'Atsakymas';
Dictionary['Subject'] = 'Mokomasis dalykas'; 
Dictionary['Functions'] = 'Funkcijos';
Dictionary['TestName'] = 'Testo pavadinimas';
Dictionary['ToUpdateQuestion'] = 'Redaguoti klausimą';
Dictionary['ToRemoveQuestion'] = 'Panaikinti klausimą';
Dictionary['DeleteTest'] = 'Panaikinti testą';
Dictionary['QuestionIsOpen'] = 'Klausimas yra atviras';
Dictionary['Save'] = 'Išsaugoti';
Dictionary['ChooseTest'] = 'Pasirinkti testą';
function ConvertToInt(str){
	var Return = 0;
	for(var i = 0; i < str.length; i++){ 
		if(0 <= str[i]-'0' && str[i]-'0' <= 9) Return = Return*10 + (str[i]-'0');
		else {
			Return = -1;
			break;
		}
	}
	return Return;
}
function RemoveElementById(id) {
	var elem = document.getElementById(id);
	elem.parentNode.removeChild(elem);
}
function CreateButton(id, clas, onClick, value){
	var Button = document.createElement('button');
	Button.setAttribute('id', id);
	Button.setAttribute('class', clas);
	Button.setAttribute('onClick', onClick);
	Button.innerHTML = value;
	return Button;
}
function CreateTr(id, clas){
	var Tr = document.createElement('tr');
	Tr.setAttribute('id', id);
	Tr.setAttribute('class', clas);
	return Tr;
}
function CreateTd(id, clas, value){
	var Td = document.createElement('td');
	Td.setAttribute('id', id);
	Td.setAttribute('class', clas);
	Td.innerHTML = value;
	return Td;
}
function CreateDiv(id, clas, value){
	var Div = document.createElement('div');
	Div.setAttribute('id', id);
	Div.setAttribute('class', clas);
	Div.innerHTML = value;
	return Div;
}
function CreateBr(id = ''){
	var Br = document.createElement('br');
	return Br;
}
function CreateP(id, clas){
	var P = document.createElement('p');
	P.setAttribute('id', id);
	P.setAttribute('class', clas);
	return P;
}
function CreateOptionsField(options, index){
	var Return = CreateTd('OptionsField'+index, 'OptionField', '');
	console.log(options);
	for(var i = 0; i < options.length; i++){
		var Div = CreateDiv('', '', (i+1) + ') ' + options[i]);
		if(i != options.length-1) Div.append(CreateBr());
		Return.append(Div);
	}
	return Return;
}
function CreateTable(id, clas, headers){
	var Table = document.createElement('table');
	Table.setAttribute('id', id);
	Table.setAttribute('class', clas);
	
	var tr = CreateTr('TableHeaders', 'TableHeaders');
	
	for(var i = 0; i < headers.length; i++){
		var th = document.createElement('th');
		th.innerHTML = headers[i];
		tr.append(th);
	}
	Table.append(tr);
	return Table;
}
function CreateTextInput(id, clas, value){
	var Input = document.createElement('input');
	Input.setAttribute('type', 'text');
	Input.setAttribute('id', id);
	Input.setAttribute('class', clas);
	Input.setAttribute('value', value);
	return Input;
}
function CreateTextArea(id, clas, value){
	var Input = document.createElement('textarea');
	Input.setAttribute('type', 'text');
	Input.setAttribute('id', id);
	Input.setAttribute('class', clas);
	Input.innerHTML = value;
	return Input;
}
function CreateOption(index, i, value){
	var Div = CreateDiv('Option'+index+'-'+i+'ChangeHolder', 'OptionChangeHolder', '');
	Div.append(CreateTextInput('Option'+index+'-'+i+'Change', 'OptionChange', value));
	return Div;
}
function AddOption(index){
	if(NumberOfOptions[index] >= 5) return;
	NumberOfOptions[index]++;
	var Holder = document.getElementById('OptionsField'+index);
	Holder.append(CreateOption(index, NumberOfOptions[index]-1, ''));
}
function RemoveOption(index){
	if(NumberOfOptions[index] <= 2) return;
	NumberOfOptions[index]--;
	RemoveElementById('Option'+index+'-'+NumberOfOptions[index]+'ChangeHolder');
}
function NewClosedQuestionForm(){
	return {Hidden: 0, Type: 'Closed', Subject: '', Question:'', Answer:0, Options:['', '']};
}
function NewOpenQuestionForm(){
	return {Hidden: 0, Type: 'Open', Subject: '', Question:'', Answer:''};
}
function FitsAsClosed(question){
	var Fits = true;
	for(var i = 0; i < question.Options.length; i++){
		if(question.Options[i] == '') Fits = false;
		for(var j = i+1; j < question.Options.length; j++){
			Fits = Fits && (question.Options[i] != question.Options[j]);
		}
	}
	Fits = Fits && (question.Answer >= 0 && question.Answer < question.Options.length);
	Fits = Fits && (question.Subject != '');
	Fits = Fits && (question.Question != '');
	return Fits;
}
function FitsAsOpen(question){
	var Fits = true;
	Fits = Fits && (question.Subject != '');
	Fits = Fits && (question.Question != '');
	return Fits
}