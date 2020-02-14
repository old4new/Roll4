// JavaScript Document


const rollButton = document.getElementById('roller');
const sortButton = document.getElementById('sort');
const testButton = document.getElementById('testButton');
const initiativeBox = document.getElementById('initiative-box');

let combatantDivs = [];
let nameBoxArr = [];
let rollBoxArr = [];
let combatants = [];

//step 1: load the party list
const party = [
	["Ziggy", "Wizard", 4, 24, 2, 15,],
	["Varis", "Fighter", 4, 44, 5, 18], 
	["Dunk", "Barbarian", 4, 50, 3, 17], 
	["Pippen", "Rogue", 4, 32, 5, 16]
]


//step 2: load the monster list

const monsters = [
	["Orc 1", "Orc", 15, 1, 13],
	["Orc 2", "Orc", 15, 1, 13],
	["Orc 3", "Orc", 15, 1, 13],
	["Plink", "Goblin", 7, 2, 15],
	["Plonk", "Goblin", 7, 2, 15],
	["Smaug", "Ancient Red Dragon", 546, 0, 22]
]

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
		this.rollBox = rollBoxArr[pos];

	}
}
class monster {
	constructor ( name, monsterType, maxHP, initModifier, ac, pos){
		this.name = name;
		this.monsterType = monsterType;
		this.maxHP = maxHP;
		this.currentHP = maxHP;
		this.initModifier = initModifier;
		this.ac = ac;
		this.initiative = 1;
		this.comBox = combatantDivs[pos];
		this.nameBox = nameBoxArr[pos];
		this.rollBox = rollBoxArr[pos];

	}
}

//step 3: create the array of combatants (party + monsters)


function setUp () {
	
	// make div for each pc and each monster
	for (var i = 0; i < party.length; i++){
		makeCombatantDiv("pc"); /// need to create the Combatant Divs array before creating the objects
	}
	for (var j = 0; j < monsters.length; j++) {
		makeCombatantDiv("monster");
	}
	// make arrays

	combatantDivs = document.getElementsByClassName('combatant');
	nameBoxArr = document.querySelectorAll('h4.name');
	rollBoxArr = document.querySelectorAll('.roll');


	// make combatant objects

	for (var k = 0; k < party.length; k++){
		combatants[k] = new pc(...party[k], k);
	}
	for (var l = 0; l < monsters.length; l++){
		let m = party.length + l;
		combatants[m] = new monster(...monsters[l], m);
	}
	// Fill the div with the right info
	for (let it = 0; it < combatants.length; it++){
		combatants[it].nameBox.innerText = combatants[it].name; // write in combatants
	}
}

function makeCombatantDiv (type) {
	console.log(type);
	let newCombBox = document.createElement('div');
	let classString = "combatant " + type;
	newCombBox.className = classString;
	let newName = document.createElement('h4');
	newName.className = "name";
	newName.appendChild(document.createTextNode(''));
	let newIntBox = document.createElement('p');
	newIntBox.className ="roll";
	newIntBox.appendChild(document.createTextNode(''));
	newCombBox.appendChild(newName);
	newCombBox.appendChild(newIntBox);

	initiativeBox.appendChild(newCombBox);
	
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
		var roll = rolld20(); // roll d20
		combatants[i].initiative = roll+combatants[i].initModifier;
		combatants[i].rollBox.innerHTML = combatants[i].initiative; // write the number to the text box
	}
}

function quickTest () {
	console.log(combatants);
}




rollButton.addEventListener( "click", rollInitiative );

sortButton.addEventListener("click", function () { sortCombatOrder() });

testButton.addEventListener("click", quickTest);




