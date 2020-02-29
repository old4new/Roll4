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
        monsterIndex = Number((e.target.id.substring(9)));
        
        // WRITE A LIST OF COMBATANTS FOR THE NAMED FIGHT
        
        // how many of this monster
        let monsterDetailsArray = document.getElementsByClassName('monster-info');
        let howManyMonsters = Number(monsterDetailsArray[monsterIndex].lastElementChild.firstElementChild.value);

        for (let i = 0; i < howManyMonsters; i++) {
            // write the selected monster into an array
            monsterName = `${monsterList[monsterIndex][0]} ${i+1}`;
            monsterCombatant = [monsterName, ...monsterList[monsterIndex]];
            monsterCombatants.push(monsterCombatant);
        }

        console.log(monsterCombatants);
    }
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

//testBtn.addEventListener("click", testThis );

window.onLoad = setUpMonsters();