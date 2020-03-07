// Javascript document

//const addMonsterBtn = document.getElementById('add-monster-btn');
//const clearBtn = document.getElementById('clear-btn');
const testBtn = document.getElementById('test-button');
const openMonsterMaker = document.getElementById('open-monster-maker');
const monsterMakerPanel = document.getElementById('monster-maker-panel');
const closeMonsterMaker = document.getElementById('monster-panel-close');
const closeNavBtn = document.getElementById('nav-panel-close');
const menuBtn = document.getElementById('menu');
const navPanel = document.getElementById('nav-panel');
const yourMonsters = document.getElementById('your-monsters');
const addMonsterBtn = document.getElementById('add-monster-btn');
const noMonsters =  document.getElementById('no-monsters');
const yesMonsters = document.getElementById('yes-monsters');
const monsterCombatantsList = document.getElementById('monster-combatants-list');
const startFightBtn = document.getElementById('start-fight');
const newFightNameHeading = document.getElementById('fight-name');

let fightName = window.localStorage.getItem('selected fight');
let monsterList = [];
let monsterCombatants = [];


function setUpMonsters() {
    let getMonsters = JSON.parse(window.localStorage.getItem('Monster List'));
    if (getMonsters != null) {
        monsterList = [...getMonsters];
    }
    if (monsterList.length == 0) {
        console.log('noMonsters');
        yesMonsters.style.display = 'none';
    } else {
        noMonsters.style.display = 'none';
        writeMonsterMenu(monsterList);
    }

    newFightNameHeading.textContent = fightName;


}

// WRITE THE MONSTER MENU

function writeMonsterMenu (allMonsterTypes) {

    for (let i=0; i < allMonsterTypes.length; i++) {
        writeMonsterMenuItem(allMonsterTypes[i], i);
    }
}

function writeMonsterMenuItem(monsterData, pos) {

    //the main div and the name
    let monsterMenuLi = document.createElement('li');
    monsterMenuLi.className = "monster-menu-item";
    let monsterMenuDiv = document.createElement('div');
    monsterMenuDiv.className = "monster-info";
    let monsterMenuA = document.createElement('a');
    monsterMenuA.href = "#";
    monsterMenuA.className = "monster-type";
    monsterMenuA.appendChild(document.createTextNode(monsterData[0]));

    // the HOW MANY?
    let monsterMenuItemP = document.createElement('p');
    monsterMenuItemP.appendChild(document.createTextNode("Number"));
    let monsterMenuItemInput = document.createElement('input');
    monsterMenuItemInput.type = "number";
    monsterMenuItemInput.value = '1';

    monsterMenuItemP.appendChild(monsterMenuItemInput);

    // the [+] Button // writes in a numbered id
    let monsterMenuItemAddBtn = document.createElement('button');
    let btnId = "plus-btn-" + pos
    monsterMenuItemAddBtn.className = "menu-item-add-btn";
    monsterMenuItemAddBtn.setAttribute('id', btnId);
    monsterMenuItemAddBtn.appendChild(document.createTextNode("+"));


    // glue them together
    monsterMenuLi.appendChild(monsterMenuDiv);
    monsterMenuLi.appendChild(monsterMenuItemAddBtn);
    monsterMenuDiv.appendChild(monsterMenuA);
    monsterMenuDiv.appendChild(monsterMenuItemP);

    // & into the HTML / UL...
    yourMonsters.appendChild(monsterMenuLi);
}

function showMonsterMaker () {
    monsterMakerPanel.classList.add("show-monster-maker");
}
function hideMonsterMaker () {
    monsterMakerPanel.classList.remove("show-monster-maker");
}

function addMonster () {
    let formBoxes = document.getElementsByClassName('form-box');
    let newMonster = [];
    for (let i= 0; i < formBoxes.length; i++) {
        let testItem = formBoxes[i].lastElementChild.value;
        if ( isNaN(testItem) ) {
            newMonster.push(formBoxes[i].lastElementChild.value);
        } else {
            newMonster.push(Number(formBoxes[i].lastElementChild.value))
        }; 
    }
    
    monsterList.push(newMonster);
    writeMonsterMenuItem(newMonster, monsterList.length-1);
    document.getElementById('add-monster-form').reset()
    hideMonsterMaker();
    window.localStorage.setItem("Monster List", JSON.stringify(monsterList));
}

function expandMonsterItem(e) {
    if(e.target.classList.contains('monster-type')){
        e.target.parentElement.parentElement.classList.add('monster-menu-item-selected');
        e.target.parentElement.parentElement.classList.remove('monster-menu-item');
    }
}

function addMonstersToFight(e) {


    if(e.target.classList.contains('menu-item-add-btn')) {

        // find which monster was clicked

        monsterIndex = Number((e.target.id.substring(9)));
                
        // how many of this monster
        let monsterDetailsArray = document.getElementsByClassName('monster-info');
        let howManyMonsters = Number(monsterDetailsArray[monsterIndex].lastElementChild.firstElementChild.value);

        for (let i = 0; i < howManyMonsters; i++) {
            // write the selected monster into an array
            monsterName = `${monsterList[monsterIndex][0]} ${i+1}`;
            monsterCombatant = [monsterName, ...monsterList[monsterIndex]];
            monsterCombatants.push(monsterCombatant);

            // write the monster into the page

            writeMonsterCombatantIntoPage (monsterCombatant);
        }

        //console.log(monsterCombatants);
    }
}

function writeMonsterCombatantIntoPage (monster) {

    //console.log(`this is your ${monster[0]}`);

    monsterCombatantLi = document.createElement('li');
    monsterCombatantLi.className = "combatant";

    monsterCombatantDiv = document.createElement('div');

    monsterCombatantNameBox = document.createElement('h4');
    monsterCombatantNameBox.className = 'name';
    monsterCombatantNameBox.setAttribute("contenteditable", "true");
    monsterCombatantNameBox.appendChild(document.createTextNode(monster[0]));

    monsterCombatantDetails = document.createElement('p');
    monsterCombatantDetails.setAttribute("contenteditable", "false");
    monsterCombatantDetails.className = "details";
    monsterCombatantDetails.appendChild(document.createTextNode(''));
    monsterCombatantDetails.innerHTML = `${monster[1]} <strong> HP:</strong> ${monster[2]} <strong> AC: </strong> ${monster[4]}`;

    //glue them together
    monsterCombatantLi.appendChild(monsterCombatantDiv);
    monsterCombatantDiv.appendChild(monsterCombatantNameBox);
    monsterCombatantDiv.appendChild(monsterCombatantDetails);

    //into the page
    monsterCombatantsList.appendChild(monsterCombatantLi);

}

function startFight () {
    window.localStorage.setItem(fightName, JSON.stringify(monsterCombatants));
    window.location = 'combat.html';
}

function openNav() {
    navPanel.classList.add("show-nav-panel");
}

function closeNav() {
    navPanel.classList.remove("show-nav-panel");
}

function testThis() {
    console.log("hey!");
}

openMonsterMaker.addEventListener("click", showMonsterMaker);
closeMonsterMaker.addEventListener("click", hideMonsterMaker);

closeNavBtn.addEventListener("click", closeNav);
menuBtn.addEventListener("click", openNav);
addMonsterBtn.addEventListener("click", addMonster);
yourMonsters.addEventListener("click", expandMonsterItem);
yourMonsters.addEventListener("click", addMonstersToFight);
startFightBtn.addEventListener("click", startFight);

//testBtn.addEventListener("click", testThis );

window.onLoad = setUpMonsters();