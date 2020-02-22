// Javascript Document

const newPartyBtn = document.getElementById('new-party-btn');
const partyNameField = document.getElementById('new-party-name');

let parties = JSON.parse(window.localStorage.getItem('party list'));
console.log(parties);
//let parties =[];
let selectedParty = '';




function addPartyName () {
    let newName = partyNameField.value;
    parties.push(newName);
    console.log(parties);
    window.localStorage.setItem("party list", JSON.stringify(parties));
    window.localStorage.setItem("selected", newName);
    window.location.href = "pc.html";
}






newPartyBtn.addEventListener("click", addPartyName );

