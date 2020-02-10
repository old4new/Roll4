// JavaScript Document


const rollButton = document.getElementById('roller');

const sortButton = document.getElementById('sort');

const testButton = document.getElementById('testButton');

let rollBox1 = document.getElementById('roll1');
let rollBox2 = document.getElementById('roll2');
let rollBox3 = document.getElementById('roll3');

let combatant1Div = document.getElementById('combatant1');
let combatant2Div = document.getElementById('combatant2');
let combatant3Div = document.getElementById('combatant3');

//let nameBox1 = document.getElementById('combatant1_name');
let nameBox2 = document.getElementById('combatant2_name');
let nameBox3 = document.getElementById('combatant3_name');

let initiativeBox = document.getElementById('initiative-box');





 let combatants = [
	{
		nature: "monster",
		name: "Orc1",
		monsterType: "Orc",
		maxHitPoints: 14,
		initModifier: 2,
		armour: 14,
		initiative: 10,
		nameBox: document.getElementById('combatant1_name'),
		rollBox: rollBox1
	},
	{
		name: "Ziggy",
		nature: "pc",
		maxHitPoints: 12,
		initModifier: 2,
		armour: 16,
		initiative: 10,
		nameBox: document.getElementById('combatant2_name'),
		rollBox: rollBox2
	},
	{
		name: "Orvex",
		nature: "npc",
		maxHitPoints: 13,
		initModifier: -1,
		armour: 12,
		initiative: 10,
		nameBox: document.getElementById('combatant3_name'),
		rollBox: rollBox3
	}
]


//var combatants = [combatant1, combatant2, combatant3];









function setUp () {
	var it;
	for (it = 0; it < combatants.length; it++){
		combatants[it].nameBox.innerText = combatants[it].name; // write the name
		// write the initiative modifier
	}
}

window.onload = setUp;


function sortCombatOrder(){
	combatants.sort((a, b) => b.initiative - a.initiative);
	console.log(combatants);
	for ( var i = 0; i< combatants.length; i++){
		var pos = i * 110 +"px";
		combatants[i].nameBox.parentElement.style.top = pos;
		console.log(combatants[i].nameBox.parentElement);
	}

}





function rolld20 () {
   var roll1 = Math.floor((Math.random()*20)+1); 
   return roll1;
}

function rollInitiative () {
	//orderArr = [];
	for ( var i = 0; i < combatants.length; i++){
		// if not a pc
		var roll = rolld20(); // roll d20
		combatants[i].initiative = roll+combatants[i].initModifier;
		combatants[i].rollBox.innerHTML = combatants[i].initiative; // write the number to the text box
	}
	//alert (orderArr);
	//return  orderArr ;
}

function quickTest () {
	console.log(combatants[0].nameBox.parentElement);
}


rollButton.addEventListener( "click", rollInitiative );

sortButton.addEventListener("click", function () { sortCombatOrder() });

testButton.addEventListener("click", quickTest);




