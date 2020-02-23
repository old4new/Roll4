// Javascript Document

const newPartyBtn = document.getElementById('new-party-btn');
const partyNameField = document.getElementById('new-party-name');
const listOfParties = document.getElementById('list-of-parties');
const partyOn = document.getElementById('party-on');
const noParties = document.getElementById('party-off');

let parties = JSON.parse(window.localStorage.getItem('party list'));

console.log(parties);
//let parties =[];
let selectedParty = '';

function setUpPartyList () {
    if (parties.length > 0 ) {
        //hide the 'no parties' message
        noParties.style.display = 'none';
        partyOn.style.visibility = 'visible';


        for (let i=0; i < parties.length; i++) {
            writePartyLink(parties[i]);
        }

    }

}

function writePartyLink(partyName) {
    let newPartyLi = document.createElement('li');
    newPartyLi.className = 'party-names';
    let newPartyLink = document.createElement('a');
    newPartyLink.href = "#";
    newPartyLink.appendChild(document.createTextNode(partyName));
    newPartyLi.appendChild(newPartyLink);
    listOfParties.appendChild(newPartyLi);
}


function addPartyName () {
    let newName = partyNameField.value;
    parties.push(newName);
    console.log(parties);
    window.localStorage.setItem("party list", JSON.stringify(parties));
    window.localStorage.setItem("selected", newName);
    window.location.href = "pc.html";
}



window.onload = setUpPartyList;


newPartyBtn.addEventListener("click", addPartyName );

