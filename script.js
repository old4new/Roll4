// JavaScript Document


const rollButton = document.getElementById('roller');
const sortButton = document.getElementById('sort');
const testButton = document.getElementById('testButton');
const initiativeBox = document.getElementById('initiative-box');

let combatantDivs = [];
let nameBoxArr = [];
let rollBoxArr = [];
let detailBoxArr = [];
let combatants = [];

//step 1: load the party list & the monster list

let getPartyName = window.localStorage.getItem('selected party');
let party = JSON.parse(window.localStorage.getItem(getPartyName));
console.log(party);



const fightName = window.localStorage.getItem('selected fight');
const monsters = JSON.parse(window.localStorage.getItem(fightName));



class pc {
	constructor (name, pcClass, level, maxHP, initModifier, ac, pos){
		this.name = name;
		this.pcClass = pcClass;
		this.level = level;
		this.maxHp = maxHP;
		this.currentHP = maxHP;
		this.initModifier = initModifier;
		this.initiative = 1;
		this.ac = ac;
		this.comBox = combatantDivs[pos];
		this.nameBox = nameBoxArr[pos];
		this.detailBox = detailBoxArr[pos];
		this.rollBox = rollBoxArr[pos];
	}
}
class monster {
	constructor ( name, monsterType, maxHP, initModifier, ac, pos ){
		this.name = name;
		this.monsterType = monsterType;
		this.maxHP = maxHP;
		this.currentHP = maxHP;
		this.initModifier = initModifier;
		this.ac = ac;
		this.initiative = 1;
		this.comBox = combatantDivs[pos];
		this.nameBox = nameBoxArr[pos];
		this.detailBox = detailBoxArr[pos];
		this.rollBox = rollBoxArr[pos];

	}
}

//step 3: create the array of combatants (party + monsters)


function setUp () {
	
	// make div for each pc and each monster
	for (let i = 0; i < party.length; i++){
		makeCombatantDiv("pc", i); 
	}
	for (let j = 0; j < monsters.length; j++) {
		makeCombatantDiv("monster", party.length + j);
	}
	// make arrays of DOM objects

	combatantDivs = document.getElementsByClassName('combatant');
	nameBoxArr = document.querySelectorAll('h4.name');
	detailBoxArr = document.querySelectorAll('.details');
	rollBoxArr = document.querySelectorAll('.roll');


	// make combatant objects

	for (let k = 0; k < party.length; k++){
		combatants[k] = new pc(...party[k], k);
	}
	for (let l = 0; l < monsters.length; l++){
		let m = party.length + l;
		combatants[m] = new monster(...monsters[l], m);
	}
	// Fill the details box with the right info
	for (let it = 0; it < combatants.length; it++){
		combatants[it].nameBox.innerText = combatants[it].name; 
		if (combatants[it].pcClass){
			combatants[it].detailBox.innerText = `${combatants[it].pcClass} ${combatants[it].level}`;
		}
		if (combatants[it].monsterType){
			let mod = 0;
			// convert the modifier into a string with plus or minus
			if (combatants[it].initModifier < 0){
				mod = "-" + combatants[it].initModifier;
			} else {
				mod = "+" + combatants[it].initModifier;
			}
			combatants[it].detailBox.innerHTML = `${combatants[it].monsterType} <strong>HP:</strong>${combatants[it].currentHP} <strong>AC:</strong>${combatants[it].ac}`;
		}
	}
}

function makeCombatantDiv (type, idno) {
	//console.log(type);
	let newCombBox = document.createElement('div'); //combatant box
	newCombBox.className = "combatant " + type;

	let initInfo = document.createElement('div'); // div to contain the LH info

	let newName = document.createElement('h4'); //name
	newName.className = "name";
	newName.appendChild(document.createTextNode(''));

	let details = document.createElement('p'); // details
	details.className = "details";
	details.appendChild(document.createTextNode(''));

	let newIntBox = document.createElement('p'); // The box where the roll goes
	newIntBox.className ="roll";
	//writing the array position into an ID, so it can be parsed back later
	newIntBox.id = "rollBox" + idno;
	newIntBox.appendChild(document.createTextNode(''));
	newIntBox.setAttribute("contenteditable", "true");

	newCombBox.appendChild(initInfo); // glue the bits together
	initInfo.appendChild(newName);
	initInfo.appendChild(details);
	newCombBox.appendChild(newIntBox);

	initiativeBox.appendChild(newCombBox); // stick them into the HTML page
	
}



window.onload = setUp;


function sortCombatOrder(){
	// sort array
	combatants.sort((a, b) => b.initiative - a.initiative);

	for (var i = 0; i < combatants.length; i++) {
		combatants[i].comBox.style.order = i;
	}

}



function rolld20 () {
   var roll1 = Math.floor((Math.random()*20)+1); 
   return roll1;
}

function rollInitiative () {
	for ( var i = 0; i < combatants.length; i++){
		if (combatants[i].monsterType){
			var roll = rolld20(); // roll d20
			combatants[i].initiative = roll+combatants[i].initModifier;
			combatants[i].rollBox.innerHTML = combatants[i].initiative; // write the number to the text box
		}
	}
}

function quickTest () {
	alert("hey")
}


function enterInitiative (e) {
	//does this need an if statement???
	if (e.target.classList.contains('roll')) { 
		let realDiceRoll = e.target.innerText;
		let findId = e.target.id.substr(7);
		combatants[findId].initiative = realDiceRoll;
		//console.log(`${combatants[findId].name} : ${combatants[findId].initiative}`); 

		/* 	this is detected via the DOM, reading the HTML on the page. 
			The combatant arrays/classes  WRITE the DOM
			in order to write the contents back, i must write a numbered id into each box
			then I can read that, parse the number and use it to write into the object. 
			Is there a simpler way???  */

		
	}
}

rollButton.addEventListener( "click", rollInitiative );

sortButton.addEventListener("click", function () { sortCombatOrder() });

//testButton.addEventListener("click", quickTest);

initiativeBox.addEventListener("input", enterInitiative );

