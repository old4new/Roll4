// Javascript document

//const addMonsterBtn = document.getElementById('add-monster-btn');
//const clearBtn = document.getElementById('clear-btn');
const testBtn = document.getElementById('test-button');
const makeMonsterBtn = document.getElementById('make-new-monster');
const monsterMakerPanel = document.getElementById('monster-maker-panel');
const closeMonsterMaker = document.getElementById('monster-panel-close');










function showMonsterMaker () {
    monsterMakerPanel.classList.add("show-monster-maker");
}
function hideMonsterMaker () {
    console.log("goodbye monster");
    monsterMakerPanel.classList.remove("show-monster-maker");
}



function testThis() {
    console.log("hey!");
}

makeMonsterBtn.addEventListener("click", showMonsterMaker);
closeMonsterMaker.addEventListener("click", hideMonsterMaker);

testBtn.addEventListener("click", testThis );
