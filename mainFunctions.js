var socket = io.connect();

var Dictionary = {};
Dictionary['BadMultipleTest'] = 'Neteisingas klausimas su keliais variantais';
Dictionary['BadClosedTest'] = 'Neteisingas uždaras klausimas';
Dictionary['BadOpenTest'] = 'Neteisingas atviras klausimas';
Dictionary['WrongCredentials'] = 'Neteisingas prisijungimo vardas arba slaptažodis'
Dictionary['NoCorrectAnswers'] = 'Nėra teisingų atsakymų';
Dictionary['Multiple'] = 'Keletas galimų variantų'
Dictionary['Closed'] = 'Uždaras';
Dictionary['Open'] = 'Atviras';
Dictionary['NoNeedToOverview'] = 'Nereikia peržiūrėti';
Dictionary['NeedToOverview'] = 'Reikia peržiūrėti';
Dictionary['CorrectAnswers'] = 'Tesingų atsakymų';
Dictionary['Name'] = 'Vardas';
Dictionary['Result'] = 'Rezultatas';
Dictionary['Status'] = 'Statusas';
Dictionary['Options'] = 'Pasirinkimai';
Dictionary['Select'] = 'Pasirinkti';
Dictionary['ViewAnswers'] = 'Žiūrėti sprendimus';
Dictionary['QuestionIsOpen'] = 'Klausimas yra atviras';
Dictionary['EditQuestion'] = 'Redaguoti klausimą';
Dictionary['Send'] = 'Siųsti';
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
Dictionary['ChooseTest'] = 'Pasirinkti';
Dictionary['ChangeName'] = 'Pakeisti pavadinimą';
Dictionary['TestName'] = 'Testo pavadinimas';
Dictionary['TestCode'] = 'Testo kodas';
Dictionary['TestTime'] = 'Testo laikas (min.)';
Dictionary['ChangeTime'] = 'Pakeisti laiką';
Dictionary['DeletionTest'] = 'Testo panakinimas';
Dictionary['DeleteTest'] = 'Panaikinti';
Dictionary['ToAddQuestion'] = 'Pridėti klausimą';
Dictionary['ShowAllQuestions'] = 'Rodyti visus klausimus ↓';
Dictionary['HideAllQuestions'] = 'Slėpti visus klausimus ↑';
Dictionary['SaveAndGetBack'] = 'Išsaugoti ir grįžti atgal';
Dictionary['Question'] = 'Klausimas';
Dictionary['QuestionType'] = 'Klausimo tipas';
Dictionary['CorrectAnswer'] = 'Teisingas atsakymas';
Dictionary['ChosenAnswer'] = 'Pasirinktas atsakymas';
Dictionary['Sent'] = 'Išsiųsta';
function CreateA(link, name){
	var A = document.createElement('a');
	A.setAttribute('class', '');
	A.setAttribute('href', link);
	A.append(name);
	return A;
}
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
function ChangeMultipleChoiceButton(questionIndex, optionIndex, val){
	var Holder = document.getElementById('MultipleChoiceAnswerButton' + questionIndex + '' + optionIndex);
	if(val == 1){
		Holder.innerHTML = 'T';
		Holder.className = 'MultipleChoiceAnswerButton CorrectAnswerButton';
	}else{
		Holder.innerHTML = 'N';
		Holder.className = 'MultipleChoiceAnswerButton WrongAnswerButton';
	}

}
function CreateMessageHolder(msg, isError, ind){
	var ret = CreateDiv('ErrorPlace' + ind, 'MainMessage ' + (isError ? 'ErrorMessage' : 'SuccessMessage'), msg);
	return ret;
}
var CurrentIndexForError = 0;
function EraseMessage(ind){
	console.log("darau!");
	RemoveElementById('ErrorPlace' + ind);
}
function DisplayError(msg){
	var Holder = document.getElementsByTagName("body")[0];
	var MessageHolder = CreateMessageHolder(msg, 1, CurrentIndexForError);
	Holder.append(MessageHolder);
	setTimeout(EraseMessage.bind(null, CurrentIndexForError), 5000);
	CurrentIndexForError++;
}
function DisplaySuccess(msg){
	alert(msg);
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
	for(var i = 0; i < options.length; i++){
		var Div = CreateDiv('', '', (i+1) + ') ' + options[i]);
		if(i != options.length-1) Div.append(CreateBr());
		Return.append(Div);
	}
	return Return;
}
function CreateMultipleChoiceAnswerButton(questionIndex, optionIndex){ // qustionIndex - index of the question
	var Return = CreateButton("MultipleChoiceAnswerButton" + questionIndex + "" + optionIndex, "MultipleChoiceAnswerButton", "ChangeMultipleChoiceAnswer(" + questionIndex + ", " + optionIndex + ")", "");
	return Return;
}

