// JavaScript Document


const rollButton = document.getElementById('roller');

const sortButton = document.getElementById('sort');

const testButton = document.getElementById('testButton');




let initiativeBox = document.getElementById('initiative-box');
let combatantDivs = document.getElementsByClassName('combatant');
let nameBoxArr = document.querySelectorAll('h4.name');
let rollBoxArr = document.querySelectorAll('.roll');


let combatants = [
	{
		nature: "monster",
		name: "Orc1",
		monsterType: "Orc",
		maxHitPoints: 14,
		initModifier: 2,
		armour: 14,
		initiative: 10,
		comBox: combatantDivs[0],
		nameBox: nameBoxArr[0],
		rollBox: rollBoxArr[0]
	},
	{
		name: "Ziggy",
		nature: "pc",
		maxHitPoints: 12,
		initModifier: 2,
		armour: 16,
		initiative: 10,
		comBox: combatantDivs[1],
		nameBox: nameBoxArr[1],
		rollBox: rollBoxArr[1]
	},
	{
		name: "Orvex",
		nature: "npc",
		maxHitPoints: 13,
		initModifier: -1,
		armour: 12,
		initiative: 10,
		comBox: combatantDivs[2],
		nameBox: nameBoxArr[2],
		rollBox: rollBoxArr[2]
	}
]




function setInitiativeBox () {
	var boxH = 0;
	for (var i=0; i<combatantDivs.length; i++){
		boxH += combatantDivs[i].offsetHeight;
	}
	boxH = boxH + (combatantDivs.length * 20) + "px";
	
	return boxH;
}






function setUp () {
	var it;
	for (it = 0; it < combatants.length; it++){
		combatants[it].nameBox.innerText = combatants[it].name; // write the name
		// write the initiative modifier
	
	}
	let iBox = setInitiativeBox();
	initiativeBox.style.height = iBox;

	sortCombatOrder();
}

window.onload = setUp;


function sortCombatOrder(){
	// sort array
	combatants.sort((a, b) => b.initiative - a.initiative);

	//reposition combatants
	let shift = 0;
	for ( let i = 0; i< combatants.length; i++){
		if (i > 0) {
			shift += 10 + combatants[i-1].comBox.offsetHeight;
		}
		var pos = shift +"px";
		combatants[i].comBox.style.top = pos;
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
	console.log(rollBoxArr);
}

function addThing () {
	let newCombBox = document.createElement('div');
	newCombBox.className = "combatant";
	let newName = document.createElement('h4');
	newName.className = "name";
	newName.appendChild(document.createTextNode('Varis'));
	let newIntBox = document.createElement('p');
	newIntBox.className ="roll";
	newIntBox.appendChild(document.createTextNode(''));
	newCombBox.appendChild(newName);
	newCombBox.appendChild(newIntBox);

	console.log(newCombBox);
	initiativeBox.appendChild(newCombBox);

	// for testing, hide the existing combatants 
	// for (var i=0; i < combatants.length; i++) {
	// 	combatants[i].comBox.style.visibility = "hidden";
	// }

	
}


rollButton.addEventListener( "click", rollInitiative );

sortButton.addEventListener("click", function () { sortCombatOrder() });

testButton.addEventListener("click", addThing);




