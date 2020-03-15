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
function GetAnswer(answer, index, type){
	if(answer == '' && type == 'Open') return Dictionary['Unspecified'];
	if(answer != '' && type == 'Open') return answer;
	return answer+1;
}
function CreateAnswerField(answer, index, type){
	var Td = CreateTd('AnswerField'+index, 'AnswerField', GetAnswer(answer, index, type));
	return Td;
}
function CreateFunctionsField(index){
	var Td = CreateTd('FunctionsField'+index, 'FunctionsField', '');
	Td.append(CreateButton('ChangeQuestion'+index, 'ChangeQuestion', 'ChangeQuestion('+index+')', Dictionary['ToUpdateQuestion']));
	Td.append(CreateBr());
	Td.append(CreateButton('RemoveQuestion'+index, 'RemoveQuestion', 'RemoveQuestion('+index+')', Dictionary['ToRemoveQuestion']));	
	return Td;
}

function CreateClosed(question, index){
	var Tr = CreateTr('QuestionRow'+index, 'QuestionRow Open');
	
	var SubjectField = CreateTd('SubjectField'+index, 'SubjectField', question.Subject);
	var QuestionField = CreateTd('QuestionField'+index, 'QuestionField', question.Question);
	var OptionsField = CreateOptionsField(question.Options, index);
	var AnswerField = CreateAnswerField(question.Answer, index, question.Type);
	var FunctionsField = CreateFunctionsField(index);
	
	Tr.append(SubjectField);
	Tr.append(QuestionField);
	Tr.append(OptionsField);
	Tr.append(AnswerField);
	Tr.append(FunctionsField);
	
	return Tr;
}
function CreateOpen(question, index){
	var Tr = CreateTr('QuestionRow'+index, 'QuestionRow Closed');
	
	var SubjectField = CreateTd('SubjectField'+index, 'SubjectField', question.Subject);
	var QuestionField = CreateTd('QuestionField'+index, 'QuestionField', question.Question);
	var OptionsField = CreateTd('OptionsField'+index, 'OptionsField', Dictionary['QuestionIsOpen']);
	var AnswerField = CreateAnswerField(question.Answer, index, question.Type);
	var FunctionsField = CreateFunctionsField(index);
	
	Tr.append(SubjectField);
	Tr.append(QuestionField);
	Tr.append(OptionsField);
	Tr.append(AnswerField);
	Tr.append(FunctionsField);
	
	return Tr;
}
function TransformSubjectHolder(index, question){
	var Holder = document.getElementById('SubjectField'+index);
	Holder.innerHTML = '';
	Holder.append(CreateTextInput('NewSubjectInput'+index, 'NewSubjectInput', question.Subject));
}
function TransformQuestionHolder(index, question){
	var Holder = document.getElementById('QuestionField'+index);
	Holder.innerHTML = '';
	Holder.append(CreateTextInput('NewQuestionInput'+index, 'NewQuestionInput', question.Question));
}
function TransformAnswerHolder(index, question){
	var Holder = document.getElementById('AnswerField'+index);
	Holder.innerHTML = '';
	if(question.Type == 'Closed') Holder.append(CreateTextInput('NewAnswerInput'+index, 'NewAnswerInput', question.Answer+1));
	if(question.Type == 'Open') Holder.append(CreateTextArea('NewAnswerInput'+index, 'NewAnswerInput', question.Answer));
}
function TransformFunctionsHolder(index){
	var RemoveButton = document.getElementById('RemoveQuestion'+index);
	var ChangeButton = document.getElementById('ChangeQuestion'+index);
	RemoveButton.setAttribute('onClick', 'RemoveQuestion('+index+')');
	ChangeButton.setAttribute('onClick', 'SaveQuestion('+index+')');
	ChangeButton.innerHTML = Dictionary['Save'];
}
function TransformOptionsHolder(index, question){
	if(question.Type == 'Open') return;
	var OptionsHolder = document.getElementById('OptionsField'+index);
	OptionsHolder.innerHTML = '';
	OptionsHolder.append(CreateButton('AddOption'+index, 'AppOption', 'AddOption('+index+')', '+'));
	OptionsHolder.append(CreateButton('RemoveOption'+index, 'RemoveOption', 'RemoveOption('+index+')', '-'));
	NumberOfOptions[index] = question.Options.length; //// HERE!
	
	for(var i = 0; i < question.Options.length; i++){
		OptionsHolder.append(CreateOption(index, i, question.Options[i]));
	}
}
function UpdateClosedQuestion(question, index){
	var Tr = document.getElementById('QuestionRow'+index);
	Tr.innerHTML = '';
	var SubjectField = CreateTd('SubjectField'+index, 'SubjectField', question.Subject);
	var QuestionField = CreateTd('QuestionField'+index, 'QuestionField', question.Question);
	var OptionsField = CreateOptionsField(question.Options, index);
	var AnswerField = CreateAnswerField(question.Answer, index, question.Type);
	var FunctionsField = CreateFunctionsField(index);
	
	Tr.append(SubjectField);
	Tr.append(QuestionField);
	Tr.append(OptionsField);
	Tr.append(AnswerField);
	Tr.append(FunctionsField);
}
function UpdateOpenQuestion(question, index){
	var Tr = document.getElementById('QuestionRow'+index);
	Tr.innerHTML = '';
	var SubjectField = CreateTd('SubjectField'+index, 'SubjectField', question.Subject);
	var QuestionField = CreateTd('QuestionField'+index, 'QuestionField', question.Question);
	var OptionsField = CreateTd('OptionsField'+index, 'OptionsField', Dictionary['QuestionIsOpen']);
	var AnswerField = CreateAnswerField(question.Answer, index, question.Type);
	var FunctionsField = CreateFunctionsField(index);
	
	Tr.append(SubjectField);
	Tr.append(QuestionField);
	Tr.append(OptionsField);
	Tr.append(AnswerField);
	Tr.append(FunctionsField);
}
function GetAllOptions(index){
	var Return = [];
	for(var i = 0; i < NumberOfOptions[index]; i++){
		Return.push(document.getElementById('Option'+index+'-'+i+'Change').value);
	}
	return Return;
}