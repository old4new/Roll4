const fightSetUpBtn = document.getElementById('fight-set-up-btn');
const newFightNameField = document.getElementById('new-fight-name');
const fightListUl = document.getElementById('fight-list-ul');
const noFights = document.getElementById('no-fights');
const yesFights = document.getElementById('yes-fights');

let fightList = [];

function setUpFightList () {

    let getFightList = JSON.parse(window.localStorage.getItem('fightList'));

    

    if (getFightList == null) {
        yesFights.style.display = 'none';
        noFights.style.display = 'block';
    } else {

        noFights.style.display = 'none';
        yesFights.style.display = 'block';

        fightList = [...getFightList];


        for (let i = 0; i < fightList.length; i++) {

            writeInFight(fightList[i]);
        }
    }
}

function writeInFight(fightName) {
    let fightNameLi = document.createElement('li');
    let fightNameA = document.createElement('a');
    fightNameA.href = "#";
    fightNameLi.className = "fight-name";
    fightNameA.appendChild(document.createTextNode(fightName));
    fightNameLi.appendChild(fightNameA);
    fightListUl.appendChild(fightNameLi);
}

function setUpFight() {
    let newFightName = newFightNameField.value;
    console.log(newFightName);
    window.localStorage.setItem('selected fight', newFightName);
    fightList.push(newFightName);
    window.localStorage.setItem('fightList', JSON.stringify(fightList));
    window.location = 'monsters.html';
}

function selectFight(e){
    if (e.target.parentElement.className == "fight-name"){
        let targetText = e.target.textContent;

        fightList.forEach(function(item, index){
            if (item == targetText) {
                window.localStorage.setItem('selected fight', fightList[index]);
                window.location = "combat.html";
            } 
        })
    }

    
} 





fightSetUpBtn.addEventListener("click", setUpFight);
fightListUl.addEventListener("click", selectFight);

window.onload = setUpFightList;