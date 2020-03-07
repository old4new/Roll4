// Javascript Document

const newPartyBtn = document.getElementById('new-party-btn');
const partyNameField = document.getElementById('new-party-name');
const listOfParties = document.getElementById('list-of-parties');
const partyOn = document.getElementById('party-on');
const noParties = document.getElementById('party-off');

let parties = JSON.parse(window.localStorage.getItem('party list'));
//remove duplicates
parties = Array.from(new Set([...parties]));
console.log(parties);
let selectedParty = '';

function setUpPartyList () {
    if (parties.length > 0 ) {
        //hide the 'no parties' message
        noParties.style.display = 'none';
        partyOn.style.visibility = 'visible';


        for (let i=0; i < parties.length; i++) {
            writePartyLink(parties[i], i);
        }

    }

}

function writePartyLink(partyName, pos) {
    let newPartyLi = document.createElement('li');
    newPartyLi.className = 'party-names';
    newPartyLi.id = `party-index-${pos}`;
    let newPartyLink = document.createElement('a');
    newPartyLink.href = "#";
    newPartyLink.appendChild(document.createTextNode(partyName));
    newPartyLi.appendChild(newPartyLink);
    listOfParties.appendChild(newPartyLi);
}


function addPartyName () {
    let newName = partyNameField.value;
    parties.push(newName);
    parties = Array.from(new Set([...parties]));
    window.localStorage.setItem("party list", JSON.stringify(parties));
    window.localStorage.setItem("selected party", newName);
    window.location.href = "pc.html";
}

function selectParty (e) {
    let targetItem = e.target.parentElement;
    if (targetItem.classList.contains('party-names')){
        let partyIndex = targetItem.id.substr(12);
        window.localStorage.setItem("selected party", parties[partyIndex]);
        console.log(parties[partyIndex]);
        window.location = 'pc.html';
    }
}



window.onload = setUpPartyList;


newPartyBtn.addEventListener("click", addPartyName );
listOfParties.addEventListener("click", selectParty);