function CreateMultipleChoiceAnswerIndicator(answer, ind){
	if(answer.includes(ind)) return MultipleChoicePositiveIndicator();
	return MultipleChoiceNegativeIndicator();
}
function CreateOptionsFieldMultiple(options, index, answer){
	var Return = CreateTd('OptionsField'+index, 'OptionField', '');
	console.log(options);
	for(var i = 0; i < options.length; i++){
		var Div = CreateDiv('', '', (i+1) + ') ' + options[i]);
		// Div.append(CreateMultipleChoiceAnswerIndicator(answer, i));
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
function CreateMultipleOption(index, i, value){
	var Div = CreateDiv('Option'+index+'-'+i+'ChangeHolder', 'OptionChangeHolder', '');
	Div.append(CreateTextInput('Option'+index+'-'+i+'Change', 'OptionChange', value));
	Div.append(CreateMultipleChoiceAnswerButton(index, i));
	return Div;
}
function AddOption(index, type){
	if(NumberOfOptions[index] >= 5) return;
	NumberOfOptions[index]++;
	var Holder = document.getElementById('OptionsField'+index);
	if(type == 'Closed') Holder.append(CreateOption(index, NumberOfOptions[index]-1, ''));
	if(type == 'Multiple'){
		Holder.append(CreateMultipleOption(index, NumberOfOptions[index]-1, ''));
		ChangeMultipleChoiceButton(index, NumberOfOptions[index]-1, 0);
	}
}
function RemoveOption(index, type){
	if(NumberOfOptions[index] <= 2) return;
	NumberOfOptions[index]--;
	RemoveElementById('Option'+index+'-'+NumberOfOptions[index]+'ChangeHolder');
	if(type == "Multiple"){ // have to remove this posibility from the answers
		MakeMultipleAnswersConsistent(index, NumberOfOptions[index]);
	}
}
function NewClosedQuestionForm(){
	return {Hidden: 0, Type: 'Closed', Subject: '', Question:'', Answer:0, Options:['', '']};
}
function NewOpenQuestionForm(){
	return {Hidden: 0, Type: 'Open', Subject: '', Question:'', Answer:''};
}
function NewMultipleQuestionForm(){
	return {Hidden: 0, Type: 'Multiple', Subject: '', Question:'', Answer:[], Options:['', '']}
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
function FitsAsMultiple(question){
	var Fits = true;
	for(var i = 0; i < question.Options.length; i++){
		if(question.Options[i] == '') Fits = false;
	}
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
	if(type == 'Multiple') {
		var ret = "";
		answer.sort();
		for(var i = 0; i < answer.length; i++){
			ret += (answer[i]+1);
			if(i != answer.length-1) ret += ", ";
		}
		return ret;
	}
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
function CreateMultiple(question, index){ // creates a row for multiple
	var Tr = CreateTr('QuestionRow'+index, 'QuestionRow Multiple');

	var SubjectField = CreateTd('SubjectField'+index, 'SubjectField', question.Subject);
	var QuestionField = CreateTd('QuestionField'+index, 'QuestionField', question.Question);
	var OptionsField = CreateOptionsFieldMultiple(question.Options, index, question.Answer);
	var AnswerField = CreateAnswerField(question.Answer, index, question.Type);
	var FunctionsField = CreateFunctionsField(index);

	Tr.append(SubjectField);
	Tr.append(QuestionField);
	Tr.append(OptionsField);
	Tr.append(AnswerField);
	Tr.append(FunctionsField);

	return Tr;
}
function CreateMultipleForDatabase(question, index){
	var Tr = CreateTr('DatabaseQuestionRow'+index, 'DatabaseQuestionRow Open');

	var SubjectField = CreateTd('', 'DatabaseSubjectField', question.Subject);
	var QuestionField = CreateTd('', 'DatabaseQuestionField', question.Question);
	var OptionsField = CreateOptionsFieldMultiple(question.Options, index, question.Answer);
	var AnswerField = CreateAnswerField(question.Answer, index, question.Type);
	var FunctionsField = CreateFunctionsFieldForDatabase(index);

	Tr.append(SubjectField);
	Tr.append(QuestionField);
	Tr.append(OptionsField);
	Tr.append(AnswerField);
	Tr.append(FunctionsField);

	return Tr;
}
function CreateClosedForDatabase(question, index){
	var Tr = CreateTr('DatabaseQuestionRow'+index, 'DatabaseQuestionRow Open');

	var SubjectField = CreateTd('', 'DatabaseSubjectField', question.Subject);
	var QuestionField = CreateTd('', 'DatabaseQuestionField', question.Question);
	var OptionsField = CreateOptionsField(question.Options, index);
	var AnswerField = CreateAnswerField(question.Answer, index, question.Type);
	var FunctionsField = CreateFunctionsFieldForDatabase(index);

	Tr.append(SubjectField);
	Tr.append(QuestionField);
	Tr.append(OptionsField);
	Tr.append(AnswerField);
	Tr.append(FunctionsField);

	return Tr;
}
function CreateOpenForDatabase(question, index){
	var Tr = CreateTr('DatabaseQuestionRow'+index, 'DatabaseQuestionRow Closed');

	var SubjectField = CreateTd('', 'DatabaseSubjectField', question.Subject);
	var QuestionField = CreateTd('', 'DatabaseQuestionField', question.Question);
	var OptionsField = CreateTd('', 'DatabaseOptionsField', Dictionary['QuestionIsOpen']);
	var AnswerField = CreateAnswerField(question.Answer, index, question.Type);
	var FunctionsField = CreateFunctionsFieldForDatabase(index);

	Tr.append(SubjectField);
	Tr.append(QuestionField);
	Tr.append(OptionsField);
	Tr.append(AnswerField);
	Tr.append(FunctionsField);

	return Tr;
}
function CreateFunctionsFieldForDatabase(index){
	var Td = CreateTd('', '', '');
	Td.append(CreateButton('', 'DatabaseAddQuestion', 'AddDatabaseQuestion('+index+')', Dictionary['ToAddQuestion']));
	return Td;
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
	OptionsHolder.append(CreateButton('AddOption'+index, 'AppOption', 'AddOption('+index+', "' + question.Type + '")', '+'));
	OptionsHolder.append(CreateButton('RemoveOption'+index, 'RemoveOption', 'RemoveOption('+index+', "' + question.Type + '")', '-'));
	NumberOfOptions[index] = question.Options.length; //// HERE!

	for(var i = 0; i < question.Options.length; i++){
		if(question.Type == "Closed") OptionsHolder.append(CreateOption(index, i, question.Options[i]));
		if(question.Type == "Multiple") {
			OptionsHolder.append(CreateMultipleOption(index, i, question.Options[i]));
			ChangeMultipleChoiceButton(index, i, question.Answer.includes(i));
	}
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
function UpdateMultipleQuestion(question, index){
	var Tr = document.getElementById('QuestionRow'+index);
	Tr.innerHTML = '';
	var SubjectField = CreateTd('SubjectField'+index, 'SubjectField', question.Subject);
	var QuestionField = CreateTd('QuestionField'+index, 'QuestionField', question.Question);
	var OptionsField = CreateOptionsFieldMultiple(question.Options, index, question.Answer);
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
function GetQuestionChoiceButton(index){
	return CreateButton("QuestionChoiceButton"+index, "QuestionChoiceButton", "ChooseQuestion("+index+")", (++CurInd) + "");
}
function TPSet(){
	MathJax.typeset();
}
// setInterval(TPSet, 100);
function GetCurrentState(){
	var ret = {"CurrentTest": '', "AnswerToCheck": ''};
	ret.CurrentTest = sessionStorage.getItem('CurrentTest');
	ret.AnswerToCheck = sessionStorage.getItem('AnswerToCheck');
	return ret;
}

function GetMenu(wh){

	socket.emit('GiveMenu', {'data': GetCurrentState(), 'where': wh});
	socket.on('GetMenu', function (data){
		console.log(data);
		var Holder = document.getElementById('MenuHolder');
		Holder.innerHTML = '';
		var index = 0;
		for(var x in data){
			var y = data[x];
			Holder.append(CreateA(y.link, y.word));
			if(++index != data.length) Holder.append(' > ');
		}
	});
}
